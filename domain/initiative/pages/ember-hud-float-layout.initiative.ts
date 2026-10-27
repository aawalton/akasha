import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberHudFloatLayout = {
  id: "01a17ebb-f7a0-7736-a2f6-cf9828de4734",
  type: "page-type/initiative",
  slug: "ember-hud-float-layout",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    { statement: "The layout is placed again after Edit HUD places its saved positions." },
    { statement: "Keyboard mode and gamepad mode each have a layout of their own." },
    { statement: "A layout states a scale for a panel." },
  ],
  constraints: ["No panel scrolls.", "Nothing here writes Edit HUD's saved positions."],
  createdAt: "2026-10-27T19:00:10.271Z",
  updatedAt: "2026-10-27T20:28:52.686Z",
} as const satisfies Initiative
