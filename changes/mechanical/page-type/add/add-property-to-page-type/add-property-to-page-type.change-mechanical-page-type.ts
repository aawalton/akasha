import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addPropertyToPageType = {
  id: "01a09c9a-b00b-7872-b129-710e61ff9be5",
  type: "change-mechanical-page-type",
  slug: "add-property-to-page-type",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one page property declared on one page type and named among that page type's parts",
  code: "ts",
  guards: ["change-guard/relation-reaches-a-page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The declaration and the part are one answer over one reading of the body.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration is put in as a record rather than as the text of a record.",
    },
    {
      invariantKind: "departure",
      statement: "The part is put in keyed `parts` rather than under a second key.",
    },
    {
      invariantKind: "departure",
      statement: "A page type naming no part yet gains its first part under that same key.",
    },
    {
      invariantKind: "departure",
      statement: "A part is written in order where the index says that key is sorted.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration with many values states a count.",
    },
    {
      invariantKind: "departure",
      statement: "A count the change is not told is stated as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration with one value states no count.",
    },
    {
      invariantKind: "departure",
      statement: "A property sitting outside the page type's folder is declared the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no page property is refused before the body is read.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page type is refused before the body is read.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating that property already is refused by its path.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the type a page type has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spells an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page of the type the property was declared on.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalPageType
