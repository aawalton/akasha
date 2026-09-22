import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCaptureDataminingReader = {
  id: "01a0609d-90dd-75fe-af4b-e55cf72da4b3",
  type: "page-type/domain",
  slug: "temper-capture-datamining-reader",
  definition: "what datamining wrote out, read back and checked",
  parts: ["module/mined-data-parse", "module/saved-variables-schema"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A datamining capture is checked against a zod shape before any reader reads that capture.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No datamining capture is written here.",
    },
  ],
} as const satisfies Domain
