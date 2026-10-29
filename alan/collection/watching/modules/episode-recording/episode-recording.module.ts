import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const episodeRecording = {
  id: "01a18818-57d5-7862-b487-74339026644c",
  type: "page-type/module",
  slug: "episode-recording",
  definition: "the pages a finished episode or film is recorded on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A show is recognized by the title the page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An episode is recognized by its number in its season, or by its title where no season is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show or a film akasha holds no page for records nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode already completed is recorded again as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season is completed where the episode recorded was the last of it uncompleted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season not begun is moved to in progress, and a show not begun with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A film is recognized by its title alone and states the minutes it runs to.",
    },
  ],
  createdAt: "2026-10-29T14:37:39.156Z",
  updatedAt: "2026-10-29T14:37:39.156Z",
} as const satisfies Module
