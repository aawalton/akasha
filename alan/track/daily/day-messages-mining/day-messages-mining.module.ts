import type { Module } from "@akasha/code/module"

export const dayMessagesMining = {
  id: "01a082fc-e5c5-79e4-9bcb-7eacb82bf302",
  pageTypeSlug: "module",
  type: "module",
  slug: "day-messages-mining",
  definition: "each day's counts built again out of the Claude transcripts on this machine",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message counted is one Alan typed or queued and nothing an agent sent.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript belongs to the persona whose seat page a read answered it with.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript answered no seat page is read off the persona it is told it is.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript told neither is read off the name Alan greeted.",
    },
    {
      invariantKind: "departure",
      statement: "The first name a transcript has is the name it is held by.",
    },
    {
      invariantKind: "departure",
      statement: "A name quoted inside another message is no name the transcript has.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript answering to none of the three is counted against nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A name no persona is filed under is passed over rather than counted.",
    },
    {
      invariantKind: "departure",
      statement: "The day a message falls on turns at six in the morning in New York.",
    },
    {
      invariantKind: "departure",
      statement: "A day's counts are replaced by what the transcripts say rather than added to.",
    },
    {
      invariantKind: "departure",
      statement: "A day the transcripts say nothing about keeps the counts it already had.",
    },
    {
      invariantKind: "departure",
      statement: "The personas on a day sit in the order of their names.",
    },
    {
      invariantKind: "gap",
      statement: "A message Alan wrote on another machine is counted nowhere.",
    },
    {
      invariantKind: "gap",
      statement: "A transcript no longer on this machine takes its messages away with it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a count into points.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a day page that is not there.",
    },
  ],
} as const satisfies Module
