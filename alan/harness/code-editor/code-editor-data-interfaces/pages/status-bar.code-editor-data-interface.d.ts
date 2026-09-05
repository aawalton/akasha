// The status bar. A section the service could not read is null, and the editor keeps what it last
// drew there rather than blanking it. The usage figures are a section like any other: a figure
// taken over no account is null inside a reading that is there, which is a different fact from
// there being no reading at all, and only the second keeps the last figure on the screen.

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
