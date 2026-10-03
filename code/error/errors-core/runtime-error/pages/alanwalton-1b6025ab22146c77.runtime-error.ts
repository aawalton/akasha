import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton1b6025ab22146c77 = {
  id: "01a103a9-7241-7543-955b-8c30d0ed39e9",
  type: "page-type/runtime-error",
  slug: "alanwalton-1b6025ab22146c77",
  fingerprint: "1b6025ab22146c77",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-currency` was refused: `a composed query over `metric-character-currency`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"metric-character-currency","where":{"character":{"is":"character-player/the-places-she-carries-wren"}},"keys":["character","value","history","slug","title","currency","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://archiveofworlds.app/story-chapter-written/the-places-she-carries-0023-what-the-land-remembers-9b5b81eb",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-03T21:26:38.369Z",
} as const satisfies RuntimeError
