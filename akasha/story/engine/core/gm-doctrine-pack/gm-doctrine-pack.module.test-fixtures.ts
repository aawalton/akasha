import type { GmDoctrinePack } from "./gm-doctrine-pack.module.code.ts"

export const FIXTURE_PACK: GmDoctrinePack = {
  doctrineVersion: 6,
  policies: [
    { id: "doctrine:alpha", title: "Alpha", description: "a", bands: ["a1", "a2"] },
    { id: "doctrine:beta", title: "Beta", bands: [] },
  ],
  sheetTemplate: {
    standards: [
      {
        class: "skill",
        path: "skills",
        textField: "description",
        maxLength: 240,
        requireText: false,
      },
    ],
  },
  gateDimensions: [
    { id: "window-pane-prose", title: "Window-pane prose" },
    { id: "system-voice", title: "System voice", suspendableWhen: "zero-mechanics game" },
  ],
}
