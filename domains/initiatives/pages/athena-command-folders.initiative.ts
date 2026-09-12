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
        "`parts-list-is-sorted` measures 0 refusals: `parts` says it is sorted on its property page and `add-property-value` reads that off the shape. `calling`'s `heldUnder` sorts by name at `1fb02ba85cf`, so a suggestion no longer depends on where a name was typed. Two readers are left, both carrying the Domains panel's number: `domain-rows` into the extension, and `tree-drawing`. A rename can still unsort a list. Alan's: `record`, `number`, or `none`?\n",
    },
  ],
} as const satisfies Initiative
