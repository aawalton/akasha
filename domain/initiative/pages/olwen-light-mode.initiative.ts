import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const olwenLightMode = {
  id: "01a16f6e-d5e5-7919-9455-181dbf30eca7",
  type: "page-type/initiative",
  slug: "olwen-light-mode",
  domain: "domain/design-interface-system",
  persona: "persona/olwen",
  intentStack: [
    { statement: "Every color token has a light value beside its dark value." },
    { statement: "A page renders in the scheme its reader chose before the page paints." },
    { statement: "A reader chooses light, dark or the device's scheme on a settings page." },
    { statement: "The sidebar footer links to the settings page." },
    { statement: "No component writes a color that the light scheme cannot change." },
    { statement: "The design gallery shows every token in both schemes." },
  ],
  constraints: [
    "The dark scheme looks the same after the light scheme lands.",
    "Every light text token meets a contrast of 4.5 to 1 on the four lowest surfaces.",
  ],
  createdAt: "2026-10-24T19:41:37.123Z",
  updatedAt: "2026-10-24T19:47:07.131Z",
} as const satisfies Initiative
