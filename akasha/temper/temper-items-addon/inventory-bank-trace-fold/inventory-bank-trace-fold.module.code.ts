import type {
  BankTraceBracket,
  BankTraceNetWorth,
  BankTraceSettling,
} from "../inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
export function emptyNetWorthStats(): BankTraceNetWorth {
  return { walkCount: 0, walkTotalMs: 0, walkMaxMs: 0 }
}

export function foldNetWorthScan(stats: BankTraceNetWorth, scanMs: number): BankTraceNetWorth {
  return {
    walkCount: stats.walkCount + 1,
    walkTotalMs: stats.walkTotalMs + scanMs,
    walkMaxMs: scanMs > stats.walkMaxMs ? scanMs : stats.walkMaxMs,
  }
}

export function emptyBracket(): BankTraceBracket {
  return { count: 0, totalMs: 0, maxMs: 0 }
}

export function foldBracket(bracket: BankTraceBracket, ms: number): BankTraceBracket {
  return {
    count: bracket.count + 1,
    totalMs: bracket.totalMs + ms,
    maxMs: ms > bracket.maxMs ? ms : bracket.maxMs,
  }
}

export function emptySettlingStats(): BankTraceSettling {
  return {
    evaluateRules: emptyBracket(),
    actionsChanged: emptyBracket(),
    bankPanelRefresh: emptyBracket(),
    slotUpdate: emptyBracket(),
    fullUpdate: emptyBracket(),
    scanCraftBag: emptyBracket(),
  }
}

export function computeUnattributedMs(parts: {
  openToCloseMs: number
  openHandlerMs: number | undefined
  netWorthScanTotalMs: number
  settlingTotalsMs: number
  craftingTotalMs: number
}): number {
  const remainder =
    parts.openToCloseMs -
    (parts.openHandlerMs ?? 0) -
    parts.netWorthScanTotalMs -
    parts.settlingTotalsMs -
    parts.craftingTotalMs
  return remainder > 0 ? remainder : 0
}
