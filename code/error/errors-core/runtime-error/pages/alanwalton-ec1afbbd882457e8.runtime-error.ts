import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonEc1afbbd882457e8 = {
  id: "01a18334-378f-7921-8aa9-52f73148d334",
  type: "page-type/runtime-error",
  slug: "alanwalton-ec1afbbd882457e8",
  fingerprint: "ec1afbbd882457e8",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/gifted-reborn-nala"}},"keys":["slug","character","title","slot","description","quantity","category","unrevealed"]}',
  url: "https://atlas.alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:49:57.655Z",
  createdAt: "2026-10-28T15:49:59.821Z",
  updatedAt: "2026-10-28T15:49:59.821Z",
} as const satisfies RuntimeError
