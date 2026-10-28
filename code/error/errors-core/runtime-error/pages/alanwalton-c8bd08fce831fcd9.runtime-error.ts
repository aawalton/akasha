import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonC8bd08fce831fcd9 = {
  id: "01a18334-378f-7599-a1f5-f3a0650153be",
  type: "page-type/runtime-error",
  slug: "alanwalton-c8bd08fce831fcd9",
  fingerprint: "c8bd08fce831fcd9",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-title` was refused: `a composed query over `character-title`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"character-title","where":{"character":{"is":"character-player/gifted-reborn-nala"}},"keys":["type","slug","character","world-title","unrevealed"]}',
  url: "https://atlas.alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:49:57.557Z",
  createdAt: "2026-10-28T15:49:59.821Z",
  updatedAt: "2026-10-28T15:49:59.821Z",
} as const satisfies RuntimeError
