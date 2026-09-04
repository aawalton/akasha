import { decideWakeMatch } from "@akasha/seat-system/seat-wake-match-decide"
import type { OnDemandAgentSpec } from "@akasha/seat-system/seat-wake-rules"
import {
  DEFAULT_PER_SPEC_TIMEOUT_MS,
  type RecipientResolverTickDeps,
} from "../recipient-resolver-tick-deps/recipient-resolver-tick-deps.module.code.ts"

const LOG = "[local] recipient-resolver:"

export const HARNESS_LEAD_NAME = "athena"

function withTimeout<T>(work: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(`per-spec work for '${label}' exceeded ${ms}ms — abandoning (retried next tick)`)
      )
    }, ms)
    work.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (err: unknown) => {
        clearTimeout(timer)
        reject(err instanceof Error ? err : new Error(String(err)))
      }
    )
  })
}

async function processSpec(
  spec: OnDemandAgentSpec,
  deps: RecipientResolverTickDeps
): Promise<void> {
  const row = await deps.resolveAgent(spec.name)
  if (row === null) return

  const seatIsAbsent = !(await deps.seatIsPresent(row.id))
  const inbound = await deps.readInbound(row.id)
  const shouldRevive = inbound.some(
    (comms) =>
      decideWakeMatch({ seatIsAbsent, comms, wakeSources: spec.wakeSources }).kind === "revive"
  )
  if (!shouldRevive) return

  console.log(
    `${LOG} '${spec.name}' (${row.id}) has no page standing and matching inbound work — reviving`
  )
  const reviveSignal = await deps.revive(row.id, spec.bootPrompt)
  if (reviveSignal !== "unverified" && reviveSignal !== "failed") return
  await deps.reportUnrevivable(
    spec.name,
    row.id,
    spec.name === HARNESS_LEAD_NAME ? null : HARNESS_LEAD_NAME
  )
}

export async function runRecipientResolverTick(deps: RecipientResolverTickDeps): Promise<void> {
  const timeoutMs = deps.perSpecTimeoutMs ?? DEFAULT_PER_SPEC_TIMEOUT_MS
  for (const spec of deps.specs) {
    if (deps.signal.aborted) return
    try {
      await withTimeout(processSpec(spec, deps), timeoutMs, spec.name)
    } catch (err) {
      console.error(`${LOG} spec '${spec.name}' tick threw:`, err)
    }
  }
}
