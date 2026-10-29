import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton5b3927b177bf418e = {
  id: "01a18875-da12-74b7-8ac8-15507015f10c",
  type: "page-type/runtime-error",
  slug: "alanwalton-5b3927b177bf418e",
  fingerprint: "5b3927b177bf418e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-played` was refused: `a composed query over `story-played`` was refused: the page store replied 403: no person holds the session this was asked under — one attempt was spent — the question was {"page-type":"story-played","where":{"id":{"is":"01a17edf-d61e-70e1-90ec-fc5f0aacf6e3"}},"keys":["id","chat"],"files":["chat"]}',
  url: "https://alanwalton.com/story-played/gifted-reborn-0aacf6e3?__v=17265428cd200a18974d58364707414f0e3fef1d",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-29T16:19:43.035Z",
  createdAt: "2026-10-29T16:19:47.346Z",
  updatedAt: "2026-10-29T16:19:47.346Z",
} as const satisfies RuntimeError
