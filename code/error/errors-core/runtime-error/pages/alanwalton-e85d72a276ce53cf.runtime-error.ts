import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE85d72a276ce53cf = {
  id: "01a0f1bb-09ab-76bd-84d1-663c87a99576",
  type: "page-type/runtime-error",
  slug: "alanwalton-e85d72a276ce53cf",
  fingerprint: "e85d72a276ce53cf",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-condition` was refused: `a composed query over `world-condition`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `rank`, and neither the `world-condition` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, character, condition, cover, description, entries, evolvesFromSlugs, evolvesToSlugs, grade, icon, id, referencedBy, references, slug, title, type, unrevealed, world — one attempt was spent — one attempt was spent — the question was {"page-type":"world-condition","where":{"character":{"is":"character-player/overwhere-i-nala"}},"keys":["character","slug","title","description","rank","condition","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-i-76f5ac57",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-09-30T09:52:41.219Z",
} as const satisfies RuntimeError
