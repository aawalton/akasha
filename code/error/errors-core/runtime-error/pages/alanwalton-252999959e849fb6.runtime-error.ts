import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton252999959e849fb6 = {
  id: "01a0ea39-7fb6-7a8c-8135-1092b674f2ec",
  type: "page-type/runtime-error",
  slug: "alanwalton-252999959e849fb6",
  fingerprint: "252999959e849fb6",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-attunement` was refused: `a composed query over `world-attunement`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-attunement","where":{"character":{"is":"character-player/otherwhere-iii-nala"}},"keys":["character","element","rank","counter"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iii-1fb8e002",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:53:13.408Z",
} as const satisfies RuntimeError
