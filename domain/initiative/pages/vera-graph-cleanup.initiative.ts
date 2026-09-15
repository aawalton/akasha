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
        "Every closure goes through `closureOf` in `graph-predicate-closure`, handed a `graph-predicate` page saying which edge kinds and which way. `graph-asking` answers one edge and closes nothing. Typecheck, deploy, the stylesheet globber, the gateway stamp and `answer-cost` name no edge kind or direction of their own. What still reads an import without the graph is one edge rather than a closure: `folder-matches-a-shape.check.code.ts:37` and `page-reference-filing.module.code.ts:99`.",
    },
    {
      statement:
        "Every closure the graph answers is correct, and quick enough to ask on every landing.",
      workingMemory:
        "Measured by `performance/answer-cost` after the cutover: out landing 555 files 292ms, in landing 1079 files 87ms, out graph-asking 143 files 52ms, in graph-asking 1102 files 65ms, out page-value-reading 31 files 20ms, in page-value-reading 3325 files 142ms. Reading a body out costs about 0.5ms a file, reading beside a page in about 0.05ms. The largest closure is 292ms against a typecheck averaging 14.8s over 3499 runs, so no cache earns its keep yet.",
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
