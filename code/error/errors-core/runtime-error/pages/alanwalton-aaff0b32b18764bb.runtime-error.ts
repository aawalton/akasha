import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonAaff0b32b18764bb = {
  id: "01a0f1be-ea86-7294-a3e0-5530dee395fc",
  type: "page-type/runtime-error",
  slug: "alanwalton-aaff0b32b18764bb",
  fingerprint: "aaff0b32b18764bb",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-condition` was refused: `a composed query over `world-condition`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `rank`, and neither the `world-condition` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, character, condition, cover, description, entries, evolvesFromSlugs, evolvesToSlugs, grade, icon, id, referencedBy, references, slug, title, type, unrevealed, world — one attempt was spent — one attempt was spent — the question was {"page-type":"world-condition","where":{"character":{"is":"character-player/overwhere-iv-nala"}},"keys":["character","slug","title","description","rank","condition","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-iv-f286ba0f?__v=fb13df5e1acc958ffced7e4c8222b7cd58e78c62",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-09-30T09:56:55.319Z",
} as const satisfies RuntimeError
