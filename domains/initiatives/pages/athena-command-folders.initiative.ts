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
        "`parts-list-is-sorted` measures 0 refusals: `parts` says it is sorted on its property page and `add-property-value` reads that off the shape. The second half is unmet — three readers take the written order: the Domains panel numbering, `tree-drawing` carrying the same number, and `calling`'s `heldUnder`, where `nlock` suggests `lock` over `unlock` only because the namespace writes it fifth. Alan's, one word for the numbering: `record`, `number`, or `none`?\n",
    },
  ],
} as const satisfies Initiative
