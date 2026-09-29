import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton72b08374d8938129 = {
  id: "01a0ea76-a455-7885-973c-6cb5d34a651d",
  type: "page-type/runtime-error",
  slug: "alanwalton-72b08374d8938129",
  fingerprint: "72b08374d8938129",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ea1e-b33b-7ba0-ba58-c7fd7639d3f1","01a0ea23-8b7b-7be5-a8c1-00c4f13bdb6b","01a0ea59-b1a3-71bb-9d2e-d2886a26adf4"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-viii-2542e488",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-29T00:00:24.197Z",
} as const satisfies RuntimeError
