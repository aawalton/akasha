import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberUiTesting = {
  id: "01a0c96b-692d-77fd-811a-4e25a6ff75ba",
  type: "page-type/initiative",
  slug: "ember-ui-testing",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "An agent tests a change to Temper's interface without the game running.",
    },
    {
      statement:
        "The game's own interface code runs in the sandbox, as much of it as is published.",
    },
    {
      statement: "A feature is seen against the game's own interface rather than against nothing.",
    },
  ],
} as const satisfies Initiative
