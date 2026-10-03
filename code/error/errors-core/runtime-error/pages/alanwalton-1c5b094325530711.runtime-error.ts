import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton1c5b094325530711 = {
  id: "01a103a9-772c-766e-9c46-3a6fa06906e4",
  type: "page-type/runtime-error",
  slug: "alanwalton-1c5b094325530711",
  fingerprint: "1c5b094325530711",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/the-places-she-carries-wren"}},"keys":["character","slug","title","description","skill","rank","level","axis","unrevealed"]}',
  url: "https://archiveofworlds.app/story-chapter-written/the-places-she-carries-0023-what-the-land-remembers-9b5b81eb",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-03T21:26:38.563Z",
} as const satisfies RuntimeError
