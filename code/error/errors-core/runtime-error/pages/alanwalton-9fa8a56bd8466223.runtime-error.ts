import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton9fa8a56bd8466223 = {
  id: "01a0ea27-1b9c-79d0-9154-d8c3d0226134",
  type: "page-type/runtime-error",
  slug: "alanwalton-9fa8a56bd8466223",
  fingerprint: "9fa8a56bd8466223",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/otherwhere-v-nala"}},"keys":["character","slug","title","objective","status"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:33:31.978Z",
} as const satisfies RuntimeError
