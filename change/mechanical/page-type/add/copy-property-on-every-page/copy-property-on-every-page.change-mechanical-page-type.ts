import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const copyPropertyOnEveryPage = {
  id: "01a09c70-3bc6-7f5a-9686-fdaee766d54a",
  type: "page-type/change-mechanical-page-type",
  slug: "copy-property-on-every-page",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a key's value written under another key on every page of a page type, the first key staying",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page the value is carried on is answered in this one answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which pages hold the key is read from the values the index files for each page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type with no property under either key is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no value under the key read from is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already holding the key written to is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list holding one value becomes that value where the key written to has one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list holding more than one value is refused where the key written to has one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key written to is put in after the key read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key read from is left where that key is with the value that key has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in bounds how many pages the value is written on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no count writes the value on every page with the key read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page's value comes in by one edit over that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page exporting no object is refused by its path.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung beneath is reached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page body is read to find out which pages hold the key.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
