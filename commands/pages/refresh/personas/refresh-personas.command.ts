import type { Command } from "../../../command.page-type.ts"

export const refreshPersonas = {
  id: "01a082e7-c8d0-7100-993a-5d7b2a70490d",
  pageTypeSlug: "command",
  slug: "refresh-personas",
  definition: "the command working out again what each persona earned before today",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  helpNotes: [
    "the days from 2026-09-08 up to today are added up afresh and kept as each persona's points before today.",
    "a hundred messages Alan wrote is one point.",
    "today's own count is left alone, so the figures agree when the run ends.",
    "run this when a day has turned, or when a total looks wrong.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The points before today are the messages over the counted days short of today.",
    },
    {
      invariantKind: "departure",
      statement: "Today itself is left out of the points before today.",
    },
    {
      invariantKind: "departure",
      statement: "Each persona's figure is kept beside her own page.",
    },
    {
      invariantKind: "departure",
      statement: "A name no persona is filed under is said rather than kept against nobody.",
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
