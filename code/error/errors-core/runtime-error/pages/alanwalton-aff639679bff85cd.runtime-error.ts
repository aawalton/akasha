import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonAff639679bff85cd = {
  id: "01a18878-31c1-7d3d-b970-87e519c8b81f",
  type: "page-type/runtime-error",
  slug: "alanwalton-aff639679bff85cd",
  fingerprint: "aff639679bff85cd",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-played` was refused: `a composed query over `story-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-played","where":{"id":{"is":"01a17edf-d61e-70e1-90ec-fc5f0aacf6e3"}},"keys":["id","chat"],"files":["chat"]}',
  url: "https://alanwalton.com/story-played/gifted-reborn-0aacf6e3?__v=17265428cd200a18974d58364707414f0e3fef1d",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-29T16:22:13.019Z",
  createdAt: "2026-10-29T16:22:20.864Z",
  updatedAt: "2026-10-29T16:22:20.864Z",
} as const satisfies RuntimeError
