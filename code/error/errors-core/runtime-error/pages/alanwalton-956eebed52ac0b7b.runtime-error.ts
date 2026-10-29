import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton956eebed52ac0b7b = {
  id: "01a18879-006f-721a-b9fe-def471e42c3b",
  type: "page-type/runtime-error",
  slug: "alanwalton-956eebed52ac0b7b",
  fingerprint: "956eebed52ac0b7b",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a17fd1-7197-7bc0-8724-323aab45fd9b","01a17fec-b8bb-7b10-b475-6878a98f2706"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/gifted-reborn-0aacf6e3?__v=17265428cd200a18974d58364707414f0e3fef1d",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-29T16:23:13.022Z",
  createdAt: "2026-10-29T16:23:13.775Z",
  updatedAt: "2026-10-29T16:23:13.775Z",
} as const satisfies RuntimeError
