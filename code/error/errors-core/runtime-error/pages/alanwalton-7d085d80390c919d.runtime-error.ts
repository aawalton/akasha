import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton7d085d80390c919d = {
  id: "01a18027-5cfd-7788-9b0e-504a155c7842",
  type: "page-type/runtime-error",
  slug: "alanwalton-7d085d80390c919d",
  fingerprint: "7d085d80390c919d",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-played` was refused: `a composed query over `story-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-played","where":{"slug":{"is":"test-story"}},"keys":["slug","externalId","coordinatorAgent","roleplayed"]}',
  url: "https://alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T01:37:05.371Z",
  createdAt: "2026-10-28T01:37:05.789Z",
  updatedAt: "2026-10-28T01:37:05.789Z",
} as const satisfies RuntimeError
