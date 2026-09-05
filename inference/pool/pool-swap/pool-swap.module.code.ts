import {
  killService,
  startService,
  stopService,
} from "../launchd-service/launchd-service.module.code.ts"
import type { PoolConfig, PoolService } from "../pool-config/pool-config.module.code.ts"
import type { createMutex, LockPriority } from "../pool-mutex/pool-mutex.module.code.ts"
import { waitForPort, waitForPortFree } from "../port-readiness/port-readiness.module.code.ts"
import { decideSwap } from "../swap-decision/swap-decision.module.code.ts"

type PortPollOpts = { readonly timeoutMs: number; readonly intervalMs: number }

export interface SwapEffects {
  readonly startService: (uid: number, label: string) => Promise<void>
  readonly stopService: (uid: number, label: string) => Promise<void>
  readonly killService: (uid: number, label: string) => Promise<void>
  readonly waitForPort: (host: string, port: number, opts: PortPollOpts) => Promise<boolean>
  readonly waitForPortFree: (host: string, port: number, opts: PortPollOpts) => Promise<boolean>
}

const DEFAULT_EFFECTS: SwapEffects = {
  startService,
  stopService,
  killService,
  waitForPort,
  waitForPortFree,
}

const READINESS = { timeoutMs: 180_000, intervalMs: 500 }
const EVICT = { timeoutMs: 30_000, intervalMs: 250 }
const LIVENESS = { timeoutMs: 2_000, intervalMs: 250 }

export type SwapResult = { readonly ok: true } | { readonly ok: false; readonly message: string }

export type SwapOutcome<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly message: string }

export function createSwapController(
  config: PoolConfig,
  mutex: ReturnType<typeof createMutex>,
  effects: SwapEffects = DEFAULT_EFFECTS
): {
  getResident: () => readonly string[]
  ensureLive: (target: PoolService) => Promise<SwapResult>
  runWithPool: <T>(
    target: PoolService,
    onReady: () => Promise<T>,
    priority?: LockPriority
  ) => Promise<SwapOutcome<T>>
  bootReconcile: () => Promise<void>
} {
  const resident = new Set<string>()
  const warmSet = config.warmSet
  const byName = new Map(config.services.map((s) => [s.name, s]))
  const uid = typeof process.getuid === "function" ? process.getuid() : 0

  const swapInLocked = async (target: PoolService): Promise<SwapResult> => {
    const decision = decideSwap({ requested: target.name, resident: [...resident], warmSet })

    let needStart = decision.start !== null
    if (decision.stops.length === 0 && decision.start === null) {
      const stillUp = await effects.waitForPort("127.0.0.1", target.internalPort, LIVENESS)
      if (!stillUp) {
        resident.delete(target.name)
        needStart = true
      }
    }

    for (const stopName of decision.stops) {
      const stopSvc = byName.get(stopName)
      if (stopSvc !== undefined) {
        await effects.stopService(uid, stopSvc.launchdLabel)
        const freed = await effects.waitForPortFree("127.0.0.1", stopSvc.internalPort, EVICT)
        if (!freed) {
          await effects.killService(uid, stopSvc.launchdLabel)
          await effects.waitForPortFree("127.0.0.1", stopSvc.internalPort, EVICT)
        }
      }
      resident.delete(stopName)
    }
    if (needStart) {
      try {
        await effects.startService(uid, target.launchdLabel)
      } catch (err) {
        resident.delete(target.name)
        return { ok: false, message: `failed to start ${target.name}: ${String(err)}` }
      }
      const ready = await effects.waitForPort("127.0.0.1", target.internalPort, READINESS)
      if (!ready) {
        resident.delete(target.name)
        return {
          ok: false,
          message: `service ${target.name} did not become ready on 127.0.0.1:${target.internalPort} within ${READINESS.timeoutMs}ms`,
        }
      }
    }
    resident.add(target.name)
    return { ok: true }
  }

  const ensureLive = (target: PoolService): Promise<SwapResult> =>
    mutex.withLock(() => swapInLocked(target))

  const runWithPool = <T>(
    target: PoolService,
    onReady: () => Promise<T>,
    priority: LockPriority = "normal"
  ): Promise<SwapOutcome<T>> =>
    mutex.withLock(async (): Promise<SwapOutcome<T>> => {
      const result = await swapInLocked(target)
      if (!result.ok) {
        return { ok: false, message: result.message }
      }
      return { ok: true, value: await onReady() }
    }, priority)

  const bootReconcile = (): Promise<void> =>
    mutex.withLock(async () => {
      for (const s of config.services) {
        await effects.stopService(uid, s.launchdLabel)
      }
      resident.clear()
    })

  return { getResident: () => [...resident], ensureLive, runWithPool, bootReconcile }
}
