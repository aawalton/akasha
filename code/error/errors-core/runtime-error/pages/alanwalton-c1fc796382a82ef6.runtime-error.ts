import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonC1fc796382a82ef6 = {
  id: "01a18334-cac8-7eef-b7c6-551fcb8c8976",
  type: "page-type/runtime-error",
  slug: "alanwalton-c1fc796382a82ef6",
  fingerprint: "c1fc796382a82ef6",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-attribute` was refused: `a composed query over `metric-character-attribute`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"metric-character-attribute","where":{"character":{"is":"character-player/test-story-player"}},"keys":["type","character","value","slug","title","displayOrder","statGroup","unrevealed"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:35.832Z",
  createdAt: "2026-10-28T15:50:37.511Z",
  updatedAt: "2026-10-28T15:50:37.511Z",
} as const satisfies RuntimeError
