import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const addPropertyToPageType = {
  id: "01a081e1-00ca-7879-a25f-c734368cb78a",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "add-property-to-page-type",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one page property declared on one page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property is declared in the page type's data.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration is put in as a record rather than as the text of a record.",
    },
    {
      invariantKind: "departure",
      statement: "The property is named among the page type's parts in the same answer.",
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
      invariantKind: "absence",
      statement: "Nothing here writes the type a page type has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spells an import.",
    },
    {
      invariantKind: "departure",
      statement: "The generator writes that type again from the page type this leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating its type in a file of its own is no exception.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no page property is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page type is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "Each edit is worked out over the body the edit before it left.",
    },
    {
      invariantKind: "departure",
      statement: "Putting each part in is left to the mechanical changes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page of the type the property was declared on.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
