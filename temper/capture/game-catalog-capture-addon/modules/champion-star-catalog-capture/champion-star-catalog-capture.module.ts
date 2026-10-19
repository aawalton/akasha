import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const championStarCatalogCapture = {
  id: "01a1565d-4f7a-7fc1-b342-99a5362598c4",
  type: "page-type/module",
  slug: "champion-star-catalog-capture",
  definition:
    "each champion star's points, read out of the client into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Disciplines are walked from the first until `GetNumChampionDisciplineSkills` answers 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's most points are what `GetChampionSkillMaxPoints` answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star is slottable where `CanChampionSkillTypeBeSlotted` allows its skill type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's jump points are every point `GetChampionSkillJumpPoints` answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Jump points are asked only where `DoesChampionSkillHaveJumpPoints` answers yes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star the game numbers 0 is left out.",
    },
  ],
  createdAt: "2026-10-19T22:51:58.202Z",
  updatedAt: "2026-10-19T22:51:58.202Z",
} as const satisfies Module
