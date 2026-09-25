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
      statement: "Every window Temper shows in the game can be pictured.",
    },

    {
      statement: "Every Temper window showing data shows it loading, empty, failed or loaded.",
    },
  ],
} as const satisfies Initiative
