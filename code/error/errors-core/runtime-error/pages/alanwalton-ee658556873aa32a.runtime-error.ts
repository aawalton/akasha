import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonEe658556873aa32a = {
  id: "01a103a9-772c-7dd2-bf2d-68a784232599",
  type: "page-type/runtime-error",
  slug: "alanwalton-ee658556873aa32a",
  fingerprint: "ee658556873aa32a",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/the-places-she-carries-wren"}},"keys":["slug","character","title","slot","description","quantity","unrevealed"]}',
  url: "https://archiveofworlds.app/story-chapter-written/the-places-she-carries-0023-what-the-land-remembers-9b5b81eb",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-03T21:26:38.501Z",
} as const satisfies RuntimeError
