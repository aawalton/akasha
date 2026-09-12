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
        "`parts.relation-property.ts:21` carries the sort as a gap. Unsorted lists rise faster than anything sorts them, so this closes with a check, not a sweep. Only one reader is blessed: `champions-tree.module.ts:21` blesses the editor's Domains numbering, fed as `sequence` from `domain-rows.module.code.ts:125`; that ordering needs a property of its own or the sort takes it. The namespace listing at `calling.module.code.ts:361` is blessed by nothing. Alan's: what keeps the Domains numbering?\n",
    },
  ],
} as const satisfies Initiative
