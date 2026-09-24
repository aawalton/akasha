import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberUiTesting = {
  id: "01a0c96b-692d-77fd-811a-4e25a6ff75ba",
  type: "page-type/initiative",
  slug: "ember-ui-testing",
  domain: "domain/temper",
  persona: "persona/ember",
  constraints: [
    "Each statement of how an in-game window is made is approved by Alan before that statement lands.",
  ],
  intentStack: [
    {
      statement: "Every window Temper shows in the game can be pictured.",
    },
    {
      statement:
        "An in-game window is made in the web's visual language, and every exception is stated.",
    },
    {
      statement: "Every Temper window is framed the same way.",
    },
    {
      statement:
        "Every Temper window sets text in one type scale, colored only where the color names a category.",
    },
    {
      statement: "A row, a header and a stat row look the same in every Temper window.",
    },
    {
      statement: "A number reads the same way wherever Temper shows it in the game.",
    },
    {
      statement: "Every Temper window showing data shows it loading, empty, failed or loaded.",
    },
  ],
} as const satisfies Initiative
