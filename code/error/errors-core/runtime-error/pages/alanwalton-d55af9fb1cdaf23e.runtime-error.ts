import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonD55af9fb1cdaf23e = {
  id: "01a1111a-a70c-7ff6-b41a-2fe970d1495b",
  type: "page-type/runtime-error",
  slug: "alanwalton-d55af9fb1cdaf23e",
  fingerprint: "d55af9fb1cdaf23e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","slug","title","description","skill","rank","level","axis","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0005-honey-cake-3e476e13",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-06T12:05:21.058Z",
} as const satisfies RuntimeError
