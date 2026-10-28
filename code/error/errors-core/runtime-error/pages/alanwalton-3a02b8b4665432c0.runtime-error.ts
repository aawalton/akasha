import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton3a02b8b4665432c0 = {
  id: "01a18334-c465-757b-a9e1-964c9bc693c8",
  type: "page-type/runtime-error",
  slug: "alanwalton-3a02b8b4665432c0",
  fingerprint: "3a02b8b4665432c0",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-played` was refused: `a composed query over `story-played`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-played","where":{"slug":{"is":"test-story"}},"keys":["slug","externalId","coordinatorAgent","roleplayed"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:34.654Z",
  createdAt: "2026-10-28T15:50:35.877Z",
  updatedAt: "2026-10-28T15:50:35.877Z",
} as const satisfies RuntimeError
