import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton20c42b5838f03db6 = {
  id: "01a11b82-a923-766d-9851-04f1af94ca07",
  type: "page-type/runtime-error",
  slug: "alanwalton-20c42b5838f03db6",
  fingerprint: "20c42b5838f03db6",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-quest` was refused: `a composed query over `world-quest`` answered with what is not JSON (AbortError: Fetch is aborted) — one attempt was spent — the question was {"page-type":"world-quest","where":{"character":{"is":"character-player/encounters-alan"}},"keys":["type","character","slug","title","objective","status","unrevealed"]}',
  url: "https://alanwalton.com/story-chapter-written/encounters-0002-eleven-ec1b5225",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-08T12:35:08.815Z",
} as const satisfies RuntimeError
