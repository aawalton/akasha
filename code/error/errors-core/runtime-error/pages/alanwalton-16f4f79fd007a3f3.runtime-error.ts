import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton16f4f79fd007a3f3 = {
  id: "01a18028-3089-72a8-858b-fb613024ebe1",
  type: "page-type/runtime-error",
  slug: "alanwalton-16f4f79fd007a3f3",
  fingerprint: "16f4f79fd007a3f3",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-currency` was refused: `a composed query over `metric-character-currency`` answered with what is not JSON (TypeError: Failed to fetch) — one attempt was spent — the question was {"page-type":"metric-character-currency","where":{"character":{"is":"character-player/test-story-player"}},"keys":["character","value","history","slug","title","currency","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T01:37:58.724Z",
  createdAt: "2026-10-28T01:37:59.945Z",
  updatedAt: "2026-10-28T01:37:59.945Z",
} as const satisfies RuntimeError
