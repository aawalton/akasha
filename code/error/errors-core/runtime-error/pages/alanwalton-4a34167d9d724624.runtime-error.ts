import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton4a34167d9d724624 = {
  id: "01a10706-e0c2-7b83-8fae-8e40d0736972",
  type: "page-type/runtime-error",
  slug: "alanwalton-4a34167d9d724624",
  fingerprint: "4a34167d9d724624",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (AbortError: Fetch is aborted) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","slug","title","description","skill","rank","level","axis","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:07:19.752Z",
} as const satisfies RuntimeError
