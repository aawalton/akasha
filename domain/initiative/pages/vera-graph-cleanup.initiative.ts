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
        "Not met. Nine callers close over the graph, the last at `2b6968f1828`. Of twenty-five closures written by hand over `parts` and `extends`: four are done, ten are walled by a load cycle, three by the browser and the extension host reaching no Bun, seven want an ordered chain the graph cannot yet say, and one is no closure at all. The graph now says how far each node is and where the loops are. `domain-is-named-by-a-parent` costs 2.7s of its 15s at audit, up from 0.7s.",
    },
  ],
  constraints: [
    "Alan approves every new caching mechanism before it is built.",
    "Alan approves every new node kind, edge kind and attribute before it is built.",
  ],
} as const satisfies Initiative
