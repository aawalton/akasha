declare type StatusBarStoplights = {
  readonly glyphs: string
  readonly legend: string
}

declare type StatusBarUsage = {
  readonly sessionPct: number | null
  readonly weeklyPct: number | null
}

declare type StatusBarState = {
  readonly usage: StatusBarUsage | null
  readonly inbox: StatusBarStoplights | null
  readonly upkeep: StatusBarStoplights | null
  readonly attributes: StatusBarStoplights | null
}
