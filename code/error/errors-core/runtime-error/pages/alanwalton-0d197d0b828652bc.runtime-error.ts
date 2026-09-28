import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton0d197d0b828652bc = {
  id: "01a0ea38-7d47-788b-845e-24643b3d77d7",
  type: "page-type/runtime-error",
  slug: "alanwalton-0d197d0b828652bc",
  fingerprint: "0d197d0b828652bc",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/otherwhere-vii-nala"}},"keys":["character","skill","rank","level","axis"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2?__v=b1ad1a4dd66964f4059d19be8520e92ce08e9122",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:52:27.416Z",
} as const satisfies RuntimeError
