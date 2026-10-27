import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton51c33e835fb15847 = {
  id: "01a17eeb-dbc7-726b-b072-bd0b25d4fd40",
  type: "page-type/runtime-error",
  slug: "alanwalton-51c33e835fb15847",
  fingerprint: "51c33e835fb15847",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-trait` was refused: `a composed query over `character-trait`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `trait`, and neither the `character-trait` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, character, cover, createdAt, description, entries, evolvesFromSlugs, evolvesToSlugs, grade, icon, id, referencedBy, references, slug, story, title, type, unrevealed, updatedAt, world — one attempt was spent — one attempt was spent — the question was {"page-type":"character-trait","where":{"character":{"is":"character-player/test-story-player"}},"keys":["type","character","slug","title","description","trait","rank","unrevealed"]}',
  url: "https://alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-27T19:52:28.430Z",
  createdAt: "2026-10-27T19:52:28.871Z",
  updatedAt: "2026-10-27T19:52:28.871Z",
} as const satisfies RuntimeError
