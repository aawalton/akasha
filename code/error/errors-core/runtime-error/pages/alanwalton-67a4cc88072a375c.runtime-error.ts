import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton67a4cc88072a375c = {
  id: "01a10706-e0c2-713d-a38f-9f31990f24e4",
  type: "page-type/runtime-error",
  slug: "alanwalton-67a4cc88072a375c",
  fingerprint: "67a4cc88072a375c",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-attunement` was refused: `a composed query over `world-attunement`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (AbortError: Fetch is aborted) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-attunement","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","slug","character","element","rank","counter","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:07:19.856Z",
} as const satisfies RuntimeError
