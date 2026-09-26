import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const moveLoreDisclosureToFacts = {
  id: "01a0dee4-2847-78e5-9396-00bdf2bef8fd",
  type: "page-type/change-agent",
  slug: "move-lore-disclosure-to-facts",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "every lore page's disclosure moved onto its facts as the knowers of each",
  takesAtMost: false,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages moved are every lore page and every place the index holds at the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fact at world-builder or wiki disclosure goes into the secrets beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact at game-master disclosure is known to the game master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fact at player disclosure is known to the game master and to its story's player characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's story is the longest played story's slug its own slug begins with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Lore about one target folds into one page, and lore about a place into the place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page kept holds the most facts, and a fact said twice is kept once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn naming a page that folds names the page kept instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page this change cannot map refuses the whole change and is named.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This change goes once no lore page states a disclosure.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
