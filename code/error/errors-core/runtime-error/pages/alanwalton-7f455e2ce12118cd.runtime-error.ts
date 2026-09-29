import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton7f455e2ce12118cd = {
  id: "01a0ea76-a455-77d6-a91f-10bd23b6b797",
  type: "page-type/runtime-error",
  slug: "alanwalton-7f455e2ce12118cd",
  fingerprint: "7f455e2ce12118cd",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ea61-14d4-74bd-8cba-cf9bf9862bc6"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-x-8996cf80",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-29T00:00:28.440Z",
} as const satisfies RuntimeError
