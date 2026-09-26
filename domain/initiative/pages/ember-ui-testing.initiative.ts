import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberUiTesting = {
  id: "01a0c96b-692d-77fd-811a-4e25a6ff75ba",
  type: "page-type/initiative",
  slug: "ember-ui-testing",
  domain: "domain/temper",
  persona: "persona/ember",
  constraints: [
    "Each statement of how an in-game window departs from the web's visual language is approved by Alan before that statement lands.",
  ],
  intentStack: [
    {
      statement: "Guild Store Search covers the game's guild store only once its button opens it.",
      workingMemory:
        "Alan approved a button. b24965c adds a Temper Search button in the game's store window; items is deployed at 753aa8a9. The store is yet to be pictured closed and open.",
    },
  ],
} as const satisfies Initiative
