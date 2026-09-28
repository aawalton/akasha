import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton14ff74805e06cff6 = {
  id: "01a0ea37-8bde-74c9-93d9-5af281e579e8",
  type: "page-type/runtime-error",
  slug: "alanwalton-14ff74805e06cff6",
  fingerprint: "14ff74805e06cff6",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-relationship` was refused: `a composed query over `world-relationship`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-relationship","where":{"characters":{"has":"character-player/otherwhere-vii-nala"}},"keys":["characters","relationshipPoints"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:51:39.898Z",
} as const satisfies RuntimeError
