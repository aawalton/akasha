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
        "`parts.relation-property.ts:9` says parts are in the order they are read, and no reader reads them so: `domain-drawing.module.code.ts:105` sorts before descending, and every folder-shape check turns parts into a Set. The written order is arrival order. `command.page-type.ts:114` carries a blank line with ten entries appended after it, and property pages sit at `:14-18` inside a run of namespaces. Two other pages carry the same gap. A check holds the sort.\n",
    },
  ],
} as const satisfies Initiative
