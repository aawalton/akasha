import type { Command } from "../../../command.page-type.types.ts"

export const seatResume = {
  id: "01a0797a-9a89-7c74-a460-ae5a33be7b89",
  pageTypeSlug: "command",
  type: "command",
  slug: "seat-resume",
  definition: "the command putting a seat back on the session that seat was bound to",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<name>", takes: "the seat to resume, named as that seat's page is named" },
    {
      said: "--prompt <text>",
      takes: "the first turn a resumed seat takes up, where it was stopped",
    },
    {
      said: "--start-mode <mode>",
      takes: "whether a terminal is attached to the seat as it comes up",
    },
  ],
  helpNotes: [
    "a resume names one seat, spelled as that seat's page is spelled rather than as an id.",
    "what a resume says is written where the resume runs rather than carried back as a report.",
    "a flag not named here is refused though the module beneath a resume takes that flag.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seat resumed is named by the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A seat to resume is named as that seat's page is named.",
    },
    {
      invariantKind: "departure",
      statement: "The code a resume runs is reached only once a resume is read.",
    },
    {
      invariantKind: "departure",
      statement: "The output a resume prints is written where the resume runs.",
    },
  ],
} as const satisfies Command
