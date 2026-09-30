import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton1499d7192df57271 = {
  id: "01a0f1be-ea86-7a2d-9c88-8e7f99a7676a",
  type: "page-type/runtime-error",
  slug: "alanwalton-1499d7192df57271",
  fingerprint: "1499d7192df57271",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-condition` was refused: `a composed query over `world-condition`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `rank`, and neither the `world-condition` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, character, condition, cover, description, entries, evolvesFromSlugs, evolvesToSlugs, grade, icon, id, referencedBy, references, slug, title, type, unrevealed, world — one attempt was spent — one attempt was spent — the question was {"page-type":"world-condition","where":{"character":{"is":"character-player/overwhere-ii-nala"}},"keys":["character","slug","title","description","rank","condition","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-ii-9019f425?__v=901cc22776923720bafa08371d080e171e565517",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-09-30T09:56:55.317Z",
} as const satisfies RuntimeError
