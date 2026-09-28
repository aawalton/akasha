import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton26f7990e1a969b7e = {
  id: "01a0ea38-7d47-74ca-977a-89100d68ef21",
  type: "page-type/runtime-error",
  slug: "alanwalton-26f7990e1a969b7e",
  fingerprint: "26f7990e1a969b7e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-attunement` was refused: `a composed query over `world-attunement`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-attunement","where":{"character":{"is":"character-player/otherwhere-vii-nala"}},"keys":["character","element","rank","counter"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2?__v=b1ad1a4dd66964f4059d19be8520e92ce08e9122",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:52:27.182Z",
} as const satisfies RuntimeError
