import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const veraGraphCleanup = {
  id: "01a0a588-8e33-7e64-bb88-facbefcf62b6",
  type: "page-type/initiative",
  slug: "vera-graph-cleanup",
  domain: "domain/graph",
  persona: "persona/vera",
  intentStack: [
    {
      statement:
        "Every closure over the graph's edges is worked out in the graph rather than by each caller.",
      workingMemory:
        "Not met. Three closures go through the graph: `dockerfile-imports` at `ab84af48094`, `supervisor-file-version` at `03682a4c641`, `remove-file-page` at `c98fae9a35e`. Two wait on a predicate following only code: an out edge says `names` type or code at `97004ede965`, and nothing reads it yet, so `no-import-cycle` would refuse 38 cycles over 387 files that never loop. `no-refused-syntax` is a loader, no import reader. Fourteen more close over `extends`, seven over `parts`.",
    },
    {
      statement: "Every closure the graph answers is quick enough to ask on every landing.",
      workingMemory:
        "Measured by `akasha measure closure` on 2026-09-15: out over `deploy-file-closure` 479 nodes and 1568 edges in 0.137s wall, 0.484s processor; in over `page-value-reading` 3228 nodes and 9671 edges in 0.109s wall, 0.166s processor. Reading bodies out costs three times the processor for a seventh of the nodes. The largest is a tenth of a second against a typecheck averaging 14.8s. Whether that wants a cache is Alan's to settle.",
    },
  ],
  constraints: [
    "Alan approves every new caching mechanism before it is built.",
    "Alan approves every new node kind, edge kind and attribute before it is built.",
  ],
} as const satisfies Initiative
