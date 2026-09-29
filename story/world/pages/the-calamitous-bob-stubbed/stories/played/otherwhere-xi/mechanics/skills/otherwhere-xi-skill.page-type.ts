import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXiSkill = {
  id: "01a0ea89-63a0-744f-92a5-d9a28e0213bc",
  type: "page-type/page-type",
  slug: "otherwhere-xi-skill",
  definition: "one skill a character in Otherwhere XI holds, at its rank and level",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/otherwhere-xi-skill-character",
    "text-property/otherwhere-xi-skill-rank",
    "number-property/otherwhere-xi-skill-level",
  ],
  properties: [
    {
      pageProperty: "relation-property/otherwhere-xi-skill-character",
      required: true,
      many: false,
    },
    { pageProperty: "text-property/otherwhere-xi-skill-rank", required: true, many: false },
    { pageProperty: "number-property/otherwhere-xi-skill-level", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill page's title is the skill's name as the interface names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's description says what it plainly is, and nothing of cost or length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill that spends mana states its cost, and how long it holds where it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ranks run Novice, Beginner, Apprentice, Intermediate, Expert and Master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rank has nine levels; the growth check raises them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A general skill is anyone's to earn; a path skill comes only with the path that grants it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two skills long used together may merge into one stronger skill, starting lower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill is filed before any turn grants it, at the rank and level it will start at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A skill's rank shows only in the interface's own lines, never in the prose.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
