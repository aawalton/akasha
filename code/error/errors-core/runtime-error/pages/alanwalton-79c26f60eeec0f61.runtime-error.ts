import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton79c26f60eeec0f61 = {
  id: "01a0ea35-815e-753d-b616-cf25ac76c7fb",
  type: "page-type/runtime-error",
  slug: "alanwalton-79c26f60eeec0f61",
  fingerprint: "79c26f60eeec0f61",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/otherwhere-iv-nala"}},"keys":["type","character","value","maxValue","history"],"files":["history"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:49:08.196Z",
} as const satisfies RuntimeError
