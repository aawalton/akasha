import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE3aa074b6d907214 = {
  id: "01a1134d-b408-765b-918d-379c11a97d0a",
  type: "page-type/runtime-error",
  slug: "alanwalton-e3aa074b6d907214",
  fingerprint: "e3aa074b6d907214",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","value","maxValue","history","slug","title","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://alanwalton.com/story-written/fairweather-ff34ba37?__v=32bde4f1f53d4e0bc6f5a1fb1642dbaeca91098c",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-06T22:20:20.974Z",
} as const satisfies RuntimeError
