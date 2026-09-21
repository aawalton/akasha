export interface BankTraceNetWorth {
  walkCount: number
  walkTotalMs: number
  walkMaxMs: number
}

export interface BankTraceBracket {
  count: number
  totalMs: number
  maxMs: number
}

export interface BankTraceCraftingStats {
  count: number
  totalMs: number
}

export interface BankTraceSettling {
  evaluateRules: BankTraceBracket
  actionsChanged: BankTraceBracket
  bankPanelRefresh: BankTraceBracket
  slotUpdate: BankTraceBracket
  fullUpdate: BankTraceBracket
  scanCraftBag: BankTraceBracket
  buildFacts: BankTraceBracket
  walkRules: BankTraceBracket
  crafting?: BankTraceCraftingStats
  unattributedMs?: number
}

export interface BankTracePacedMove {
  sourceBag: number
  sourceSlot: number
  targetBag: number
  targetSlot: number
  count: number
  attempts: number
  itemId: number
  stackAtIssue: number
  stackNow: number
  targetStack?: number
  targetMax?: number
}

export interface BankTracePacedRound {
  elapsedMs: number
  confirmed: number
  retried: number
  left: number
  unconfirmed?: BankTracePacedMove[]
}

export interface BankTracePacedDispatch {
  planned: number
  issued: number
  confirmed: number
  retries: number
  spanMs: number
  abortedEarly: boolean
  rounds?: BankTracePacedRound[]
  abandoned?: BankTracePacedMove[]
}

export interface BankTraceStackingCount {
  bag: number
  partialsBefore: number
  partialsAfter?: number
}

export interface BankTraceStacking {
  ran: boolean
  bags?: number[]
  counts?: BankTraceStackingCount[]
  skipped?: string
}

export type VenueKind = "bank" | "store" | "fence"

export interface BankTrace {
  schemaVersion: number
  timestamp: number
  venue?: VenueKind
  bankingBag: number
  scanBankBagsMs?: number
  refreshPanelMs?: number
  withdrawMs?: number
  depositMs?: number
  withdrawCount?: number
  depositCount?: number
  moveCount?: number
  openHandlerMs?: number
  openToCloseMs?: number
  netWorth: BankTraceNetWorth
  handler: BankTraceSettling
  settling: BankTraceSettling
  pacedDispatch?: BankTracePacedDispatch
  stacking?: BankTraceStacking
}
