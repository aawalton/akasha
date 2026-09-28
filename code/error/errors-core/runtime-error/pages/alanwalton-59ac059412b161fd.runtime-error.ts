import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton59ac059412b161fd = {
  id: "01a0ea35-33ae-7117-8644-587d53566c5d",
  type: "page-type/runtime-error",
  slug: "alanwalton-59ac059412b161fd",
  fingerprint: "59ac059412b161fd",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/otherwhere-iv-nala"}},"keys":["character","slug","title","objective","status"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:49:06.668Z",
} as const satisfies RuntimeError
