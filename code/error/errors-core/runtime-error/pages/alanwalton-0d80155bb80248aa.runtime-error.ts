import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton0d80155bb80248aa = {
  id: "01a0f1b9-ce56-7452-95b3-84375d062349",
  type: "page-type/runtime-error",
  slug: "alanwalton-0d80155bb80248aa",
  fingerprint: "0d80155bb80248aa",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-species` was refused: `a composed query over `world-species`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `rank`, and neither the `world-species` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, character, cover, description, entries, evolvesFromSlugs, evolvesToSlugs, grade, icon, id, referencedBy, references, slug, species, title, type, unrevealed, world — one attempt was spent — one attempt was spent — the question was {"page-type":"world-species","where":{"character":{"is":"character-player/overwhere-ii-nala"}},"keys":["character","slug","title","description","rank","species","unrevealed"]}',
  url: "https://alanwalton.com/story-played/overwhere-ii-9019f425",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-09-30T09:51:19.826Z",
} as const satisfies RuntimeError
