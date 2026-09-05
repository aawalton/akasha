// The status bar. A section the service could not read is null, and the editor keeps what it last
// drew there rather than blanking it.

declare type StatusBarStoplights = {
  readonly glyphs: string
  readonly legend: string
}

declare type StatusBarState = {
  readonly sessionPct: number | null
  readonly weeklyPct: number | null
  readonly inbox: StatusBarStoplights | null
  readonly upkeep: StatusBarStoplights | null
  readonly attributes: StatusBarStoplights | null
}
