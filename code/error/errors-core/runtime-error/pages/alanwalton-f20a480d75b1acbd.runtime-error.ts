import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonF20a480d75b1acbd = {
  id: "01a0ff77-0e13-74cf-b9a9-549b41f2b1d5",
  type: "page-type/runtime-error",
  slug: "alanwalton-f20a480d75b1acbd",
  fingerprint: "f20a480d75b1acbd",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/overwhere-iv-nala"}},"keys":["type","character","value","maxValue","history","slug","title","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://alanwalton.com/story-played/overwhere-iv-f286ba0f?__v=c68bbf34e0672634da40d3388f5da48a1acdcb66",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T01:53:06.010Z",
} as const satisfies RuntimeError
