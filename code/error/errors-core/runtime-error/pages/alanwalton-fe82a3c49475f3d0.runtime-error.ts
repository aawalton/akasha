import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonFe82a3c49475f3d0 = {
  id: "01a18334-cac8-7774-92fb-5c6ecf427ca1",
  type: "page-type/runtime-error",
  slug: "alanwalton-fe82a3c49475f3d0",
  fingerprint: "fe82a3c49475f3d0",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/test-story-player"}},"keys":["type","character","slug","title","objective","status","unrevealed"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:35.854Z",
  createdAt: "2026-10-28T15:50:37.511Z",
  updatedAt: "2026-10-28T15:50:37.511Z",
} as const satisfies RuntimeError
