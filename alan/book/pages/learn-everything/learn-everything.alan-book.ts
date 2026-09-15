import type { AlanBook } from "akasha/alan/book/alan-book.page-type.types.ts"

export const learnEverything = {
  id: "01a0659d-311d-7001-b736-ae7c499c3bf3",
  type: "alan-book",
  slug: "learn-everything",
  definition: "how far into the whole of knowledge Ali has read, node by node",
  parts: [
    "domain/learn-everything-command",
    "module/seeded-draw",
    "module/topic-tree",
    "page-type/learn-everything-topic",
    "page-type/mastery-level",
  ],
  title: "Learn Everything",
  description:
    "<!-- Where his model thins — the edge located by the probe that set D. Becomes next session's bites. -->",
  unit: "unit/words",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The outline is the whole of knowledge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files on disk are how far into the outline Ali has got.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node's mastery level is judged by hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A node with children is scored at a rung of its own just as a node without children is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node's coverage is worked out from the children beneath the node.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A topic names the topic above rather than sitting in that topic's folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How far Alan has mastered each part of the map is kept with the part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A topic's mastery level is written to that topic's page and never told to Alan in any form.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answers Alan got right and the answers Alan got wrong are told to Alan.",
    },
  ],
} as const satisfies AlanBook
