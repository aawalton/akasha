import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton0d02313d8e98aa7d = {
  id: "01a0ff77-0e13-7012-b5cd-c9fa77e30a61",
  type: "page-type/runtime-error",
  slug: "alanwalton-0d02313d8e98aa7d",
  fingerprint: "0d02313d8e98aa7d",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/overwhere-iv-nala"}},"keys":["character","slug","title","objective","status","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-iv-f286ba0f?__v=c68bbf34e0672634da40d3388f5da48a1acdcb66",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T01:53:06.013Z",
} as const satisfies RuntimeError
