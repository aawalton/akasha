import type { Command } from "../../../command.page-type.types.ts"

export const refreshMessages = {
  id: "01a082fe-341d-7593-8cfd-8216a7e94c2c",
  pageTypeSlug: "command",
  type: "command",
  slug: "refresh-messages",
  definition: "the command counting again what Alan wrote each persona on each day",
  code: "ts",
  changeKind: "change-mechanical",
  helpNotes: [
    "every transcript on this machine is read, which takes a minute.",
    "a message counted is one Alan typed or queued, and nothing an agent or the harness sent.",
    "who a transcript was written to is read off the persona it names, then the seat page it names, then the name Alan greeted.",
    "a transcript answering to none of the three is counted against nobody, so a total reads low rather than wrong.",
    "each day's counts are replaced, so running this twice counts nothing twice.",
    "`akasha refresh personas` turns the counts into points once this has run.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The counts are what the transcripts say rather than what was kept before.",
    },
    {
      invariantKind: "departure",
      statement: "A day the transcripts say nothing about keeps the counts it already had.",
    },
    {
      invariantKind: "departure",
      statement: "A date no day page is filed under is said rather than kept against no day.",
    },
    {
      invariantKind: "departure",
      statement: "A run that counted no day at all is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A run turns no count into points.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
  ],
} as const satisfies Command
