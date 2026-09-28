import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonA186ada3143f6cc9 = {
  id: "01a0ea27-1b9c-70ea-a266-dfc4271f5b5b",
  type: "page-type/runtime-error",
  slug: "alanwalton-a186ada3143f6cc9",
  fingerprint: "a186ada3143f6cc9",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `item-slot` was refused: `a composed query over `item-slot`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"item-slot","keys":["slug","title"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:33:31.983Z",
} as const satisfies RuntimeError
