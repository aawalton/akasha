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
    {
      statement:
        "Every closure the graph answers is correct, and quick enough to ask on every landing.",
      workingMemory:
        "Three walkers disagree today and nothing measures any of them: `gateway-tree-version.module.code.ts:89` follows only relative specifiers, so it misses everything reached through `akasha/`, while deploy's walk resolves through every tracked `package.json`. What correct rests on is one rule used twice. What quick rests on is this domain's caching invariants: an answer keyed by the pages it rests on, marked by the code that made it, learning it is stale by being asked.",
    },
    {
      statement:
        "The graph answers a closure over the shadow a change leaves as well as over the tree there is.",
      workingMemory:
        "The seam is already there: `graph-asking` reads every body through the `Answering` index handed in rather than off the working tree, and the typecheck decision hands it an index laid over a change. Deploy's closure cannot do this — `bodyInCommit` at `deploy-file-closure.module.code.ts:35-41` reads out of a commit, so no uncommitted edit is visible to it. `folder-matches-a-shape` lays a pending change over the import edge by hand because no layer beneath it will.",
    },
  ],
  constraints: ["Alan approves every new caching mechanism before it is built."],
} as const satisfies Initiative
