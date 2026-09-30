import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonB5df8d8bb50f8528 = {
  id: "01a0f1ba-14ce-74a1-94ee-4d89f69e7ce0",
  type: "page-type/runtime-error",
  slug: "alanwalton-b5df8d8bb50f8528",
  fingerprint: "b5df8d8bb50f8528",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-species` was refused: `a composed query over `world-species`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `rank`, and neither the `world-species` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, character, cover, description, entries, evolvesFromSlugs, evolvesToSlugs, grade, icon, id, referencedBy, references, slug, species, title, type, unrevealed, world — one attempt was spent — one attempt was spent — the question was {"page-type":"world-species","where":{"character":{"is":"character-player/overwhere-iii-nala"}},"keys":["character","slug","title","description","rank","species","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-iii-b6d22058?__v=465f52b00d50c170d7d5c40ba1898ea9a83e4765",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-09-30T09:51:38.459Z",
} as const satisfies RuntimeError
