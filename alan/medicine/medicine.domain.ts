import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const medicine = {
  id: "01a0675b-16f0-7ba0-82ff-12a2a6ec360b",
  type: "page-type/domain",
  slug: "medicine",
  definition: "Alan's medical health",
  parts: [
    "domain/disability-adjusted-micromort",
    "page-type/cause-of-death",
    "page-type/risk-activity",
  ],
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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A relative risk measured on a clinically diagnosed group is the high end of Alan's range.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "For a self-diagnosed condition, the low end of Alan's range is no added risk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Depression's risk applies for the share of logged time Alan spends below safety level 3.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two relative risks that the sources say overlap are never multiplied together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An all-cause relative risk is never applied on top of a cause's own relative risks.",
    },
  ],
  createdAt: "2026-09-03T13:00:18.032Z",
  updatedAt: "2026-10-28T18:43:34.679Z",
} as const satisfies Domain
