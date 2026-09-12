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
        "`parts.relation-property.ts` says what a parts list is and carries the sort as a gap. 343 of 919 parts lists are unsorted. Two readers depend on the written order: `domain-rows.module.code.ts:125` publishes it as `sequence`, which numbers the editor's Domains tree at `champions-tree.module.code.ts:31`, and `calling.module.code.ts:330` prints a namespace's subcommands in it. Both orderings are blessed invariants. No check holds the sort. Are they alphabetical?\n",
    },
  ],
} as const satisfies Initiative
