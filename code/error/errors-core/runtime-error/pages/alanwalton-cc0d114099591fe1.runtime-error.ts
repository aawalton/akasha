import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonCc0d114099591fe1 = {
  id: "01a1071f-3292-7eb9-8c4d-83648801fb31",
  type: "page-type/runtime-error",
  slug: "alanwalton-cc0d114099591fe1",
  fingerprint: "cc0d114099591fe1",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-skill","where":{"slug":{"in":["overwhere-i-starfall-surge","overwhere-i-starfall-weave"]}},"keys":["slug","title","description"]}',
  url: "https://alanwalton.com/story-played/overwhere-i-76f5ac57?__v=dbc54011452206e60d048ecd914553563ecfe4dc",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:34:06.960Z",
} as const satisfies RuntimeError
