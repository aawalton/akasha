import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonF02b1eab7ce12893 = {
  id: "01a10706-e0c2-7c69-bd3c-973416e74297",
  type: "page-type/runtime-error",
  slug: "alanwalton-f02b1eab7ce12893",
  fingerprint: "f02b1eab7ce12893",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (AbortError: Fetch is aborted) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","slug","title","objective","status","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:07:19.843Z",
} as const satisfies RuntimeError
