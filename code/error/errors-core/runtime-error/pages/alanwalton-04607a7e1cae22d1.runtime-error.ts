import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton04607a7e1cae22d1 = {
  id: "01a0ea38-3aad-7787-a43d-2919dc4e1c4a",
  type: "page-type/runtime-error",
  slug: "alanwalton-04607a7e1cae22d1",
  fingerprint: "04607a7e1cae22d1",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/otherwhere-vii-nala"}},"keys":["type","character","value","maxValue","history"],"files":["history"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2?__v=b1ad1a4dd66964f4059d19be8520e92ce08e9122",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:52:19.352Z",
} as const satisfies RuntimeError
