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
        "The graph answers `edgesOutOf` and `reachingOutOf` over import edges, reading each body from the reader handed in and only where TypeScript parses it. The deploy closure and the stylesheet globber both ask it, and `reachedFrom` is gone. What is left is the gateway's own walk at `gateway-tree-version.module.code.ts:72-91`, and the relation edge, which is read into a node but not out of one.",
    },
    {
      statement:
        "Every closure the graph answers is correct, and quick enough to ask on every landing.",
      workingMemory:
        "Two walkers are gone into the graph and the third is not: `gateway-tree-version.module.code.ts` reads specifiers with a regex of its own, resolves `.ts` and `index.ts` endings the graph does not, and refuses on a member it cannot read where the graph answers nothing. Nothing measures any closure. What correct rests on is one rule used twice. What quick rests on is this domain's caching invariants: an answer keyed by what it rests on and learning it is stale by being asked.",
    },
    {
      statement:
        "The graph answers a closure over the shadow a change leaves as well as over the tree there is.",
      workingMemory:
        "The seam is already there: `graph-asking` reads every body through the `Answering` index handed in rather than off the working tree, and the typecheck decision hands it an index laid over a change. Deploy's closure cannot do this — `bodyInCommit` at `deploy-file-closure.module.code.ts:35-41` reads out of a commit, so no uncommitted edit is visible to it. `folder-matches-a-shape` lays a pending change over the import edge by hand because no layer beneath it will.",
    },
  ],
  constraints: [
    "Alan approves every new caching mechanism before it is built.",
    "Alan approves every new node kind, edge kind and attribute before it is built.",
  ],
} as const satisfies Initiative
