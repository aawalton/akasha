import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const graphSystem = {
  id: "01a04fcf-588c-7772-afed-357ed2e459d4",
  pageTypeSlug: "domain",
  slug: "graph-system",
  definition: "what follows from the pages, and what each answer rests on",
  partSlugs: [
    "page-type/graph-node",
    "page-type/graph-edge",
    "page-type/graph-attribute",
    "module/graph-asking",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The indexes answer what stands.",
    },
    {
      invariantKind: "departure",
      statement: "The graph answers what follows from it.",
    },
    {
      invariantKind: "departure",
      statement: "The graph is never assembled.",
    },
    {
      invariantKind: "departure",
      statement:
        "What an answer rests on is worked out from the code that computes it rather than recorded as it runs.",
    },
    {
      invariantKind: "departure",
      statement: "What the graph derives is a cache and never an index.",
    },
    {
      invariantKind: "departure",
      statement: "Throwing away what the graph derives costs only speed.",
    },
    {
      invariantKind: "departure",
      statement: "A kept answer learns it is stale by being asked rather than by being told.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is keyed by what it rests on and marked by the code that made it.",
    },
    {
      invariantKind: "departure",
      statement: "The graph reaches no further than the akasha folder.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves",
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
      act: "Key a corpus question so a change reaches one key, never the whole table.",
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
        "A reader that validates pays on every call for a fault the door should never have written.",
      aids: [],
    },
  ],
} as const satisfies Domain
