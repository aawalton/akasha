import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonA58a78814123d0dd = {
  id: "01a18334-cac8-7721-921a-5c22767fc23a",
  type: "page-type/runtime-error",
  slug: "alanwalton-a58a78814123d0dd",
  fingerprint: "a58a78814123d0dd",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-title` was refused: `a composed query over `character-title`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"character-title","where":{"character":{"is":"character-player/test-story-player"}},"keys":["type","slug","character","world-title","unrevealed"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:35.746Z",
  createdAt: "2026-10-28T15:50:37.511Z",
  updatedAt: "2026-10-28T15:50:37.511Z",
} as const satisfies RuntimeError
