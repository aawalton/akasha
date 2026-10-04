import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton4bce3f83e32f56a6 = {
  id: "01a10706-e0c2-79a0-b0e9-290977345c3b",
  type: "page-type/runtime-error",
  slug: "alanwalton-4bce3f83e32f56a6",
  fingerprint: "4bce3f83e32f56a6",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-trait` was refused: `a composed query over `character-trait`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (AbortError: Fetch is aborted) — 4 attempts were spent and nothing came back — the question was {"page-type":"character-trait","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","slug","title","description","trait","rank","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:07:19.746Z",
} as const satisfies RuntimeError
