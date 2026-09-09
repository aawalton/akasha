import type { Command } from "../../../command.page-type.ts"

export const refreshAttributes = {
  id: "01a08209-d5d9-7d6a-8ba8-e42a8b51316b",
  pageTypeSlug: "command",
  slug: "refresh-attributes",
  definition: "the command working out again what each attribute earned before today",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  helpNotes: [
    "the days from 2026-09-06 up to today are added up afresh and kept as each attribute's points before today.",
    "today's points and the total are taken again straight after, so the three figures agree when the run ends.",
    "an attribute nothing can be read for keeps the figure it already carried.",
    "run this when a day has turned, or when a total looks wrong.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The points before today are the sum over the counted days short of today.",
    },
    {
      invariantKind: "departure",
      statement: "Today itself is left out of the points before today.",
    },
    {
      invariantKind: "departure",
      statement: "Each attribute's figure is kept beside that attribute's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The readings are taken again once the figures are kept.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute that could not be read keeps the figure it already had.",
    },
    {
      invariantKind: "departure",
      statement: "A run that rebuilt no attribute at all is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A run works out no level.",
    },
  ],
} as const satisfies Command
