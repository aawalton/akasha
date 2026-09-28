import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonB94b167933b4455b = {
  id: "01a0ea27-1b9d-7fd2-8988-2c63c6343652",
  type: "page-type/runtime-error",
  slug: "alanwalton-b94b167933b4455b",
  fingerprint: "b94b167933b4455b",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-attribute` was refused: `a composed query over `metric-character-attribute`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-attribute","where":{"character":{"is":"character-player/otherwhere-v-nala"}},"keys":["type","character","value"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:33:31.977Z",
} as const satisfies RuntimeError
