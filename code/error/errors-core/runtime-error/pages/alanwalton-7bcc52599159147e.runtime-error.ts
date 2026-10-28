import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton7bcc52599159147e = {
  id: "01a18334-378e-73c8-a249-01868aa6d74d",
  type: "page-type/runtime-error",
  slug: "alanwalton-7bcc52599159147e",
  fingerprint: "7bcc52599159147e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/gifted-reborn-nala"}},"keys":["type","character","value","maxValue","history","slug","title","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://atlas.alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:49:57.657Z",
  createdAt: "2026-10-28T15:49:59.821Z",
  updatedAt: "2026-10-28T15:49:59.821Z",
} as const satisfies RuntimeError
