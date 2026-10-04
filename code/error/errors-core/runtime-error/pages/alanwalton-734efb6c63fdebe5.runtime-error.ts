import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton734efb6c63fdebe5 = {
  id: "01a10706-e0c2-7a06-9c30-c1535d23560e",
  type: "page-type/runtime-error",
  slug: "alanwalton-734efb6c63fdebe5",
  fingerprint: "734efb6c63fdebe5",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (AbortError: Fetch is aborted) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/fairweather-elsie"}},"keys":["type","character","value","maxValue","history","slug","title","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-04T13:07:19.857Z",
} as const satisfies RuntimeError
