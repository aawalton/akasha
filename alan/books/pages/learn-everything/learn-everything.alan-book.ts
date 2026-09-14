import type { AlanBook } from "akasha/alan/books/alan-book.page-type.types.ts"

export const learnEverything = {
  id: "01a0659d-311d-7001-b736-ae7c499c3bf3",
  type: "alan-book",
  slug: "learn-everything",
  definition: "the edges where Alan's model of the world thins",
  title: "Learn Everything",
  description:
    "<!-- Where his model thins — the edge located by the probe that set D. Becomes next session's bites. -->",
  unit: "words",
} as const satisfies AlanBook
