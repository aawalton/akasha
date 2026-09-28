import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE5b8a5a0f6d02487 = {
  id: "01a0ea37-8bde-7d91-b5f8-268ac33da1dd",
  type: "page-type/runtime-error",
  slug: "alanwalton-e5b8a5a0f6d02487",
  fingerprint: "e5b8a5a0f6d02487",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-attribute` was refused: `a composed query over `metric-character-attribute`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-attribute","where":{"character":{"is":"character-player/otherwhere-vii-nala"}},"keys":["type","character","value"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:51:39.898Z",
} as const satisfies RuntimeError
