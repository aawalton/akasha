import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton8e90a0e73b423e45 = {
  id: "01a0f244-b467-77e5-93b1-f55ad30c810d",
  type: "page-type/runtime-error",
  slug: "alanwalton-8e90a0e73b423e45",
  fingerprint: "8e90a0e73b423e45",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `metric-character-resource` was refused: `a composed query over `metric-character-resource`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"metric-character-resource","where":{"character":{"is":"character-player/overwhere-ii-nala"}},"keys":["type","character","value","maxValue","history","slug","title","displayOrder","revealedAs","unrevealed"],"files":["history"]}',
  url: "https://alanwalton.com/story-played/overwhere-ii-9019f425?__v=2a420935117eadf31eff4f1cfb3837b49bc5051a",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-09-30T12:23:03.084Z",
} as const satisfies RuntimeError
