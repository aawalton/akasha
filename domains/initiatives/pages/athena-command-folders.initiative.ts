import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandFolders = {
  id: "01a09279-d28b-7685-a730-7779118b7cc2",
  type: "initiative",
  slug: "athena-command-folders",
  domain: "page-type/command",
  persona: "athena",
  parent: "athena-commands-cleanup",
  intents: [
    {
      statement: "A parts list is sorted, and no reader depends on the order it is written in.",
      workingMemory:
        "The panel no longer takes the written order: `ordered()` reads `sequence` as a membership set, ranking against kin sorted by slug, tested at `f1991bc10c0`. Two order-dependent readers are left, neither the panel: `command-leveling:66` lifts `parts` verbatim and `command-walking:84` takes `found[0]`, so written order settles which command an ambiguous word reaches. `mobile-app:180` first-wins. Sortedness is open too: `command.page-type.ts` is 1 of 750 unsorted and its check is `experimental`.\n",
    },
  ],
} as const satisfies Initiative
