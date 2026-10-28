import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton4222b77f470bfa2e = {
  id: "01a18334-cac8-7056-b624-6d891ab5dbc0",
  type: "page-type/runtime-error",
  slug: "alanwalton-4222b77f470bfa2e",
  fingerprint: "4222b77f470bfa2e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/test-story-player"}},"keys":["type","character","value","maxValue","history","slug","title","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:35.826Z",
  createdAt: "2026-10-28T15:50:37.511Z",
  updatedAt: "2026-10-28T15:50:37.511Z",
} as const satisfies RuntimeError
