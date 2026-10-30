import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const wallpaper = {
  id: "01a07855-477e-7aa1-8183-3cb381287569",
  type: "page-type/route",
  slug: "wallpaper",
  definition: "the wallpaper for Alan's phone of the last persona Alan writes to",
  code: "ts",
  urlPath: "api/wallpaper",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The persona answered is the persona Alan wrote to most recently.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tie is settled by the page id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The picture is the image the persona names as her mobile wallpaper.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona with no mobile wallpaper is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Personas that went unread are refused rather than answered as no wallpaper.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the object store.",
    },
  ],
  createdAt: "2026-09-06T20:07:29.918Z",
  updatedAt: "2026-10-30T17:04:43.262Z",
} as const satisfies Route
