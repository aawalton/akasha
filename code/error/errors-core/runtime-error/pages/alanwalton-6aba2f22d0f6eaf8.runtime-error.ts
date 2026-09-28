import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton6aba2f22d0f6eaf8 = {
  id: "01a0ea35-815e-7c8d-b1e9-d7c613216b16",
  type: "page-type/runtime-error",
  slug: "alanwalton-6aba2f22d0f6eaf8",
  fingerprint: "6aba2f22d0f6eaf8",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/otherwhere-iv-nala"}},"keys":["character","skill","rank","level","axis"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:49:08.125Z",
} as const satisfies RuntimeError
