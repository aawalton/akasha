import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonEd86db9adc8afef9 = {
  id: "01a1111a-a70c-7c9b-817f-a02c07d464d3",
  type: "page-type/runtime-error",
  slug: "alanwalton-ed86db9adc8afef9",
  fingerprint: "ed86db9adc8afef9",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-attunement` was refused: `a composed query over `world-attunement`` answered with what is not JSON (AbortError: The user aborted a request.) — 4 attempts were spent — the question was {"page-type":"world-attunement","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","slug","character","element","rank","counter","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0005-honey-cake-3e476e13",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-06T12:05:20.931Z",
} as const satisfies RuntimeError
