import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton69a6352b179725f6 = {
  id: "01a0ea35-5549-7a98-a537-9f7b491ad1b6",
  type: "page-type/runtime-error",
  slug: "alanwalton-69a6352b179725f6",
  fingerprint: "69a6352b179725f6",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-attunement` was refused: `a composed query over `world-attunement`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-attunement","where":{"character":{"is":"character-player/otherwhere-iv-nala"}},"keys":["character","element","rank","counter"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:49:08.124Z",
} as const satisfies RuntimeError
