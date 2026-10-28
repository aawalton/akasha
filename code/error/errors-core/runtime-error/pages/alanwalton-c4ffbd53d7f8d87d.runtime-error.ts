import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonC4ffbd53d7f8d87d = {
  id: "01a18334-378f-794c-abce-96c6a6044de7",
  type: "page-type/runtime-error",
  slug: "alanwalton-c4ffbd53d7f8d87d",
  fingerprint: "c4ffbd53d7f8d87d",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/gifted-reborn-nala"}},"keys":["type","character","slug","title","description","skill","experience","attribute","abilityKind","dormant","unrevealed"]}',
  url: "https://atlas.alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:49:57.654Z",
  createdAt: "2026-10-28T15:49:59.821Z",
  updatedAt: "2026-10-28T15:49:59.821Z",
} as const satisfies RuntimeError
