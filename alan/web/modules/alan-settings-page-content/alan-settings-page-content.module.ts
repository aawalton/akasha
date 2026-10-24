import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanSettingsPageContent = {
  id: "01a16f7d-6d4b-7933-81fc-27981210f219",
  type: "page-type/module",
  slug: "alan-settings-page-content",
  definition: "the settings a signed-in reader of Alan's site chooses",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader chooses the color scheme here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice takes effect as it is made, with nothing to save.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A choice is kept on the reader's person page, so it follows them to every device.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice that could not be kept is said beside the choice.",
    },
  ],
  createdAt: "2026-10-24T19:57:33.386Z",
  updatedAt: "2026-10-24T21:28:38.090Z",
} as const satisfies Module
