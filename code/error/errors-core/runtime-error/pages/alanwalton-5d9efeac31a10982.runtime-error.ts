import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton5d9efeac31a10982 = {
  id: "01a0ea27-1b9c-7ec5-9b4b-cf8030d08be8",
  type: "page-type/runtime-error",
  slug: "alanwalton-5d9efeac31a10982",
  fingerprint: "5d9efeac31a10982",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-relationship` was refused: `a composed query over `world-relationship`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-relationship","where":{"characters":{"has":"character-player/otherwhere-v-nala"}},"keys":["characters","relationshipPoints"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:33:31.983Z",
} as const satisfies RuntimeError
