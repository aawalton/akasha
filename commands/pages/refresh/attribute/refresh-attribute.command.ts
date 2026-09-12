import type { Command } from "akasha/commands/command.page-type.types.ts"

export const refreshAttribute = {
  id: "01a08209-d5d9-7d6a-8ba8-e42a8b51316b",
  type: "command",
  slug: "refresh-attribute",
  definition: "the command working out again what each attribute earned before today",
  code: "ts",
  test: "ts",
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
      invariantKind: "departure",
      statement: "Each attribute is named as soon as that attribute's figure is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw part way names those attributes in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The keeping and the taking this runs are handed in.",
    },
    {
      invariantKind: "absence",
      statement: "A run works out no level.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying any word is refused, because this takes no argument.",
    },
  ],
  name: "attribute",
  arguments: [],
} as const satisfies Command
