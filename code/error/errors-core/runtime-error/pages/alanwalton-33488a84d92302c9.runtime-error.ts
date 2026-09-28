import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton33488a84d92302c9 = {
  id: "01a0ea23-18b3-7cc0-a766-e3f2de03c396",
  type: "page-type/runtime-error",
  slug: "alanwalton-33488a84d92302c9",
  fingerprint: "33488a84d92302c9",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ea1e-b33b-7ba0-ba58-c7fd7639d3f1"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-viii-2542e488",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:29:01.030Z",
} as const satisfies RuntimeError
