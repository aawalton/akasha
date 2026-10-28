import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton399fc4a420352006 = {
  id: "01a18334-378e-78c5-9c80-0a04e46244e6",
  type: "page-type/runtime-error",
  slug: "alanwalton-399fc4a420352006",
  fingerprint: "399fc4a420352006",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a17fd1-7197-7bc0-8724-323aab45fd9b","01a17fec-b8bb-7b10-b475-6878a98f2706"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://atlas.alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:49:57.366Z",
  createdAt: "2026-10-28T15:49:59.821Z",
  updatedAt: "2026-10-28T15:49:59.821Z",
} as const satisfies RuntimeError
