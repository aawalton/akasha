import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton6fa0d98a810a6132 = {
  id: "01a0fef5-7f2c-74b5-a061-f269c7feb984",
  type: "page-type/runtime-error",
  slug: "alanwalton-6fa0d98a810a6132",
  fingerprint: "6fa0d98a810a6132",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/hollowmere-nala"}},"keys":["character","title","slot","description","quantity","unrevealed"]}',
  url: "https://alanwalton.com/story-written/hollowmere-d37f89c4",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-02T23:31:34.727Z",
} as const satisfies RuntimeError
