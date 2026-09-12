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
        "The namespace listing is settled and sorts by the listed name. `parts-list-is-sorted` is experimental and refuses 334 files at `320984945e3`, the first being `agents/agent.domain.ts`, which names `domain/hook` after `page-type/claude-account`. Sorting by hand rots: `add-property-value` puts a value after the ones the property has, and `change-domain-parent` routes every new part through it. Alan's, one word for the Domains numbering: `record`, `number`, or `none`?\n",
    },
  ],
} as const satisfies Initiative
