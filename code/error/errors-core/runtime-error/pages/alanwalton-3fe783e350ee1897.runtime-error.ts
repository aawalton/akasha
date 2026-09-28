import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton3fe783e350ee1897 = {
  id: "01a0ea35-33ae-7efb-81a5-2d2633f22f78",
  type: "page-type/runtime-error",
  slug: "alanwalton-3fe783e350ee1897",
  fingerprint: "3fe783e350ee1897",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-attribute` was refused: `a composed query over `metric-character-attribute`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-attribute","where":{"character":{"is":"character-player/otherwhere-iv-nala"}},"keys":["type","character","value"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:49:06.671Z",
} as const satisfies RuntimeError
