import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonD1ea799114e7f4a5 = {
  id: "01a1111a-a70c-7d50-95d0-46eea87eaa5a",
  type: "page-type/runtime-error",
  slug: "alanwalton-d1ea799114e7f4a5",
  fingerprint: "d1ea799114e7f4a5",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/fairweather-elsie"}},"keys":["slug","character","title","slot","description","quantity","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0005-honey-cake-3e476e13",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-06T12:05:20.855Z",
} as const satisfies RuntimeError
