import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton55243bda367e8230 = {
  id: "01a0ea35-815e-76ae-9102-182c6e95b8d6",
  type: "page-type/runtime-error",
  slug: "alanwalton-55243bda367e8230",
  fingerprint: "55243bda367e8230",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-relationship` was refused: `a composed query over `world-relationship`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-relationship","where":{"characters":{"has":"character-player/otherwhere-iv-nala"}},"keys":["characters","relationshipPoints"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:49:08.123Z",
} as const satisfies RuntimeError
