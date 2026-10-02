import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonCc0ed87b9ae2da67 = {
  id: "01a0fef5-7f2c-7ee6-82c5-d40e170f365f",
  type: "page-type/runtime-error",
  slug: "alanwalton-cc0ed87b9ae2da67",
  fingerprint: "cc0ed87b9ae2da67",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/hollowmere-nala"}},"keys":["character","slug","title","description","skill","rank","level","axis","unrevealed"]}',
  url: "https://alanwalton.com/story-written/hollowmere-d37f89c4",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-02T23:31:34.709Z",
} as const satisfies RuntimeError
