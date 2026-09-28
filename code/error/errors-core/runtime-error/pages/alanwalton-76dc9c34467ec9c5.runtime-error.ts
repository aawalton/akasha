import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton76dc9c34467ec9c5 = {
  id: "01a0ea27-1b9c-748b-b240-989c3436d27c",
  type: "page-type/runtime-error",
  slug: "alanwalton-76dc9c34467ec9c5",
  fingerprint: "76dc9c34467ec9c5",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/otherwhere-v-nala"}},"keys":["type","character","value","maxValue","history"],"files":["history"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:33:31.979Z",
} as const satisfies RuntimeError
