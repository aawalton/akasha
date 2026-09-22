import { getSlotHandlerStats } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-slot-handler-stats/crafting-slot-handler-stats.module.code.ts"
import {
  computeUnattributedMs,
  emptyNetWorthStats,
  emptySettlingStats,
  foldBracket,
  foldNetWorthScan,
} from "akasha/temper/addon/pages/items/modules/inventory-bank-trace-fold/inventory-bank-trace-fold.module.code.ts"
import type {
  BankTrace,
  BankTraceCraftingStats,
  BankTracePacedDispatch,
  BankTracePacedMove,
  BankTracePacedRound,
  BankTraceStacking,
  VenueKind,
} from "akasha/temper/addon/pages/items/modules/inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const TRAILING_SCAN_WINDOW_MS = 5000

const BANK_TRACE_RING_MAX = 10

let activeTrace: BankTrace | undefined
let openAnchorMs = 0
let closedAtMs: number | undefined
let openHandlerDone = false
let craftingAtOpen: BankTraceCraftingStats | undefined
let visitGeneration = 0

export function beginBankTrace(bankingBag: number): undefined {
  beginVenueTrace("bank", bankingBag)
}

export function beginVenueTrace(venue: VenueKind, bankingBag: number): undefined {
  openAnchorMs = GetGameTimeMilliseconds()
  closedAtMs = undefined
  openHandlerDone = false
  visitGeneration += 1
  craftingAtOpen = readCraftingSlotHandlerStats()
  const trace: BankTrace = {
    schemaVersion: 10,
    timestamp: GetTimeStamp(),
    venue,
    bankingBag,
    netWorth: emptyNetWorthStats(),
    handler: emptySettlingStats(),
    settling: emptySettlingStats(),
  }
  activeTrace = trace
  const sv = getSavedVariables()
  if (sv.diagnostics === undefined) sv.diagnostics = {}
  if (venue === "bank") {
    sv.diagnostics.lastBankTrace = trace
    sv.diagnostics.bankTraces = keptWith(sv.diagnostics.bankTraces, trace)
    return
  }
  sv.diagnostics.storeTraces = keptWith(sv.diagnostics.storeTraces, trace)
}

function keptWith(kept: BankTrace[] | undefined, trace: BankTrace): BankTrace[] {
  const ring = kept ?? []
  ring[ring.length] = trace
  while (ring.length > BANK_TRACE_RING_MAX) {
    ring.splice(0, 1)
  }
  return ring
}

export type BankTracePhase = "scanBankBags" | "refreshPanel" | "withdraw" | "deposit"

export function recordBankPhaseMs(phase: BankTracePhase, ms: number): undefined {
  if (activeTrace === undefined) return
  if (phase === "scanBankBags") {
    activeTrace.scanBankBagsMs = ms
  } else if (phase === "refreshPanel") {
    activeTrace.refreshPanelMs = ms
  } else if (phase === "withdraw") {
    activeTrace.withdrawMs = ms
  } else {
    activeTrace.depositMs = ms
  }
}

export function recordBankMoves(withdrawCount: number, depositCount: number): undefined {
  if (activeTrace === undefined) return
  activeTrace.withdrawCount = withdrawCount
  activeTrace.depositCount = depositCount
  activeTrace.moveCount = withdrawCount + depositCount
}

function copiedMoves(moves: BankTracePacedMove[] | undefined): BankTracePacedMove[] | undefined {
  if (moves === undefined) return undefined
  const kept: BankTracePacedMove[] = []
  for (const move of moves) {
    kept[kept.length] = {
      sourceBag: move.sourceBag,
      sourceSlot: move.sourceSlot,
      targetBag: move.targetBag,
      targetSlot: move.targetSlot,
      count: move.count,
      attempts: move.attempts,
      itemId: move.itemId,
      stackAtIssue: move.stackAtIssue,
      stackNow: move.stackNow,
      targetStack: move.targetStack,
      targetMax: move.targetMax,
    }
  }
  return kept
}

export function recordPacedDispatch(stats: BankTracePacedDispatch): undefined {
  if (activeTrace === undefined) return
  const rounds: BankTracePacedRound[] = []
  for (const round of stats.rounds ?? []) {
    rounds[rounds.length] = {
      elapsedMs: round.elapsedMs,
      confirmed: round.confirmed,
      retried: round.retried,
      left: round.left,
      unconfirmed: copiedMoves(round.unconfirmed),
    }
  }
  activeTrace.pacedDispatch = {
    planned: stats.planned,
    issued: stats.issued,
    confirmed: stats.confirmed,
    retries: stats.retries,
    spanMs: stats.spanMs,
    abortedEarly: stats.abortedEarly,
    rounds,
    abandoned: copiedMoves(stats.abandoned),
  }
}

export function currentVisitGeneration(): number {
  return visitGeneration
}

export function recordStacking(stacking: BankTraceStacking, generation?: number): undefined {
  if (activeTrace === undefined) return
  if (generation !== undefined && generation !== visitGeneration) return
  activeTrace.stacking = stacking
}

export function finishBankOpenHandler(): undefined {
  if (activeTrace === undefined) return
  activeTrace.openHandlerMs = GetGameTimeMilliseconds() - openAnchorMs
  openHandlerDone = true
}

export function finishVenueOpenHandler(): undefined {
  finishBankOpenHandler()
}

export function markVenueClosed(): undefined {
  markBankClosed()
}

export function markBankClosed(): undefined {
  if (activeTrace === undefined) return
  closedAtMs = GetGameTimeMilliseconds()
  activeTrace.openToCloseMs = closedAtMs - openAnchorMs
  refreshCraftingAndRemainder(activeTrace)
  const generation = visitGeneration
  zo_callLater(function (this: void): undefined {
    if (generation !== visitGeneration) return
    activeTrace = undefined
  }, TRAILING_SCAN_WINDOW_MS)
}

export function releaseBankTrace(): undefined {
  activeTrace = undefined
}

function pastTrailingWindow(): boolean {
  return (
    closedAtMs !== undefined && GetGameTimeMilliseconds() - closedAtMs > TRAILING_SCAN_WINDOW_MS
  )
}

export function recordNetWorthScanMs(scanMs: number): undefined {
  if (activeTrace === undefined) return
  if (pastTrailingWindow()) {
    activeTrace = undefined
    return
  }
  activeTrace.netWorth = foldNetWorthScan(activeTrace.netWorth, scanMs)
  if (closedAtMs !== undefined) refreshCraftingAndRemainder(activeTrace)
}

export type SettlingBracketKey =
  | "evaluateRules"
  | "actionsChanged"
  | "bankPanelRefresh"
  | "slotUpdate"
  | "fullUpdate"
  | "scanCraftBag"
  | "buildFacts"
  | "walkRules"

export function recordSettlingMs(key: SettlingBracketKey, ms: number): undefined {
  if (activeTrace === undefined) return
  if (!openHandlerDone) {
    activeTrace.handler[key] = foldBracket(activeTrace.handler[key], ms)
    return
  }
  if (pastTrailingWindow()) {
    activeTrace = undefined
    return
  }
  activeTrace.settling[key] = foldBracket(activeTrace.settling[key], ms)
  if (closedAtMs !== undefined) refreshCraftingAndRemainder(activeTrace)
}

function refreshCraftingAndRemainder(trace: BankTrace): undefined {
  const craftingNow = readCraftingSlotHandlerStats()
  if (craftingNow !== undefined && craftingAtOpen !== undefined) {
    trace.settling.crafting = {
      count: craftingNow.count - craftingAtOpen.count,
      totalMs: craftingNow.totalMs - craftingAtOpen.totalMs,
    }
  }
  if (trace.openToCloseMs === undefined) return
  const settling = trace.settling
  trace.settling.unattributedMs = computeUnattributedMs({
    openToCloseMs: trace.openToCloseMs,
    openHandlerMs: trace.openHandlerMs,
    netWorthScanTotalMs: trace.netWorth.walkTotalMs,
    settlingTotalsMs:
      settling.evaluateRules.totalMs +
      settling.actionsChanged.totalMs +
      settling.bankPanelRefresh.totalMs +
      settling.slotUpdate.totalMs +
      settling.fullUpdate.totalMs +
      settling.scanCraftBag.totalMs,
    craftingTotalMs: settling.crafting?.totalMs ?? 0,
  })
}

function readCraftingSlotHandlerStats(): BankTraceCraftingStats | undefined {
  const stats = getSlotHandlerStats()
  return { count: stats.count, totalMs: stats.totalMs }
}
