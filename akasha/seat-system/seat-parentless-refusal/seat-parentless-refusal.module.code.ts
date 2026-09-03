const REFUSAL =
  "this seat works for the fleet and names no agent above it. A seat answering to `agent` is " +
  "answering to somebody, and with no parent on its row nothing can say who: it is invisible to " +
  "every walk of the tree, its work is owed to no one, and no reaper, roster or dispatch count " +
  "reaches it. The agent starting it is read from `AGENT_ID` in its environment. A " +
  "seat answering to a person needs none, that person having opened it."

/** The refusal a parentless fleet seat earns, or null where it is owed none. */
export function refuseParentless(parent: string | null, forTheFleet: boolean): string | null {
  if (!forTheFleet) return null
  if (parent !== null && parent !== "") return null
  return REFUSAL
}
