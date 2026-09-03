import type { Module } from "@akasha/code-system/module"

export const seatTranscriptPath = {
  id: "01a06949-b281-7c83-952b-22f6213b7460",
  pageTypeSlug: "module",
  slug: "seat-transcript-path",
  definition: "where a seat's transcript file sits, kept beside its page and read back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The record beside the page is read before the page's own value.",
    },
    {
      invariantKind: "departure",
      statement: "A path is taken as given, with no check on its shape.",
    },
    {
      invariantKind: "departure",
      statement: "An empty text is no transcript path.",
    },
    {
      invariantKind: "departure",
      statement: "Neither a record nor a page value leaves a seat with no transcript.",
    },
  ],
} as const satisfies Module
