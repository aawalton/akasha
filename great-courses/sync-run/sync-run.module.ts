import type { Module } from "../../code-system/modules/module.page-type.ts"

export const syncRun = {
  id: "01a06580-196a-7001-8989-3755d6f4c2ed",
  pageTypeSlug: "module",
  slug: "sync-run",
  definition: "a run of a sync, failing as a unit where any item in the run failed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One item failing makes the whole run fail.",
    },
    {
      invariantKind: "stopgap",
      statement: "No `sync-run` row is opened or settled.",
    },
    {
      invariantKind: "departure",
      statement: "The run happens and is said aloud rather than refused for holding no row.",
    },
  ],
} as const satisfies Module
