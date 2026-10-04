import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonF446914a6c66b315 = {
  id: "01a10706-e0c2-74eb-9676-9c7f9dd97d8f",
  type: "page-type/runtime-error",
  slug: "alanwalton-f446914a6c66b315",
  fingerprint: "f446914a6c66b315",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-attribute` was refused: `a composed query over `metric-character-attribute`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (AbortError: Fetch is aborted) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-attribute","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","value","slug","title","displayOrder","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:07:19.847Z",
} as const satisfies RuntimeError
