import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const removeEntryKeyOnEveryPage = {
  id: "01a0d51c-fc12-7918-b53a-c35175e11200",
  type: "page-type/change-mechanical-page-type",
  slug: "remove-entry-key-on-every-page",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "a key taken out of every entry beside every page of a page type",
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
      statement: "The key named goes from every entry stating it, with the comma it leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key named to keep the value holds the value the key taken out had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An entry whose value the key kept does not hold refuses the whole change, naming its file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no entry of which states the key is answered as no edit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the property's declaration.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
