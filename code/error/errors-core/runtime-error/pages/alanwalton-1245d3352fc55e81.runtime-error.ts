import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton1245d3352fc55e81 = {
  id: "01a0ea7d-32f8-7982-a67c-c8d07f1e4556",
  type: "page-type/runtime-error",
  slug: "alanwalton-1245d3352fc55e81",
  fingerprint: "1245d3352fc55e81",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ea1f-9145-702c-93b6-0a5b4014ceb3","01a0ea30-9a91-7452-bc27-1cbc34f66ca0","01a0ea44-11aa-7f14-a11c-ed7def32f47c","01a0ea4d-b4a7-7c44-a671-e8e7c9c24d57","01a0ea5a-e0a1-7012-89f2-f7e31c49b8c6"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-ix-23290eca",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-29T00:07:17.105Z",
} as const satisfies RuntimeError
