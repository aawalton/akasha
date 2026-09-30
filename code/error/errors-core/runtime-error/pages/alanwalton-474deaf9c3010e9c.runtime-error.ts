import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton474deaf9c3010e9c = {
  id: "01a0f244-b467-7220-9974-cc404304c533",
  type: "page-type/runtime-error",
  slug: "alanwalton-474deaf9c3010e9c",
  fingerprint: "474deaf9c3010e9c",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/overwhere-ii-nala"}},"keys":["character","slug","title","description","skill","rank","level","axis","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-ii-9019f425?__v=2a420935117eadf31eff4f1cfb3837b49bc5051a",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-09-30T12:23:03.141Z",
} as const satisfies RuntimeError
