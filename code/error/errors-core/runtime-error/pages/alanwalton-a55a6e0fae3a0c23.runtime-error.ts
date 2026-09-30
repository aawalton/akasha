import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonA55a6e0fae3a0c23 = {
  id: "01a0f1bf-5de0-78b4-8040-932ed89593aa",
  type: "page-type/runtime-error",
  slug: "alanwalton-a55a6e0fae3a0c23",
  fingerprint: "a55a6e0fae3a0c23",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-condition` was refused: `a composed query over `world-condition`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `rank`, and neither the `world-condition` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, character, condition, cover, description, entries, evolvesFromSlugs, evolvesToSlugs, grade, icon, id, referencedBy, references, slug, title, type, unrevealed, world — one attempt was spent — one attempt was spent — the question was {"page-type":"world-condition","where":{"character":{"is":"character-player/overwhere-iii-nala"}},"keys":["character","slug","title","description","rank","condition","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-iii-b6d22058?__v=465f52b00d50c170d7d5c40ba1898ea9a83e4765",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-09-30T09:57:25.099Z",
} as const satisfies RuntimeError
