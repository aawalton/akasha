import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonB228b91b41e27667 = {
  id: "01a0fef5-7f2c-7579-9642-c7aa21d8d2b8",
  type: "page-type/runtime-error",
  slug: "alanwalton-b228b91b41e27667",
  fingerprint: "b228b91b41e27667",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-trait` was refused: `a composed query over `character-trait`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"character-trait","where":{"character":{"is":"character-player/hollowmere-nala"}},"keys":["character","slug","title","description","trait","rank","unrevealed"]}',
  url: "https://alanwalton.com/story-written/hollowmere-d37f89c4",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-02T23:31:34.793Z",
} as const satisfies RuntimeError
