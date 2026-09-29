import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton71f2bc217e51d639 = {
  id: "01a0ea76-a455-7336-90d4-ac6b1a6d6b39",
  type: "page-type/runtime-error",
  slug: "alanwalton-71f2bc217e51d639",
  fingerprint: "71f2bc217e51d639",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ea63-e9de-79a2-b590-9e720a2df52a"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-xi-84625d64",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-29T00:00:29.103Z",
} as const satisfies RuntimeError
