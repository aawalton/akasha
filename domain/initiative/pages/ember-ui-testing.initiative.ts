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
      statement: "Guild Store Search covers none of the game's guild store windows.",
      workingMemory:
        "Sell Price opens clear of the game's windows. Guild Store Search is 1571 by 1412 and covers them all; no gap fits its list. Alan was asked whether it opens from a button instead.",
    },
  ],
} as const satisfies Initiative
