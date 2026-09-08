import type { Command } from "../../../command.page-type.ts"

export const refreshPersonas = {
  id: "01a082e7-c8d0-7100-993a-5d7b2a70490d",
  pageTypeSlug: "command",
  slug: "refresh-personas",
  definition: "the command working out again what each persona earned before today",
  code: "ts",
  changeKindSlug: "change-mechanical",
  helpNotes: [
    "the days from 2026-09-08 up to today are added up afresh and kept as each persona's points before today.",
    "a hundred messages Alan wrote is one point.",
    "today's own count is left alone, so the figures agree when the run ends.",
    "a timer runs this once each day has opened, so run it by hand only when a total looks wrong.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rebuilding this asks for is the rebuilding the timer asks for.",
    },
    {
      invariantKind: "departure",
      statement: "A run that rebuilt no persona at all is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A run works out no rung.",
    },
    {
      invariantKind: "absence",
      statement: "A run counts no message of today's.",
    },
  ],
} as const satisfies Command
