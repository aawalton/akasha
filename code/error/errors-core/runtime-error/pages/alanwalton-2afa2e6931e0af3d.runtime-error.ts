import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton2afa2e6931e0af3d = {
  id: "01a10706-e0c1-730c-bbc7-504e9e09c142",
  type: "page-type/runtime-error",
  slug: "alanwalton-2afa2e6931e0af3d",
  fingerprint: "2afa2e6931e0af3d",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (AbortError: Fetch is aborted) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/fairweather-elsie"}},"keys":["slug","character","title","slot","description","quantity","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:07:19.950Z",
} as const satisfies RuntimeError
