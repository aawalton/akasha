import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonCccb0723dd26a479 = {
  id: "01a11b82-a923-781b-8d6b-51b26fe9e201",
  type: "page-type/runtime-error",
  slug: "alanwalton-cccb0723dd26a479",
  fingerprint: "cccb0723dd26a479",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/encounters-alan"}},"keys":["type","character","slug","title","description","skill","rank","level","axis","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/encounters-0002-eleven-ec1b5225",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-08T12:35:08.818Z",
} as const satisfies RuntimeError
