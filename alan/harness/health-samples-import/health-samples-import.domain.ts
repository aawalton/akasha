import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const healthSamplesImport = {
  id: "01a05c14-b11a-7006-9c17-e67776ab45af",
  type: "domain",
  slug: "health-samples-import",
  definition: "health readings taken off a machine of Alan's and brought into the store",
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
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A reading is fetched over a shell rather than from anything the machine with the export serves.",
    },
    {
      invariantKind: "departure",
      statement: "An import that stops part way is resumed rather than started again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides the meaning of a reading.",
    },
  ],
} as const satisfies Domain
