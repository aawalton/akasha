import type { Module } from "../../code-system/modules/module.page-type.ts"

export const transcriptSources = {
  id: "01a06811-01d3-7000-b3d5-a000505cc21f",
  pageTypeSlug: "module",
  slug: "transcript-sources",
  definition: "where each seat's transcript is, and which subagent transcripts sit beside one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where a seat's transcript is, is asked of a bun child.",
    },
    {
      invariantKind: "departure",
      statement: "Every seat's transcript is answered in one call.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is held for a fixed moment before it is asked for again.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carrying no `seats` array is an error.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming no agent id, seat name and transcript path is an error.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is found by the meta file beside its transcript.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent whose transcript file is absent is not answered.",
    },
    {
      invariantKind: "departure",
      statement: "A directory that cannot be listed answers no subagents.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a transcript.",
    },
  ],
} as const satisfies Module
