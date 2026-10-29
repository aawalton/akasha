import type { TemperVision } from "akasha/temper/catalog/effect/temper-vision/temper-vision.page-type.types.ts"

export const heartyVitality = {
  id: "01a188b6-21c0-7270-a7ec-57d2d6ad015c",
  type: "page-type/temper-vision",
  slug: "hearty-vitality",
  title: "Hearty Vitality",
  key: "hearty-vitality",
  description:
    "You feel full of life!\n\nMax Health increased by |cffffff6|r% per stack.\n\nCurrent Bonus: |cffffff12|r%",
  esoAbilityId: 197652,
  createdAt: "2026-10-29T17:35:00.000Z",
  updatedAt: "2026-10-29T17:35:00.000Z",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement:
        "The game showed 68,481 Max Health front and 72,649 back where Temper worked out 62,061 and 65,838.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "Two stacks add 12% Max Health; Temper's numbers divided by 1.015 and times 1.12 give the game's.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Temper carries a 1.5% Health term the game does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The health formula waits on a verified test case rather than this arithmetic.",
    },
  ],
} as const satisfies TemperVision
