import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonAc6fb3a5b752b664 = {
  id: "01a18334-cac8-7086-ba99-cab406a61d36",
  type: "page-type/runtime-error",
  slug: "alanwalton-ac6fb3a5b752b664",
  fingerprint: "ac6fb3a5b752b664",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-point` was refused: `a composed query over `metric-character-point`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"metric-character-point","where":{"character":{"is":"character-player/test-story-player"}},"keys":["type","character","slug","value","displayOrder","unrevealed"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:35.657Z",
  createdAt: "2026-10-28T15:50:37.511Z",
  updatedAt: "2026-10-28T15:50:37.511Z",
} as const satisfies RuntimeError
