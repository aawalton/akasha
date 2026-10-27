import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonC605aadbdfffd7df = {
  id: "01a17f04-e9b4-766b-a604-35d45b6aa9e8",
  type: "page-type/runtime-error",
  slug: "alanwalton-c605aadbdfffd7df",
  fingerprint: "c605aadbdfffd7df",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `rank`, and neither the `world-skill` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, attribute, character, cover, createdAt, description, durationMinutes, entries, evolvesFromSlugs, evolvesToSlugs, experience, grade, icon, id, manaCost, referencedBy, references, skill, slug, title, type, unrevealed, updatedAt, world — one attempt was spent — one attempt was spent — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/gifted-reborn-nala"}},"keys":["type","character","slug","title","description","skill","rank","level","axis","experience","attribute","unrevealed"]}',
  url: "https://alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-27T20:19:50.356Z",
  createdAt: "2026-10-27T20:19:50.835Z",
  updatedAt: "2026-10-27T20:19:50.835Z",
} as const satisfies RuntimeError
