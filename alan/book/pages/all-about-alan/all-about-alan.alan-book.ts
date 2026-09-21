import type { AlanBook } from "akasha/alan/book/alan-book.page-type.types.ts"

export const allAboutAlan = {
  id: "01a0659d-311d-7000-a17a-6d9d0793818c",
  type: "page-type/alan-book",
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
    "What I have worked out about myself, one topic to a page. A topic sits under the topic it belongs to, all the way up to the one topic that is me, and it holds what is settled about its own single thing. What is not settled sits beside it as a question. Read the topic before you ask me about it: a question the book already answers spends the one thing an interview is short of.",
  unit: "unit/words",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The notes are part of Alan rather than a description of Alan.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The notes have no queue of subjects to work through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A loose end is a finding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change here lands without Alan's review.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Voice",
      act: "Write every note in Alan's first person.",
      warrant:
        "A third-person note has the same facts, so nothing but the voice shows it is not his.",
      aids: [
        "Convert every sentence, not just what he said.",
        "Your own reading stays in your voice.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Authorship",
      act: "Never write a claim about Alan he has not made.",
      warrant:
        "An invented sentence looks like one he said, so it reads as fact and nobody checks it again.",
      aids: [
        "Write what he said, never what it implies.",
        "A date, a quotation and a worked case are each a claim.",
        "Mark your own reading and you may write it.",
      ],
    },
  ],
} as const satisfies AlanBook
