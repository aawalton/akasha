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
        "The namespace listing is settled and sorts by the listed name. `parts-list-is-sorted` measures 0 refusals at `afd3b4097f1`, down from 334: `parts` says it is sorted on its property page, `Shape` carries that, and `add-property-value` reads it, so hand-sorting cannot rot. Whether any reader depends on the order a list is written in is being measured. Alan's, one word for the Domains numbering: `record`, `number`, or `none`?\n",
    },
  ],
} as const satisfies Initiative
