import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const useNumberDraft = {
  id: "01a08e03-e1bc-73b8-a5dc-0d022694948e",
  pageTypeSlug: "module",
  type: "module",
  slug: "use-number-draft",
  definition: "the text a number is edited as, and whether it is being edited",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Editing opens on the number as it is rather than on an empty box.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the text back as a number.",
    },
  ],
} as const satisfies Module
