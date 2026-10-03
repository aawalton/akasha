import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE3edc55a44df84ba = {
  id: "01a103a9-772c-73d4-96f3-211594630e85",
  type: "page-type/runtime-error",
  slug: "alanwalton-e3edc55a44df84ba",
  fingerprint: "e3edc55a44df84ba",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/the-places-she-carries-wren"}},"keys":["type","character","value","maxValue","history","slug","title","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://archiveofworlds.app/story-chapter-written/the-places-she-carries-0023-what-the-land-remembers-9b5b81eb",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-03T21:26:38.557Z",
} as const satisfies RuntimeError
