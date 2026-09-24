import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const copyEntryKeyOnEveryPage = {
  id: "01a0d506-39ae-79ef-94f2-54bc1c77a234",
  type: "page-type/change-mechanical-page-type",
  slug: "copy-entry-key-on-every-page",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a key's value written under another key in every entry beside every page of a page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The run names the page type and the key its pages keep entries beside them under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key written to is put in straight after the key read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key read from is left where that key is with the value that key has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry with no value under the key read from is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry already stating the same value under both keys is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry stating two values under the two keys refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no entry of which needs the key written is answered as no edit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the property's declaration.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
