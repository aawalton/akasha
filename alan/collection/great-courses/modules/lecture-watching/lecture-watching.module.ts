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
      statement:
        "A lecture's length is read off the site's course page, or off its video where none is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture played past its watched mark has ended once the player loads another.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture otherwise plays to the end of its video before it has ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A video that stops within a second of its end has reached its end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracked page listing no lecture to play says so and moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which lectures were watched is read from the course's page, never from the site.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A video under a minute is no lecture, so its end moves nothing on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture ending where the site names no lecture playing is not recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Once a lecture ends, no video plays until the tab moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture recorded moves the tab straight on to the next course.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture recorded is reported as lectures watched over lectures in the course.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture ending on a page the extension did not open is recorded all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the extension did not open is never paused or moved on.",
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
  updatedAt: "2026-10-20T18:31:02.798Z",
} as const satisfies Module
