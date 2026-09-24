import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const healthSampleImport = {
  id: "01a05c14-b11a-7006-9c17-e67776ab45af",
  type: "page-type/domain",
  slug: "health-sample-import",
  definition: "how health samples are imported",
  parts: [
    "module/export-fetching",
    "module/health-export",
    "module/health-import",
    "module/health-import-checkpoint",
    "module/health-import-reading",
    "module/health-import-run",
    "module/health-snapshot",
    "module/laptop-host",
    "module/verdict-reading",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading is fetched over a shell rather than from anything the machine with the export serves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import that stops part way is resumed rather than started again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides the meaning of a reading.",
    },
  ],
} as const satisfies Domain
