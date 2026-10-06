import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton69368d9bc7976684 = {
  id: "01a1111a-a70c-75d0-87af-80239ffaebd8",
  type: "page-type/runtime-error",
  slug: "alanwalton-69368d9bc7976684",
  fingerprint: "69368d9bc7976684",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-relationship` was refused: `a composed query over `world-relationship`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-relationship","where":{"characters":{"has":"character-player/fairweather-elsie"}},"keys":["type","slug","characters","relationshipPoints","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0005-honey-cake-3e476e13",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-06T12:05:20.854Z",
} as const satisfies RuntimeError
