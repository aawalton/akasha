import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonA5b0229378eb0375 = {
  id: "01a0ea38-a7dd-7079-af0e-31ad4a0e424d",
  type: "page-type/runtime-error",
  slug: "alanwalton-a5b0229378eb0375",
  fingerprint: "a5b0229378eb0375",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/otherwhere-vii-nala"}},"keys":["character","title","slot","description"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2?__v=b1ad1a4dd66964f4059d19be8520e92ce08e9122",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:52:23.573Z",
} as const satisfies RuntimeError
