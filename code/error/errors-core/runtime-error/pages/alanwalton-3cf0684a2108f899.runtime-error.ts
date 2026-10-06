import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton3cf0684a2108f899 = {
  id: "01a1111a-a70c-7c5b-a572-4908799f2b79",
  type: "page-type/runtime-error",
  slug: "alanwalton-3cf0684a2108f899",
  fingerprint: "3cf0684a2108f899",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-attribute` was refused: `a composed query over `metric-character-attribute`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-attribute","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","value","slug","title","displayOrder","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0005-honey-cake-3e476e13",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-06T12:05:20.819Z",
} as const satisfies RuntimeError
