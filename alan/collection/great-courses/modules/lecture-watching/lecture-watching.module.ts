import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lectureWatching = {
  id: "01a15011-354f-78d6-82ec-0a858c39f46c",
  type: "page-type/module",
  slug: "lecture-watching",
  definition: "a Great Courses page watched through, at speed, with each lecture recorded",
  code: "ts",
  test: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture's length and watched mark are read off the course page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What was played is read from the site's own lecture progress as Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A video under a minute is no lecture, so its end moves nothing on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture ended is counted watched even before the site has saved it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Once a lecture ends, no video plays until Alan stays or the tab moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A speed is kept between a half and four, on the quarters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key pressed while typing in a field moves no speed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the extension says on the page is drawn in the browser's own colors.",
    },
  ],
  createdAt: "2026-10-18T17:31:07.469Z",
  updatedAt: "2026-10-18T17:31:07.469Z",
} as const satisfies Module
