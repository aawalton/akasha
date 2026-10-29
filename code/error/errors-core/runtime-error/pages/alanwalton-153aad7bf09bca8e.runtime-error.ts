import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton153aad7bf09bca8e = {
  id: "01a18875-da12-72bf-8d3f-9c42bd8c9e4d",
  type: "page-type/runtime-error",
  slug: "alanwalton-153aad7bf09bca8e",
  fingerprint: "153aad7bf09bca8e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` was refused: the page store replied 403: no person holds the session this was asked under — 2 attempts were spent — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a17fd1-7197-7bc0-8724-323aab45fd9b","01a17fec-b8bb-7b10-b475-6878a98f2706"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/gifted-reborn-0aacf6e3?__v=17265428cd200a18974d58364707414f0e3fef1d",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-29T16:19:43.045Z",
  createdAt: "2026-10-29T16:19:47.346Z",
  updatedAt: "2026-10-29T16:19:47.346Z",
} as const satisfies RuntimeError
