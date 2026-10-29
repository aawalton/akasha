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
  updatedAt: "2026-10-29T17:56:49.919Z",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement:
        "The game showed 68,481 Max Health front and 72,649 back where Temper worked out 62,061 and 65,838.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "Hearty Vitality's two stacks add 0.12 to the fractional-change sum, not to the product.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "53,501 × 1.28 = 68,481 front and 56,757 × 1.28 = 72,649 back.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "No 1.5% Health term exists: multiplying 1.12 by an already-multiplied 1.16 gives 1.015.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The factor moves with the build's bonus sum, so it is no constant term.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The health formula waits on a verified test case rather than this arithmetic.",
    },
  ],
} as const satisfies TemperVision
