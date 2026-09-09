import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const removeFilePageProperty = {
  id: "01a08226-93fb-7f34-b432-0c2c3a73fdea",
  pageTypeSlug: "change-mechanical",
  slug: "remove-file-page-property",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-property",
  definition: "one page property taken away with every file that property keeps beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The removal is worked out by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type still declaring the property is refused by a guard that change names.",
    },
    {
      invariantKind: "departure",
      statement:
        "No page has that key while the property goes, its page type having to declare it first.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanical
