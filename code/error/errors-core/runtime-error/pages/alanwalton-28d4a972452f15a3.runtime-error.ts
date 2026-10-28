import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton28d4a972452f15a3 = {
  id: "01a1800b-9d37-7a7d-8115-b58e75f49af4",
  type: "page-type/runtime-error",
  slug: "alanwalton-28d4a972452f15a3",
  fingerprint: "28d4a972452f15a3",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/fairweather-elsie"}},"keys":["slug","character","title","slot","description","quantity","category","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-28T01:06:46.286Z",
  createdAt: "2026-10-28T01:06:47.223Z",
  updatedAt: "2026-10-28T01:06:47.223Z",
} as const satisfies RuntimeError
