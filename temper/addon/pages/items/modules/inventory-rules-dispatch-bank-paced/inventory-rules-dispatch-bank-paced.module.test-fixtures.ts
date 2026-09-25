import type { PacedBankStep } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-bank-paced-confirm/inventory-rules-dispatch-bank-paced-confirm.module.code.ts"

export const BACKPACK_BAG = 1
export const BANK_BAG = 2
export const GAME_STACK_MOVE_LIMIT = 100
export const GAME_STACK_MOVE_WINDOW_MS = 10000
const CLOSE_BANK_EVENT = 1
const SLOT_UPDATE_EVENT = 2
const STACK_MAX = 200
const DEFAULT_LATENCY_MS = 40
const DEFAULT_LATE_LATENCY_MS = 3000
const VISIT_GAP_MS = 60000

interface BankSlot {
  itemId: number
  stack: number
  max: number
}

interface Timer {
  readonly at: number
  readonly seq: number
  readonly run: () => undefined
}

interface Handler {
  readonly ns: string
  readonly run: () => undefined
}

interface IssuedStackMove {
  readonly atMs: number
  readonly sourceSlot: number
}

interface BankSimOptions {
  readonly startAfterBoundaryMs?: number
  readonly latencyMs?: number
  readonly lateLatencyMs?: number
  readonly closeBankAfterMs?: number
}

interface DepositPlan {
  readonly moveCount: number
  readonly firstSlot?: number
  readonly stack?: number
  readonly count?: number
}

interface SlotFill {
  readonly itemId: number
  readonly stack: number
  readonly max: number
}

export interface BankSim {
  readonly startedAtMs: number
  readonly issued: IssuedStackMove[]
  readonly said: string[]
  readonly dropsEveryRequest: Set<number>
  readonly answersLate: Set<number>
  readonly fillsOnEmptying: Map<number, SlotFill>
  readonly putStack: (
    bag: number,
    slot: number,
    itemId: number,
    stack: number,
    max: number
  ) => undefined
  readonly stackAt: (bag: number, slot: number) => number
  readonly requestMove: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    count: number
  ) => undefined
  readonly pump: (forMs: number) => undefined
}

interface BankSimCore extends BankSim {
  readonly slotAt: (bag: number, slot: number) => BankSlot | undefined
  readonly after: (ms: number, run: () => undefined) => undefined
  readonly listen: (ns: string, event: number, run: () => undefined) => undefined
  readonly unlisten: (ns: string, event: number) => undefined
}

let clock = 0
let live: BankSimCore | undefined

function running(): BankSimCore {
  if (live === undefined) throw new Error("no bank sim is installed")
  return live
}

function setGlobal(name: string, value: unknown): undefined {
  Reflect.set(globalThis, name, value)
}

function installGameGlobals(): undefined {
  setGlobal("GetGameTimeMilliseconds", (): number => clock)
  setGlobal("GetTimeStamp", (): number => 1789315280)
  setGlobal("GetSlotStackSize", (bag: number, slot: number): [number, number] => {
    const held = running().slotAt(bag, slot)
    if (held === undefined || held.stack === 0) return [0, 0]
    return [held.stack, held.max]
  })
  setGlobal("GetItemLink", (bag: number, slot: number): string => {
    const held = running().slotAt(bag, slot)
    if (held === undefined || held.stack === 0) return ""
    return `|H0:item:${held.itemId}|h[item ${held.itemId}]|h`
  })
  setGlobal("GetItemLinkItemId", (link: string): number => {
    const found = /item:(\d+)/.exec(link)
    return found === null ? 0 : Number(found[1])
  })
  setGlobal("zo_callLater", (run: () => undefined, ms: number): undefined => {
    running().after(ms, run)
  })
  setGlobal("d", (message: string): undefined => {
    running().said.push(message)
  })
  setGlobal("ZO_CreateStringId", (): undefined => undefined)
  setGlobal("EVENT_MANAGER", {
    RegisterForEvent: (ns: string, event: number, run: () => undefined): undefined => {
      running().listen(ns, event, run)
    },
    UnregisterForEvent: (ns: string, event: number): undefined => {
      running().unlisten(ns, event)
    },
  })
  setGlobal("EVENT_CLOSE_BANK", CLOSE_BANK_EVENT)
  setGlobal("EVENT_INVENTORY_SINGLE_SLOT_UPDATE", SLOT_UPDATE_EVENT)
  setGlobal("BAG_WORN", 0)
  setGlobal("BAG_BACKPACK", BACKPACK_BAG)
  setGlobal("BAG_BANK", BANK_BAG)
  setGlobal("BAG_SUBSCRIBER_BANK", 6)
  setGlobal("BAG_HOUSE_BANK_ONE", 7)
  setGlobal("BAG_HOUSE_BANK_TWO", 8)
  setGlobal("BAG_HOUSE_BANK_THREE", 9)
  setGlobal("BAG_HOUSE_BANK_FOUR", 10)
  setGlobal("BAG_HOUSE_BANK_FIVE", 11)
  setGlobal("BAG_HOUSE_BANK_SIX", 12)
  setGlobal("BAG_HOUSE_BANK_SEVEN", 13)
  setGlobal("BAG_HOUSE_BANK_EIGHT", 14)
  setGlobal("BAG_HOUSE_BANK_NINE", 15)
  setGlobal("BAG_HOUSE_BANK_TEN", 16)
  setGlobal("BAG_VIRTUAL", 65535)
  setGlobal("LINK_STYLE_BRACKETS", 1)
}

function nextVisitStart(afterBoundaryMs: number): number {
  const wanted = clock + VISIT_GAP_MS
  const boundary = Math.ceil(wanted / GAME_STACK_MOVE_WINDOW_MS) * GAME_STACK_MOVE_WINDOW_MS
  return boundary + afterBoundaryMs
}

export function makeBankSim(options: BankSimOptions = {}): BankSim {
  let seq = 0
  const latencyMs = options.latencyMs ?? DEFAULT_LATENCY_MS
  const lateLatencyMs = options.lateLatencyMs ?? DEFAULT_LATE_LATENCY_MS
  const timers: Timer[] = []
  const bags = new Map<number, BankSlot[]>()
  const handlers = new Map<number, Handler[]>()
  const issued: IssuedStackMove[] = []
  const said: string[] = []
  const dropsEveryRequest = new Set<number>()
  const answersLate = new Set<number>()
  const fillsOnEmptying = new Map<number, SlotFill>()
  const startedAtMs = nextVisitStart(options.startAfterBoundaryMs ?? 0)
  clock = startedAtMs

  function bagOf(id: number): BankSlot[] {
    const found = bags.get(id)
    if (found !== undefined) return found
    const made: BankSlot[] = []
    bags.set(id, made)
    return made
  }

  function slotAt(bag: number, slot: number): BankSlot | undefined {
    return bagOf(bag)[slot]
  }

  function stackAt(bag: number, slot: number): number {
    return slotAt(bag, slot)?.stack ?? 0
  }

  function putStack(
    bag: number,
    slot: number,
    itemId: number,
    stack: number,
    max: number
  ): undefined {
    bagOf(bag)[slot] = { itemId, stack, max }
  }

  function after(ms: number, run: () => undefined): undefined {
    seq++
    timers.push({ at: clock + (ms > 0 ? ms : 1), seq, run })
  }

  function listen(ns: string, event: number, run: () => undefined): undefined {
    const list = handlers.get(event) ?? []
    list.push({ ns, run })
    handlers.set(event, list)
  }

  function unlisten(ns: string, event: number): undefined {
    const list = handlers.get(event) ?? []
    handlers.set(
      event,
      list.filter((one) => one.ns !== ns)
    )
  }

  function fire(event: number): undefined {
    for (const one of [...(handlers.get(event) ?? [])]) one.run()
  }

  function applyMove(
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    count: number
  ): undefined {
    const source = slotAt(sourceBag, sourceSlot)
    const target = slotAt(targetBag, targetSlot)
    if (source === undefined || source.stack === 0 || target === undefined) return
    if (dropsEveryRequest.has(sourceSlot)) {
      fire(SLOT_UPDATE_EVENT)
      return
    }
    const sameItem = target.itemId === source.itemId
    const room = target.stack === 0 ? source.max : sameItem ? target.max - target.stack : 0
    const want = count < source.stack ? count : source.stack
    if (room >= want) {
      if (target.stack === 0) {
        target.itemId = source.itemId
        target.max = source.max
      }
      target.stack += want
      source.stack -= want
      if (source.stack === 0) {
        const fill = fillsOnEmptying.get(sourceSlot)
        source.itemId = fill?.itemId ?? 0
        source.stack = fill?.stack ?? 0
        source.max = fill?.max ?? 0
      }
    }
    fire(SLOT_UPDATE_EVENT)
  }

  function requestMove(
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    count: number
  ): undefined {
    issued.push({ atMs: clock, sourceSlot })
    const answerMs = answersLate.has(sourceSlot) ? lateLatencyMs : latencyMs
    after(answerMs, (): undefined => {
      applyMove(sourceBag, sourceSlot, targetBag, targetSlot, count)
    })
  }

  function pump(forMs: number): undefined {
    const until = clock + forMs
    for (;;) {
      if (timers.length === 0) {
        clock = until
        return
      }
      timers.sort((a, b) => a.at - b.at || a.seq - b.seq)
      const next = timers.shift()
      if (next === undefined) {
        clock = until
        return
      }
      if (next.at > until) {
        timers.push(next)
        clock = until
        return
      }
      clock = next.at
      next.run()
    }
  }

  const core: BankSimCore = {
    startedAtMs,
    issued,
    said,
    dropsEveryRequest,
    answersLate,
    fillsOnEmptying,
    putStack,
    stackAt,
    requestMove,
    pump,
    slotAt,
    after,
    listen,
    unlisten,
  }
  live = core
  installGameGlobals()
  if (options.closeBankAfterMs !== undefined) {
    after(options.closeBankAfterMs, (): undefined => {
      fire(CLOSE_BANK_EVENT)
    })
  }
  return core
}

export function plannedDeposits(sim: BankSim, plan: DepositPlan): PacedBankStep[] {
  const firstSlot = plan.firstSlot ?? 0
  const stack = plan.stack ?? 1
  const count = plan.count ?? 1
  const steps: PacedBankStep[] = []
  for (let i = 0; i < plan.moveCount; i++) {
    const slot = firstSlot + i
    sim.putStack(BACKPACK_BAG, slot, 1000 + slot, stack, STACK_MAX)
    sim.putStack(BANK_BAG, slot, 0, 0, 0)
    steps.push({
      kind: "move",
      sourceBag: BACKPACK_BAG,
      sourceSlot: slot,
      targetBag: BANK_BAG,
      targetSlot: slot,
      count,
    })
  }
  return steps
}

export function depositsLanded(sim: BankSim, moveCount: number): number {
  let landed = 0
  for (let i = 0; i < moveCount; i++) if (sim.stackAt(BANK_BAG, i) === 1) landed++
  return landed
}

export function slotsHoldingMoreThan(
  sim: BankSim,
  firstSlot: number,
  slotCount: number,
  asked: number
): number {
  let over = 0
  for (let i = firstSlot; i < firstSlot + slotCount; i++) {
    if (sim.stackAt(BANK_BAG, i) > asked) over++
  }
  return over
}

export function timesAskedTwice(issued: readonly IssuedStackMove[]): number {
  const asked = issued.map((one) => `${one.sourceSlot}@${one.atMs}`)
  return asked.length - new Set(asked).size
}

export function busiestWindow(issued: readonly IssuedStackMove[], windowMs: number): number {
  const times = issued.map((one) => one.atMs).sort((a, b) => a - b)
  let busiest = 0
  for (let i = 0; i < times.length; i++) {
    const end = times[i] ?? 0
    let held = 0
    for (let j = 0; j <= i; j++) if ((times[j] ?? 0) > end - windowMs) held++
    if (held > busiest) busiest = held
  }
  return busiest
}

export function busiestWindowInclusive(
  issued: readonly IssuedStackMove[],
  windowMs: number
): number {
  const times = issued.map((one) => one.atMs).sort((a, b) => a - b)
  let busiest = 0
  for (let i = 0; i < times.length; i++) {
    const end = times[i] ?? 0
    let held = 0
    for (let j = 0; j <= i; j++) if ((times[j] ?? 0) >= end - windowMs) held++
    if (held > busiest) busiest = held
  }
  return busiest
}

export function issueTimes(issued: readonly IssuedStackMove[]): number[] {
  const seen: number[] = []
  for (const one of issued) if (!seen.includes(one.atMs)) seen.push(one.atMs)
  return seen.sort((a, b) => a - b)
}
