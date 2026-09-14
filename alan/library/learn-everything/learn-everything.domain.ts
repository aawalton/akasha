import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const learnEverything = {
  id: "01a06584-9bf3-7008-b597-8cc5e6e6c3e6",
  type: "domain",
  slug: "learn-everything",
  definition: "how far into the whole of knowledge Ali has read, node by node",
  parts: [
    "domain/learn-everything-commands",
    "module/seeded-draw",
    "module/topic-tree",
    "page-type/learn-everything-topic",
    "page-type/mastery-level",
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
    {
      invariantKind: "departure",
      statement:
        "A topic's mastery level is written to that topic's page and never told to Alan in any form.",
    },
    {
      invariantKind: "departure",
      statement: "The answers Alan got right and the answers Alan got wrong are told to Alan.",
    },
  ],
} as const satisfies Domain
