import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonA8299b7249b59af9 = {
  id: "01a11b82-a923-7f10-be2b-51718188306c",
  type: "page-type/runtime-error",
  slug: "alanwalton-a8299b7249b59af9",
  fingerprint: "a8299b7249b59af9",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-trait` was refused: `a composed query over `character-trait`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"character-trait","where":{"character":{"is":"character-player/encounters-alan"}},"keys":["type","character","slug","title","description","trait","rank","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/encounters-0002-eleven-ec1b5225",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-08T12:35:08.817Z",
} as const satisfies RuntimeError
