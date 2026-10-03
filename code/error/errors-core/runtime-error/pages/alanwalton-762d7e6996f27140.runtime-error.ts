import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton762d7e6996f27140 = {
  id: "01a103a9-772c-7e04-9411-26e7b71b4058",
  type: "page-type/runtime-error",
  slug: "alanwalton-762d7e6996f27140",
  fingerprint: "762d7e6996f27140",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/the-places-she-carries-wren"}},"keys":["character","slug","title","objective","status","unrevealed"]}',
  url: "https://archiveofworlds.app/story-chapter-written/the-places-she-carries-0023-what-the-land-remembers-9b5b81eb",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-03T21:26:38.565Z",
} as const satisfies RuntimeError
