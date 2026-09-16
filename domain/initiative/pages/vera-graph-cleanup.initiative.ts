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
        "Not met. Six closures go through the graph: `dockerfile-imports` `ab84af48094`, `supervisor-file-version` `03682a4c641`, `remove-file-page` `c98fae9a35e`, `extension-host-reaches-no-bun-code` `c22258f21ec`, `no-import-cycle` `dce54f7e3b9`, `domain-ancestors` `e947dacee`. A relation is answered going out as well as coming in since `f511bf8e5bb`. Twenty-five hand walks over `parts` and `extends` are left, eighteen of them outward, four walled off from the graph by load order.",
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
