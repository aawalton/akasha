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
      statement: "Every Temper window showing data shows it loading, empty, failed or loaded.",
    },
    {
      statement:
        "A dropdown, scroll bar, slider or text box keeps the game's behaviour and takes the web's look.",
      workingMemory:
        "The housing fields, dropdowns and sliders and the crafting panel's controls are on window-controls and deployed. An agent is sweeping every pictured window for a dropdown, scroll bar, slider or text box still in the game's look and moving each onto window-controls. The game's own ZO_ windows keep the game's look.",
    },
  ],
} as const satisfies Initiative
