import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const changePropertyOnPageType = {
  id: "01a09c73-7ce8-7ac1-b2ad-4b7ef6580484",
  type: "change-mechanical-page-type",
  slug: "change-property-on-page-type",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a page type's declaration of one property stated anew, with its pages carried to match",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type is read from the path the change is handed.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page type is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "A property the page type carries nowhere is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration written is the one the page type's own body states.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages state the property is read from the values the index files.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration and every page under it are answered in this one answer.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no value gains the default where the property becomes required.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating no value is refused where the property becomes required and no default is stated.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating one value in a list has that list unwrapped where the declaration holds one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating a value outside a list has that value wrapped where the declaration holds many.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose list holds other than one value is refused where the declaration holds one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A count is written on the declaration where it holds many and taken off where it holds one.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A default is written on the declaration and gained by a page stating no value.",
    },
    {
      invariantKind: "departure",
      statement: "A default is spelled as text on the declaration and as its own kind on a page.",
    },
    {
      invariantKind: "departure",
      statement: "A default the property's kind cannot hold is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration holding many values is refused a default.",
    },
    {
      invariantKind: "departure",
      statement: "A default is taken off the declaration where the caller states none.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
