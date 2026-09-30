import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE0309291d7c51e9e = {
  id: "01a0f244-b467-74af-9133-ef381b65f91a",
  type: "page-type/runtime-error",
  slug: "alanwalton-e0309291d7c51e9e",
  fingerprint: "e0309291d7c51e9e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-relationship` was refused: `a composed query over `world-relationship`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-relationship","where":{"characters":{"has":"character-player/overwhere-ii-nala"}},"keys":["characters","relationshipPoints","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-ii-9019f425?__v=2a420935117eadf31eff4f1cfb3837b49bc5051a",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-09-30T12:23:03.050Z",
} as const satisfies RuntimeError
