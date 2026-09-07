import type { Initiative } from "../initiative.page-type.ts"

export const aineAuditChangeGuards = {
  id: "01a07b9d-714b-7d47-a337-a59a3a5219b2",
  pageTypeSlug: "initiative",
  slug: "aine-audit-change-guards",
  domainSlug: "page-type/change",
  personaSlug: "aine",
  intents: [
    {
      statement:
        "Every mechanical change that can leave an edge hanging names the guard judging that edge.",
      workingMemory:
        "8 of the 24 mechanical changes name any guard, and `guardedBy` returns before casting a shadow where the list is empty, so the other 16 cost nothing and judge nothing. Whether something is a guard is settled by asking whether judging it needs the answer. Guards never read `world.index`; `guardedBy` casts its shadow from `gathered([world.over, said])`, so a stale index on a threaded world cannot reach one.",
    },
    {
      statement:
        "A content change is judged by the guards that judge an edge into the body that change leaves.",
      workingMemory:
        "An add guard judges the edges out of the new body and a remove guard judges the edges into the path that went, so the inversion is edge direction. A content change is the third case: it breaks an inbound edge while the path survives. `import-not-left-hanging` and `relation-not-left-hanging` both key on `takingIn(given.said)`, so neither fires. Widen the trigger they share rather than writing a third, which `no-rule-in-two-files` would refuse.",
    },
    {
      statement: "The remove family mirrors the add family at every file kind.",
      workingMemory:
        "`remove-page-file` over `remove-code-file` over `remove-file` is landed and green, mirroring `add-page-file` over `add-code-file` over `add-file`. Left: `remove-page-type-file` and `remove-page-property-file`. `remove-page-file` is to refuse where a page property's own file is still there, which is the inversion of the add side's ordering.",
    },
    {
      statement: "A world stacked over more than one answer answers the index every answer leaves.",
      workingMemory:
        "`worldOver` works its index out from `said` alone where its two sibling fields accumulate, so a page an earlier answer took away is back in the stacked world's index: `listedByPath` answered 0 rows after one answer and 1 row after a second. Nothing is red today, because no guard reads that field. The fix is to cast the index from the gathered answer where that answer is not refused. Drafted and not landed.",
    },
    {
      statement:
        "A change-page-file wraps change-code-file, and the authored change-file routes to it.",
      workingMemory:
        "`change-code-file` is landed. The rename guard belongs on `change-page-file` because id and slug are page properties. `change-file.change-mechanical` refuses inline where the body reads null and needs that body to work the passage out, so that refusal is structural rather than a guard that was missed.",
    },
    {
      statement: "A page property's change is named for the property that change changes.",
      workingMemory:
        "`change-page-property` and `change-page-property-relation` are to be `change-page-page-property` and `change-page-page-property-relation`, matching `change-page-page-type`. Three pages, mechanical and checked. Each rename moves an address, and `reach` now takes `keyof Changes`, so an address left stale refuses at `TS2820` naming the address it meant.",
    },
  ],
  constraints: [
    "A guard judges the answer a change gives, so what can be judged without that answer is a check.",
    "A guard runs on a mechanical change alone.",
    "A guard is named on the change page rather than reached by an import.",
    "Guards short-circuit, so the first refusal is the whole answer.",
    "The gate runs no test, so the tests are run by hand.",
    "The hole in move-file waits.",
  ],
} as const satisfies Initiative
