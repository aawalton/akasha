import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton12c159480277aa5b = {
  id: "01a0ea39-d688-7c9b-b034-8b5dd6ae1e76",
  type: "page-type/runtime-error",
  slug: "alanwalton-12c159480277aa5b",
  fingerprint: "12c159480277aa5b",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Failed to fetch) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ea1d-df17-770b-abb6-857b9d17fa12","01a0ea21-6f9d-71b9-921d-f759c9443e7b"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2?__v=b1ad1a4dd66964f4059d19be8520e92ce08e9122",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:53:46.715Z",
} as const satisfies RuntimeError
