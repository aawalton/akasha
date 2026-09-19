import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addPropertyToPageType = {
  id: "01a09c9a-b00b-7872-b129-710e61ff9be5",
  type: "page-type/change-mechanical-page-type",
  slug: "add-property-to-page-type",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one page property declared on one page type and named among that page type's parts",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The declaration and the part are one answer over one reading of the body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The declaration is put in as a record rather than as the text of a record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The part is put in keyed `parts` rather than under a second key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type naming no part yet gains its first part under that same key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part is written after the parts that page type already names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration with many values states a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count the change is not told is stated as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration with one value states no count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property sitting outside the page type's folder is declared the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug naming no page property is refused before the body is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming no page type is refused before the body is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type stating that property already is refused by its path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property another page type declares holding one is refused here holding many, and the reverse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal is answered before the path is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names those page types, what they hold, and the act that turns it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property another page type declares the same way is declared here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung beneath is reached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the type a page type has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here spells an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page of the type the property was declared on.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
