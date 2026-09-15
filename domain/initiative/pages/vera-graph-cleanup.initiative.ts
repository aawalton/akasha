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
      statement: "Every closure the graph answers is correct.",
      workingMemory:
        "Proven in `graph-predicate-closure.module.test.ts`: three deep closes, a cycle closes once, a gate leaves what is behind it unreached, and out and in answer the same pair. In is out narrowed to edges whose target a page claims, gated at `page-reference-filing.module.code.ts:117`. The two coincide because every file is owned by a page: `file-is-owned-by-a-page` audited 143,625 paths at 16:50Z on 2026-09-15 and refused none.",
    },
    {
      statement:
        "The graph answers a closure over the shadow a change leaves as well as over the tree there is.",
      workingMemory:
        "Proven in `graph-predicate-closure.module.test.ts`: a closure cast over `shadowOnto` sees an edit no commit has, and the same ask over the tree does not. The index and the bodies both come from the cast. Deploy reads out of a commit by design. Nothing is left that lays a change over an import edge by hand.",
    },
    {
      statement: "What a closure costs is measured by a command, as a change and a check are.",
      workingMemory:
        "Met. `akasha measure closure <slug> <seed>...` landed at `20c4d0f1f50`, answering seeds, nodes, edges, processor seconds, wall seconds and memory, in the shape `measure change` and `measure check` answer in. It reads cost through `check-cost` and units through `check-measuring`, so the three read alike. `graph/closure/answer-cost` was what it replaces and is gone.",
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
