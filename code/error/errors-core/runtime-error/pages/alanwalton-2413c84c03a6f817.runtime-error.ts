import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton2413c84c03a6f817 = {
  id: "01a103a9-772c-76d0-b3fa-8fe38c185dfa",
  type: "page-type/runtime-error",
  slug: "alanwalton-2413c84c03a6f817",
  fingerprint: "2413c84c03a6f817",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-trait` was refused: `a composed query over `character-trait`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"character-trait","where":{"character":{"is":"character-player/the-places-she-carries-wren"}},"keys":["character","slug","title","description","trait","rank","unrevealed"]}',
  url: "https://archiveofworlds.app/story-chapter-written/the-places-she-carries-0023-what-the-land-remembers-9b5b81eb",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-03T21:26:38.515Z",
} as const satisfies RuntimeError
