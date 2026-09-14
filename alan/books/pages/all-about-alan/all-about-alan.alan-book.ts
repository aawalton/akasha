import type { AlanBook } from "akasha/alan/books/alan-book.page-type.types.ts"

export const allAboutAlan = {
  id: "01a0659d-311d-7000-a17a-6d9d0793818c",
  type: "alan-book",
  slug: "all-about-alan",
  definition: "the notes on who Alan is",
  parts: [
    "page-type/all-about-alan-experiment",
    "page-type/all-about-alan-model",
    "page-type/all-about-alan-question",
    "page-type/all-about-alan-topic",
  ],
  title: "All About Alan",
  description:
    "This is the orientation an `/abby` interviewer loads before the first question. Its job is narrow and specific: surface the **unusual, easy-to-miss things** about Alan — the places where a normal-person prior would mislead you — so you don't open cold and don't spend the session re-deriving the architecture.",
  unit: "unit/words",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The notes are part of Alan rather than a description of Alan.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The notes have no queue of subjects to work through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A loose end is a finding.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change here lands without Alan's review.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Authorship",
      act: "Never write a claim about Alan he has not made.",
      warrant:
        "An invented sentence looks like one he said, so it reads as fact and nobody checks it again.",
      aids: [
        "Write what he said, never what it implies.",
        "Mark your own reading and you may write it.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Voice",
      act: "Write every note in Alan's first person.",
      warrant:
        "A third-person note has the same facts, so nothing but the voice shows it is not his.",
      aids: [
        "Convert every sentence, not just what he said.",
        "Your own marked reading stays in your voice.",
      ],
    },
  ],
} as const satisfies AlanBook
