import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const learnEverythingCommand = {
  id: "01a06862-5a9b-71d6-99e3-546a60266903",
  type: "domain",
  slug: "learn-everything-command",
  definition: "what an agent runs by name over how far Ali and Alan have got through the book",
  parts: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here reads the topic pages rather than any folder of books on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A topic is named by its slug rather than by a path.",
    },
  ],
} as const satisfies Domain
