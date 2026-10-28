import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton50f2ad9cc19c86d0 = {
  id: "01a1800b-9d38-7c17-90c2-3a2c9a0d8488",
  type: "page-type/runtime-error",
  slug: "alanwalton-50f2ad9cc19c86d0",
  fingerprint: "50f2ad9cc19c86d0",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-trait` was refused: `a composed query over `character-trait`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"character-trait","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","slug","title","description","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-28T01:06:46.296Z",
  createdAt: "2026-10-28T01:06:47.223Z",
  updatedAt: "2026-10-28T01:06:47.223Z",
} as const satisfies RuntimeError
