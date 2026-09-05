// Every terminal sitting on a seat, named by that seat. A terminal holding no seat is not here:
// nothing names one, so the editor is what puts such a terminal back to its own shell's name.

declare type TerminalTab = {
  readonly seat: string
  readonly label: string
  readonly color: string | null
}

declare type TerminalTabsState = {
  readonly tabs: readonly TerminalTab[]
}
