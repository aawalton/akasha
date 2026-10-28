import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton49605e2c1f23b892 = {
  id: "01a18334-cac8-73bf-aa05-4ec788e47398",
  type: "page-type/runtime-error",
  slug: "alanwalton-49605e2c1f23b892",
  fingerprint: "49605e2c1f23b892",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/test-story-player"}},"keys":["slug","character","title","slot","description","quantity","category","unrevealed"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:35.832Z",
  createdAt: "2026-10-28T15:50:37.511Z",
  updatedAt: "2026-10-28T15:50:37.511Z",
} as const satisfies RuntimeError
