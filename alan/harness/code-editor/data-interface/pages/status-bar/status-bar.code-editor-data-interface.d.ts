declare type StatusBarStoplights = {
  readonly glyphs: string
  readonly legend: string
}

declare type StatusBarUsage = {
  readonly sessionPct: number | null
  readonly weeklyPct: number | null
}

declare type StatusBarWorkstation = {
  readonly processorPct: number | null
  readonly memoryGb: number | null
}

declare type StatusBarState = {
  readonly workstation: StatusBarWorkstation | null
  readonly usage: StatusBarUsage | null
  readonly inbox: StatusBarStoplights | null
  readonly upkeep: StatusBarStoplights | null
  readonly attributes: StatusBarStoplights | null
  readonly luck: StatusBarStoplights | null
}
