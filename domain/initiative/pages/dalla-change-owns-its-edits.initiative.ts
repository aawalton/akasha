import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const dallaChangeOwnsItsEdits = {
  id: "01a0c4e5-8f70-76c1-8240-0eb410c8f057",
  type: "page-type/initiative",
  slug: "dalla-change-owns-its-edits",
  domain: "page-type/change",
  persona: "persona/dalla",
  intentStack: [
    {
      statement: "Every edit a change lands is an edit that change's act stated.",
      workingMemory:
        "`preparing` calls `filingsFor` and appends reference edits no act stated. `refiling` and `reread` gather pages out of the index rather than off the change, and a failed resolution on the after side deletes a live line — 99 lost in `cc7edc94ace`. The change-level check judges those edits against the settling output that made them, so it is a tautology. Stale lines are the accepted cost: `index refresh` rebuilds these files whole, and a stale line is mendable where a deletion is not.",
    },
  ],
} as const satisfies Initiative
