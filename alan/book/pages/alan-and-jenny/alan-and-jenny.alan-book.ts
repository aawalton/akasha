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
    {
      decisionKind: "decision-kind/departure",
      statement: "A note is written in the third person and names the spouse it is about.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No note holds a claim about a spouse that spouse has not made or agreed to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One spouse's account of the other is written as that spouse's account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading the therapist gave is written as the therapist's reading.",
    },
  ],
  createdAt: "2026-10-24T18:59:18.841Z",
  updatedAt: "2026-10-24T19:04:41.143Z",
} as const satisfies AlanBook
