import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const graph = {
  id: "01a04fcf-588c-7772-afed-357ed2e459d4",
  pageTypeSlug: "workspace-package",
  slug: "graph",
  definition: "what follows from the pages, and what each answer rests on",
  manifest: "json",
  partSlugs: [
    "page-type/graph-node",
    "page-type/graph-edge",
    "page-type/graph-attribute",
    "module/file-kind-authorship",
    "module/graph-asking",
    "module/graph-closure",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The indexes answer what stands.",
    },
    {
      invariantKind: "departure",
      statement: "The graph answers what follows from the pages.",
    },
    {
      invariantKind: "departure",
      statement: "The graph is never assembled.",
    },
    {
      invariantKind: "departure",
      statement:
        "What an answer rests on is worked out from the code rather than recorded as the code runs.",
    },
    {
      invariantKind: "gap",
      statement: "What the graph derives is a cache and never an index.",
    },
    {
      invariantKind: "gap",
      statement: "Throwing away what the graph derives costs only speed.",
    },
    {
      invariantKind: "gap",
      statement: "A kept answer learns it is stale by being asked rather than by being told.",
    },
    {
      invariantKind: "gap",
      statement:
        "An answer is keyed by what the answer rests on and marked by the code that made the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The graph reaches no further than the akasha folder.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves Kinds",
      act: "Add a node, edge or attribute to the graph only where Alan has approved that kind.",
      warrant:
        "Every reader asks in these terms, so a kind nobody wanted becomes a word the whole system speaks.",
      aids: [
        "Approving the initiative is not approving a kind.",
        "A kind replacing an old one still needs approval.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Never Depend On Everything",
      act: "Key a question of the pages so a change reaches one key, never the whole table.",
      warrant:
        "A cache that never hits costs more than none, and an answer resting on everything never hits.",
      aids: [
        "A table is written as the rule that adjusts it, and rebuilt by adjusting from empty.",
        "One rule used twice cannot disagree with itself.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Trust The Index",
      act: "Read what the index answers. Never check that it is there, and never re-derive what it said.",
      warrant:
        "A reader that validates pays on every call for a fault a command should never have written.",
      aids: [],
    },
  ],
} as const satisfies WorkspacePackage
