import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const unquoteTextOnEveryPage = {
  id: "01a0e189-620f-7053-abb4-90a2be965f88",
  type: "page-type/change-mechanical-page-type",
  slug: "unquote-text-on-every-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "text held inside quote marks written as the text the quotes spell, on every page",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page holding quoted text under the key is answered in this one answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pages hold quoted text is read from the values the index files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Text is quoted where it opens and closes on a quote mark and reads as one JSON text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The text written is the text the JSON spells, its escapes read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose text under the key is not quoted is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no page of which holds quoted text is answered as no edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose body states no text under the key is refused by its path.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
