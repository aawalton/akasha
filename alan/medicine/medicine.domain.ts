import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const medicine = {
  id: "01a0675b-16f0-7ba0-82ff-12a2a6ec360b",
  type: "page-type/domain",
  slug: "medicine",
  definition: "Alan's medical health",
  parts: ["domain/disability-adjusted-micromort"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lab value with no measurement of Alan takes the typical value for his age and sex.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A factor of Alan's that is neither a lab value nor logged is learned by interviewing him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan's physical activity is his mean daily active energy over the trailing three months.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A day under 100 kilocalories of active energy is read as a day the watch was off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan's suicide risk is read from his logged safety level over the trailing three months.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's sleep is his mean daily logged sleep over the trailing three months.",
    },
  ],
  createdAt: "2026-09-03T13:00:18.032Z",
  updatedAt: "2026-10-28T18:10:02.722Z",
} as const satisfies Domain
