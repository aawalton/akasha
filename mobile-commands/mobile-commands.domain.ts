import type { Domain } from "../domains/domain.page-type.types.ts"

export const mobileCommands = {
  id: "01a0685d-ceae-7000-bca6-75f9319e56ca",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "mobile-commands",
  definition: "what an agent runs by name over the ios apps and the simulator driving them",
  parts: ["module/mobile-answering"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A command here reports the work and the work itself is done by mobile-cli.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the mac except through mobile-cli.",
    },
    {
      invariantKind: "departure",
      statement: "One simulator session is there at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command driving the simulator attaches to the standing session rather than opening its own.",
    },
    {
      invariantKind: "gap",
      statement: "The build a command here installs to a simulator is taken by `ios-app build`.",
    },
  ],
} as const satisfies Domain
