import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const copyPropertyOnEveryPage = {
  id: "01a09c70-3bc6-7f5a-9686-fdaee766d54a",
  type: "change-mechanical-page-type",
  slug: "copy-property-on-every-page",
  changeMode: "change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "one key's value written under another key on every page of one page type, the first key staying",
  takesAtMost: true,
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page the value is carried on is answered in this one answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pages hold the key is read from the values the index files for each page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no property under either key is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no value under the key read from is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page already holding the key written to is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A list holding one value becomes that value where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A list holding more than one value is refused where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement: "The key written to is put in after the key read from.",
    },
    {
      invariantKind: "departure",
      statement: "The key read from is left where that key is with the value that key has.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in bounds how many pages the value is written on.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count writes the value on every page with the key read from.",
    },
    {
      invariantKind: "departure",
      statement: "One page's value comes in by one edit over that page.",
    },
    {
      invariantKind: "departure",
      statement: "A page exporting no object is refused by its path.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read to find out which pages hold the key.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalPageType
