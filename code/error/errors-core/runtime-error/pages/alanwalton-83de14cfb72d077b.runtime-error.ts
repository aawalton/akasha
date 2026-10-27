import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton83de14cfb72d077b = {
  id: "01a17efe-4a7e-793c-b18f-84d22cf65cd5",
  type: "page-type/runtime-error",
  slug: "alanwalton-83de14cfb72d077b",
  fingerprint: "83de14cfb72d077b",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-skill` was refused: `a composed query over `world-skill`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `rank`, and neither the `world-skill` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, attribute, character, cover, createdAt, description, durationMinutes, entries, evolvesFromSlugs, evolvesToSlugs, experience, grade, icon, id, manaCost, referencedBy, references, skill, slug, title, type, unrevealed, updatedAt, world — one attempt was spent — one attempt was spent — the question was {"page-type":"world-skill","where":{"character":{"is":"character-player/test-story-player"}},"keys":["type","character","slug","title","description","skill","rank","level","axis","experience","attribute","unrevealed"]}',
  url: "https://alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-27T20:12:36.406Z",
  createdAt: "2026-10-27T20:12:36.862Z",
  updatedAt: "2026-10-27T20:12:36.862Z",
} as const satisfies RuntimeError
