import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const removePropertyFromPageType = {
  id: "01a09cc4-9e95-7a9b-a741-4be28085d2a1",
  type: "page-type/change-mechanical-page-type",
  slug: "remove-property-from-page-type",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one page property taken off one page type and out of that page type's parts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The part and the declaration are one answer over one reading of the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The declaration taken out is the one naming that property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The part taken out is keyed `parts` rather than looked for under a second key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type that declares a property without parting it loses the declaration alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the page type parts the property is read from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug naming no page property is refused before the body is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming no page type is refused before the body is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type declaring that property nowhere is refused by its path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the type a page type has.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here spells an import.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page of the type the property was declared on.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
