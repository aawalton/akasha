export function shouldWriteTerminalStoppedStatus(isPendingReExec: boolean): boolean {
  return !isPendingReExec
}
