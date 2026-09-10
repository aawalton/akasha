import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const bookOfEverything = {
  id: "01a06584-9bf3-7008-b597-8cc5e6e6c3e6",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "book-of-everything",
  definition: "how far into the whole of knowledge Ali has read, node by node",
  parts: [
    "page-type/learn-everything-topic",
    "page-type/mastery-level",
    "module/topic-tree",
    "module/seeded-draw",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The outline is the whole of knowledge.",
    },
    {
      invariantKind: "departure",
      statement: "The files on disk are how far into the outline Ali has got.",
    },
    {
      invariantKind: "departure",
      statement: "A node's mastery level is judged by hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A node with children is scored at a rung of its own just as a node without children is.",
    },
    {
      invariantKind: "departure",
      statement: "A node's coverage is worked out from the children beneath the node.",
    },
    {
      invariantKind: "departure",
      statement: "A topic names the topic above rather than sitting in that topic's folder.",
    },
    {
      invariantKind: "departure",
      statement: "How far Alan has mastered each part of the map is kept with the part.",
    },
  ],
} as const satisfies Domain
