import type { AlanBook } from "akasha/alan/book/alan-book.page-type.types.ts"

export const alanAndJenny = {
  id: "01a16f48-1aba-7879-ad53-60892ba19cfa",
  type: "page-type/alan-book",
  slug: "alan-and-jenny",
  definition: "the notes on what Alan and Jenny have worked out about their marriage",
  parts: ["page-type/alan-and-jenny-topic"],
  title: "Alan And Jenny",
  description:
    "What Alan and Jenny's sessions with their therapist have settled, one topic to a page: each spouse's patterns and needs, the signs that one of them is overloaded, the agreements they have made, and what works for them. A topic sits under the topic it belongs to, all the way up to the one topic that is their marriage. Alan and Jenny both read every page here.",
  unit: "unit/words",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan and Jenny write this book together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan and Jenny both read every page of this book.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change here lands without Alan's or Jenny's review.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Voice",
      act: "Write every note in the third person, naming the spouse each sentence is about.",
      warrant: "Both spouses read every note, so an I or a you in it reads as either of them.",
      aids: ["A note about both of them names both."],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Authorship",
      act: "Never write a claim about a spouse that the spouse has not made or agreed to.",
      warrant:
        "An invented sentence looks like one they said, so it reads as fact and nobody checks it again.",
      aids: [
        "Write what they said, never what it implies.",
        "One spouse's account of the other is written as that spouse's account.",
        "Mark the therapist's reading as the therapist's and you may write it.",
      ],
    },
  ],
  createdAt: "2026-10-24T18:59:18.841Z",
  updatedAt: "2026-10-24T18:59:18.841Z",
} as const satisfies AlanBook
