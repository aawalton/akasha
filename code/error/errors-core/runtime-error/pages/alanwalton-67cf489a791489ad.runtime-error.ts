import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton67cf489a791489ad = {
  id: "01a1019e-9549-7091-95b5-3f916639ddc6",
  type: "page-type/runtime-error",
  slug: "alanwalton-67cf489a791489ad",
  fingerprint: "67cf489a791489ad",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ff77-ca4c-7d3b-b00d-6208f757f866","01a10170-9a9a-7fa6-940b-f567a4ab283d","01a10180-a29b-7ea3-aa9f-cbc6419c7347","01a1018d-b22d-7d24-84ac-d326b4682f60"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/overwhere-iv-f286ba0f?__v=c68bbf34e0672634da40d3388f5da48a1acdcb66",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T11:55:31.258Z",
} as const satisfies RuntimeError
