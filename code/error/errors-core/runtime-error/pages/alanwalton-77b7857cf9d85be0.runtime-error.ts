import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton77b7857cf9d85be0 = {
  id: "01a11b82-a923-78b0-a407-6f669eea59f2",
  type: "page-type/runtime-error",
  slug: "alanwalton-77b7857cf9d85be0",
  fingerprint: "77b7857cf9d85be0",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/encounters-alan"}},"keys":["type","character","value","maxValue","history","slug","title","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://alanwalton.com/story-chapter-written/encounters-0002-eleven-ec1b5225",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-08T12:35:08.816Z",
} as const satisfies RuntimeError
