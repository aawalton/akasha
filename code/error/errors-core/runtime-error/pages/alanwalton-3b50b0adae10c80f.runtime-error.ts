import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton3b50b0adae10c80f = {
  id: "01a10dc1-fc5d-76a4-ad02-fe0aaf390299",
  type: "page-type/runtime-error",
  slug: "alanwalton-3b50b0adae10c80f",
  fingerprint: "3b50b0adae10c80f",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-currency` was refused: `a composed query over `metric-character-currency`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"metric-character-currency","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["character","value","history","slug","title","currency","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0005-honey-cake-3e476e13",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-05T20:29:37.939Z",
} as const satisfies RuntimeError
