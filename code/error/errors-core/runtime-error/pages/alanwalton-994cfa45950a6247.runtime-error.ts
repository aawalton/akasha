import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton994cfa45950a6247 = {
  id: "01a18dd9-3157-7232-b6a0-e40e57db1716",
  type: "page-type/runtime-error",
  slug: "alanwalton-994cfa45950a6247",
  fingerprint: "994cfa45950a6247",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-played` was refused: `a composed query over `story-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-played","where":{"slug":{"is":"gifted-trial2"}},"keys":["slug","externalId","coordinatorAgent","roleplayed"]}',
  url: "https://alanwalton.com/story-played/gifted-trial2-caf64e1a",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.8037.0 Safari/537.36",
  firstSeenAt: "2026-10-30T17:26:18.206Z",
  createdAt: "2026-10-30T17:26:23.831Z",
  updatedAt: "2026-10-30T17:26:23.831Z",
} as const satisfies RuntimeError
