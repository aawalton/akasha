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
        "Every closure goes through `closureOf` in `graph-predicate-closure`, handed a `graph-predicate` page saying which edge kinds and which way. `graph-asking` answers one edge and closes nothing. Typecheck, deploy, the stylesheet globber, the gateway stamp and `answer-cost` name no edge kind or direction of their own. The only import read outside the graph now is `page-reference-filing.module.code.ts:99`, which writes the edge the graph reads the other way.",
    },
    {
      statement: "Every closure the graph answers is correct.",
      workingMemory:
        "Proven in `graph-predicate-closure.module.test.ts`: three deep closes, a cycle closes once, a gate leaves what is behind it unreached, and out and in answer the same pair. The two directions are not one relation read two ways: out is every import a body names, in is only those whose target a page claims and whose claimant page is there, gated at `page-reference-filing.module.code.ts:117`. Typecheck reaches what to compile through `importers`.",
    },
    {
      statement:
        "The graph answers a closure over the shadow a change leaves as well as over the tree there is.",
      workingMemory:
        "Proven in `graph-predicate-closure.module.test.ts`: a closure cast over `shadowOnto` sees an edit no commit has, and the same ask over the tree does not. The index and the bodies both come from the cast. Deploy reads out of a commit by design. Nothing is left that lays a change over an import edge by hand.",
    },
    {
      statement: "Every closure the graph answers is quick enough to ask on every landing.",
      workingMemory:
        "Measured by `performance/answer-cost`: out landing 555 files 292ms, in landing 1079 files 87ms, out graph-asking 143 files 52ms, in graph-asking 1102 files 65ms, out page-value-reading 31 files 20ms, in page-value-reading 3325 files 142ms. Reading a body out costs about 0.5ms a file, reading beside a page in about 0.05ms. The largest closure is 292ms against a typecheck averaging 14.8s over 3499 runs. Whether that wants a cache is Alan's to settle.",
    },
  ],
  constraints: [
    "Alan approves every new caching mechanism before it is built.",
    "Alan approves every new node kind, edge kind and attribute before it is built.",
  ],
} as const satisfies Initiative
