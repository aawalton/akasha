import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonDd0b524634eddc2b = {
  id: "01a17eea-4b23-76ad-982b-4bc8ce1ea698",
  type: "page-type/runtime-error",
  slug: "alanwalton-dd0b524634eddc2b",
  fingerprint: "dd0b524634eddc2b",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `character-trait` was refused: `a composed query over `character-trait`` was refused: the page store replied 400: `an ask carried through alanwalton.com` was refused: the page store replied 400: `keys` names `trait`, and neither the `character-trait` page type nor any page type extending it declares such a key. the keys are aliases, appearanceCount, character, cover, createdAt, description, entries, evolvesFromSlugs, evolvesToSlugs, grade, icon, id, referencedBy, references, slug, story, title, type, unrevealed, updatedAt, world — one attempt was spent — one attempt was spent — the question was {"page-type":"character-trait","where":{"character":{"is":"character-player/gifted-reborn-nala"}},"keys":["type","character","slug","title","description","trait","rank","unrevealed"]}',
  url: "https://alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-27T19:50:45.864Z",
  createdAt: "2026-10-27T19:50:46.306Z",
  updatedAt: "2026-10-27T19:50:46.306Z",
} as const satisfies RuntimeError
