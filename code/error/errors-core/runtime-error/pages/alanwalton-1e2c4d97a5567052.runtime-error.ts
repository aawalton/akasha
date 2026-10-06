import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton1e2c4d97a5567052 = {
  id: "01a1134d-b408-7710-ab5f-d9d14bafaa9e",
  type: "page-type/runtime-error",
  slug: "alanwalton-1e2c4d97a5567052",
  fingerprint: "1e2c4d97a5567052",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","slug","title","objective","status","unrevealed"]}',
  url: "https://alanwalton.com/story-written/fairweather-ff34ba37?__v=32bde4f1f53d4e0bc6f5a1fb1642dbaeca91098c",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-06T22:20:20.978Z",
} as const satisfies RuntimeError
