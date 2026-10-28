import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonDf9fd5b90ebf8b5e = {
  id: "01a18334-2ad1-7c82-8a53-0cd1f2345c25",
  type: "page-type/runtime-error",
  slug: "alanwalton-df9fd5b90ebf8b5e",
  fingerprint: "df9fd5b90ebf8b5e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-played` was refused: `a composed query over `story-played`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-played","where":{"slug":{"is":"gifted-reborn"}},"keys":["slug","externalId","coordinatorAgent","roleplayed"]}',
  url: "https://atlas.alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:49:55.361Z",
  createdAt: "2026-10-28T15:49:56.560Z",
  updatedAt: "2026-10-28T15:49:56.560Z",
} as const satisfies RuntimeError
