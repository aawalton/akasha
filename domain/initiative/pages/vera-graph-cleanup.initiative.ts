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
        "The graph answers `edgesOutOf` and `reachingOutOf` over import edges, reading each body from the reader handed in and only where TypeScript parses it. The deploy closure, the stylesheet globber and the gateway's version stamp all ask it, and both walkers they used are gone. What still reads an import without the graph is one edge rather than a closure: `folder-matches-a-shape.check.code.ts:37`, and `page-reference-filing.module.code.ts:99`, which writes the edge the graph reads the other way.",
    },
    {
      statement:
        "Every closure the graph answers is correct, and quick enough to ask on every landing.",
      workingMemory:
        "Measured by `performance/answer-cost`: out landing 555 files 230ms, in landing 1079 files 58ms, out graph-asking 143 files 28ms, in graph-asking 1100 files 49ms, out page-value-reading 31 files 17ms, in page-value-reading 3329 files 77ms. Reading a body out costs about 0.4ms a file, reading the file beside a page in about 0.05ms. The largest closure is 230ms against a typecheck averaging 14.8s over 3499 runs, so no cache earns its keep yet.",
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
