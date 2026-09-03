export type WriteAct =
  | "write"
  | "patch"
  | "patch-if"
  | "patch-state"
  | "remove"
  | "write-row"
  | "patch-row"
  | "remove-row"

const ROW_ACTS: readonly WriteAct[] = ["write-row", "patch-row", "remove-row"]

export function isRowAct(act: WriteAct): boolean {
  return ROW_ACTS.includes(act)
}
