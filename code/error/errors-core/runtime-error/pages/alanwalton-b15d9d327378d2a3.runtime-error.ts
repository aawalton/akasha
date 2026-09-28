import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonB15d9d327378d2a3 = {
  id: "01a0ea38-3aae-7eb0-a486-24dfed7a2c00",
  type: "page-type/runtime-error",
  slug: "alanwalton-b15d9d327378d2a3",
  fingerprint: "b15d9d327378d2a3",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `played-panel` was refused: `a composed query over `played-panel`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"played-panel","keys":["slug","drawn","place","position"],"files":["drawn"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2?__v=b1ad1a4dd66964f4059d19be8520e92ce08e9122",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:52:19.353Z",
} as const satisfies RuntimeError
