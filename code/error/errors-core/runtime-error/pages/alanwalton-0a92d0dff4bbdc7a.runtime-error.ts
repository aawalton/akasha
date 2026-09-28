import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton0a92d0dff4bbdc7a = {
  id: "01a0ea27-1b9c-743e-a441-557bebf473e7",
  type: "page-type/runtime-error",
  slug: "alanwalton-0a92d0dff4bbdc7a",
  fingerprint: "0a92d0dff4bbdc7a",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-attunement` was refused: `a composed query over `world-attunement`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-attunement","where":{"character":{"is":"character-player/otherwhere-v-nala"}},"keys":["character","element","rank","counter"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:33:31.993Z",
} as const satisfies RuntimeError
