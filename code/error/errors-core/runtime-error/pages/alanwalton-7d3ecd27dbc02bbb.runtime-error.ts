import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton7d3ecd27dbc02bbb = {
  id: "01a1111a-a70c-70ad-bbdd-d90e82793435",
  type: "page-type/runtime-error",
  slug: "alanwalton-7d3ecd27dbc02bbb",
  fingerprint: "7d3ecd27dbc02bbb",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","slug","title","objective","status","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0005-honey-cake-3e476e13",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-06T12:05:21.063Z",
} as const satisfies RuntimeError
