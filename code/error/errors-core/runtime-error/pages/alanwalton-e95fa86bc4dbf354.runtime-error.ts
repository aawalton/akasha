import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE95fa86bc4dbf354 = {
  id: "01a0ea27-1b9d-7aca-9bb3-cb15de7f0462",
  type: "page-type/runtime-error",
  slug: "alanwalton-e95fa86bc4dbf354",
  fingerprint: "e95fa86bc4dbf354",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/otherwhere-v-nala"}},"keys":["character","skill","rank","level","axis"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:33:31.973Z",
} as const satisfies RuntimeError
