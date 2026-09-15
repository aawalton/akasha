import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const veraGraphCleanup = {
  id: "01a0a588-8e33-7e64-bb88-facbefcf62b6",
  type: "initiative",
  slug: "vera-graph-cleanup",
  domain: "domain/graph",
  persona: "persona/vera",
  intentStack: [
    {
      statement:
        "Every closure over the graph's edges is worked out in the graph rather than by each caller.",
      workingMemory:
        "Three walkers work one out today and none is the graph. `deploy-file-closure.module.code.ts` seeds a folder glob and walks forward through `reachedFrom` at `source-globbing.module.code.ts:74-92`, re-parsing each body. `gateway-tree-version.module.code.ts:76-95` walks its own on its own regex and follows only relative specifiers, missing everything under `akasha/`. `graph-asking` walks backward only, over `importersOf`, and its one caller is the typecheck decision.",
    },
  ],
} as const satisfies Initiative
