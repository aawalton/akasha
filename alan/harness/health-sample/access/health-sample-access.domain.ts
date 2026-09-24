import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const healthSampleAccess = {
  id: "01a05bc7-9129-7000-a4ef-ca6a1a3463b1",
  type: "page-type/domain",
  slug: "health-sample-access",
  definition: "how health samples are stored",
  parts: [
    "module/sample-identity",
    "module/sample-rows",
    "module/sample-selecting",
    "module/sample-shape",
    "module/sample-upsert",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the device a reading came from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading is filed under the ESO day the reading started in rather than the day the reading arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is read and written as a page akasha has.",
    },
  ],
} as const satisfies Domain
