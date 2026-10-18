import type { BrowserExtension } from "akasha/infrastructure/service/akasha-service/browser-extension/browser-extension.page-type.types.ts"

export const greatCoursesWatching = {
  id: "01a15011-354e-722a-b1f1-21e1f9bf57dc",
  type: "page-type/browser-extension",
  slug: "great-courses-watching",
  definition: "the extension walking Alan through one lecture of each unfinished course a day",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The toolbar button opens the first course of the queue in a tab of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tab the extension opened is the one tab it tracks and moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course is opened at the next lecture the site counts unwatched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every video on the site plays at the speed the extension keeps, three by default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Shift with the greater-than or less-than key moves that speed a quarter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture ending writes the course's length and progress in minutes to its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those minutes are what the site counts watched, so a missed write mends itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "After a write, the next course in the queue opens in that tab ten seconds on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that is refused stops the tab, saying why, rather than moving on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The course just watched is never opened again that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every read and write of a course page goes through alanwalton.com as Alan.",
    },
  ],
  createdAt: "2026-10-18T17:31:07.469Z",
  updatedAt: "2026-10-18T17:31:07.469Z",
} as const satisfies BrowserExtension
