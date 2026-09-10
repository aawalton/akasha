declare type TerminalTabsState = {
  readonly seatByShellPid: Readonly<Record<string, string>>
  readonly colorBySeat: Readonly<Record<string, string>>
}
