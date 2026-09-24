import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const healthSampleDay = {
  id: "01a05bc7-9129-7007-82af-fd4145203797",
  type: "page-type/domain",
  slug: "health-sample-day",
  definition: "a day's health samples",
  parts: ["module/active-calories", "module/opening-window"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a reading down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's sleep is read from the entries beside that day's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day whose sleep was never recorded is refused an opening rather than given one.",
    },
  ],
} as const satisfies Domain
