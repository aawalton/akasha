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
        "Not met. Ten callers close over the graph, the last at `b14a96be9ef`. Of twenty-five closures written by hand: six are done, ten are walled by a load cycle, three by the browser and the extension host, three by cost, two are untried and one is no closure at all. `beside-declaring` costs 32 times as much through the graph, 9ms against 292ms, because the indexes climb once for each page type. `page-asking` costs 3.3 times as much, 28ms against 88ms for one shape.",
    },
  ],
  constraints: [
    "Alan approves every new caching mechanism before it is built.",
    "Alan approves every new node kind, edge kind and attribute before it is built.",
  ],
} as const satisfies Initiative
