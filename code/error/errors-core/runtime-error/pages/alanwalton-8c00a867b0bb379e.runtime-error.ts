import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton8c00a867b0bb379e = {
  id: "01a10706-e0c2-7bce-b326-f1dc980bb367",
  type: "page-type/runtime-error",
  slug: "alanwalton-8c00a867b0bb379e",
  fingerprint: "8c00a867b0bb379e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-relationship` was refused: `a composed query over `world-relationship`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (AbortError: Fetch is aborted) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-relationship","where":{"characters":{"has":"character-player/fairweather-elsie"}},"keys":["type","slug","characters","relationshipPoints","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:07:19.861Z",
} as const satisfies RuntimeError
