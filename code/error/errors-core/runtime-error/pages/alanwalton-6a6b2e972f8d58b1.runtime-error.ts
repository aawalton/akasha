import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton6a6b2e972f8d58b1 = {
  id: "01a0ea35-33ae-7f85-a70f-6b3b13c70492",
  type: "page-type/runtime-error",
  slug: "alanwalton-6a6b2e972f8d58b1",
  fingerprint: "6a6b2e972f8d58b1",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/otherwhere-iv-nala"}},"keys":["character","title","slot","description"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:49:04.939Z",
} as const satisfies RuntimeError
