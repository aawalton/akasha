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
        "`parts.relation-property.ts` says what a parts list is and carries the sort as a gap. 343 of 919 parts lists are unsorted. Two readers depend on the written order: `domain-rows.module.code.ts:125` and `listedUnder` at `calling.module.code.ts:361`. Freeing both wants one optional order list declared beside `parts` on `domain.page-type.ts:36`; simulated at `champions-tree` it moves 0 of 11,795 nodes, against 6,638 moved by sorting `parts` alone. Are parts lists alphabetical?\n",
    },
  ],
} as const satisfies Initiative
