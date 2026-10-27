import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberHudFloatLayout = {
  id: "01a17ebb-f7a0-7736-a2f6-cf9828de4734",
  type: "page-type/initiative",
  slug: "ember-hud-float-layout",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    { statement: "The sandbox pictures the game's own HUD panels where the game places them." },
    { statement: "A HUD layout states each panel's dock and display order, and each dock's gap." },
    { statement: "The addon stacks each dock's panels away from that dock's edge or corner." },
    { statement: "A hidden panel takes no room and leaves no gap." },
    { statement: "The layout is placed again when a panel shows, hides or changes size." },
    { statement: "Two docks on one edge share that edge between them." },
    { statement: "A panel of Temper's own shrinks to the room its dock leaves it." },
    { statement: "A panel that never moves is the first panel of its dock." },
    { statement: "The layout is placed again after Edit HUD places its saved positions." },
    { statement: "Keyboard mode and gamepad mode each have a layout of their own." },
    { statement: "A layout states a scale for a panel." },
  ],
  constraints: ["No panel scrolls.", "Nothing here writes Edit HUD's saved positions."],
  createdAt: "2026-10-27T19:00:10.271Z",
  updatedAt: "2026-10-27T19:00:10.271Z",
} as const satisfies Initiative
