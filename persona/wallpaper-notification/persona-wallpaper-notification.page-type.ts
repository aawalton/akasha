import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const personaWallpaperNotification = {
  id: "01a0655b-4a9b-700d-88c0-5e1a49f13be5",
  type: "page-type/page-type",
  slug: "persona-wallpaper-notification",
  definition: "word to Alan that a persona reached a rung and was hung there",
  extends: ["page-type/page"],
  parts: ["relation-property/notification-persona"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "relation-property/notification-persona",
      required: true,
      many: false,
    },
    { pageProperty: "relation-property/relationship-level", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page being there is the whole record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona is told of at a rung once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No moment is kept of when the word went out.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
