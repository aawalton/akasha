import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE0e754a81a95efc1 = {
  id: "01a1019e-8978-7c85-b021-a010118efe33",
  type: "page-type/runtime-error",
  slug: "alanwalton-e0e754a81a95efc1",
  fingerprint: "e0e754a81a95efc1",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ff47-0ee9-7f6e-9407-aa126ec2b010","01a0ff56-f3d9-72e9-b77f-945d677cc2a6","01a0ff66-7daf-7917-9526-e4aa566a4e0d","01a0ff75-cd53-72f7-9c82-8c5bd76be567","01a0ff7f-4529-7530-841d-f4f91253eabb","01a1016b-1171-7b77-935d-bcd612bb58f1","01a1017d-253b-7341-9ca3-e52a696c7ae2","01a1018b-3634-7b9d-92a4-816cda8fd7dc"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/overwhere-i-76f5ac57?__v=ae2d1697cef1e86cef776466423febe42a1825ce",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T11:55:27.496Z",
} as const satisfies RuntimeError
