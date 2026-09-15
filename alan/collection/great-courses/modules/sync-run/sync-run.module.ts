import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const syncRun = {
  id: "01a06580-196a-7001-8989-3755d6f4c2ed",
  type: "page-type/module",
  slug: "sync-run",
  definition: "a run of a sync, failing as a unit where any item in the run failed",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One item failing makes the whole run fail.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "No `sync-run` row is opened or settled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run happens and is said aloud rather than refused for holding no row.",
    },
  ],
} as const satisfies Module
