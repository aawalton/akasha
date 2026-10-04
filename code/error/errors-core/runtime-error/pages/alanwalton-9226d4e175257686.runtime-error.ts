import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton9226d4e175257686 = {
  id: "01a10703-0782-769a-954b-9d3be005c55b",
  type: "page-type/runtime-error",
  slug: "alanwalton-9226d4e175257686",
  fingerprint: "9226d4e175257686",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-currency` was refused: `a composed query over `metric-character-currency`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-currency","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["character","value","history","slug","title","currency","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-04T13:03:19.254Z",
} as const satisfies RuntimeError
