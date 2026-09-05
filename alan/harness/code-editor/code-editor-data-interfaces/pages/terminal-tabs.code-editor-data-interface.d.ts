// Every terminal sitting on a seat, keyed by the pid of the shell that terminal runs.
//
// The editor holds `terminal.processId` and nothing else that names a seat, so the pid is what it
// can look a seat up by. What a tab is called is the seat's own name, which is the value here, so
// no label is carried beside it.
//
// A terminal holding no seat is not here: nothing names one, so the editor is what puts such a
// terminal back to its own shell's name.

declare type TerminalTabsState = {
  readonly seatByShellPid: Readonly<Record<string, string>>
  readonly colorBySeat: Readonly<Record<string, string>>
}
