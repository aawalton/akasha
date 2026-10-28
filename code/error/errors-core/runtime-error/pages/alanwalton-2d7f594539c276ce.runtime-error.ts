import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton2d7f594539c276ce = {
  id: "01a18334-cac8-7071-91b1-f45997e28fc9",
  type: "page-type/runtime-error",
  slug: "alanwalton-2d7f594539c276ce",
  fingerprint: "2d7f594539c276ce",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a18026-5a2c-7c75-9526-5936d5b318f6","01a18029-aabd-7852-bd4c-769b15a93337"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:35.562Z",
  createdAt: "2026-10-28T15:50:37.511Z",
  updatedAt: "2026-10-28T15:50:37.511Z",
} as const satisfies RuntimeError
