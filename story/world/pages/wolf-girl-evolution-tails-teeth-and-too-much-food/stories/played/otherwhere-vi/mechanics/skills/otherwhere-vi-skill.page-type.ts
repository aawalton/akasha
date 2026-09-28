import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViSkill = {
  id: "01a0ea48-4645-7d63-81db-5102c878728b",
  type: "page-type/page-type",
  slug: "otherwhere-vi-skill",
  definition: "one skill a character in Otherwhere VI holds, at its level",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/otherwhere-vi-skill-character",
    "number-property/otherwhere-vi-skill-level",
    "number-property/otherwhere-vi-skill-stamina-cost",
  ],
  properties: [
    {
      pageProperty: "relation-property/otherwhere-vi-skill-character",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/otherwhere-vi-skill-level", required: true, many: false },
    {
      pageProperty: "number-property/otherwhere-vi-skill-stamina-cost",
      required: false,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill page's title is the skill's name as the System names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's description says what it plainly is, and nothing of cost or length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An active skill states its SP or MP cost, and how long it holds where it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill forms after one real day of repeated, intent use of an act that could form it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill also forms at once from a feat done in earnest where life or a meal hung on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, poison and cold endured through a hard hour form their resistances.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is filed at level one the moment the System announces it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System announces a new skill as 【New Skill Acquired: Name Lv.1】.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill rises a level for each few uses in earnest where the outcome mattered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From level 10 a skill rises at most once a day, and from 20 once in three days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rise shows as 【Name Lv.4 → Lv.5】.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two skills used together in a new way each rise one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill's bonus to an act is one from level 1, two from 5, three from 10 and four from 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A basic skill grows about five in a hundred stronger each level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Level 10 and level 20 each bring a milestone perk the world builder sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
