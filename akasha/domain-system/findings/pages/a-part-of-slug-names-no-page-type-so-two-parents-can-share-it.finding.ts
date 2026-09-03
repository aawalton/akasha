import type { Finding } from "../finding.page-type.ts"

export const aPartOfSlugNamesNoPageTypeSoTwoParentsCanShareIt = {
  id: "01a06748-3c02-7000-9b5e-41f7a0c8d233",
  pageTypeSlug: "finding",
  slug: "a-part-of-slug-names-no-page-type-so-two-parents-can-share-it",
  domainSlug: "domain/akasha-migration",
  claim:
    "`part-of-slugs` carries a bare slug with no page type in front of it, and a slug is unique only within a page type. 83 slugs are held by more than one of the 26 page types descending from `collection`, one of them by three, and 5,021 `part-of-slugs` entries across akasha name a slug in that set. So 5,021 parent references cannot say from the data alone which page they mean.",
  evidence:
    "Counted over every page whose type descends from `collection`, the descent read off `extends-slug` rather than assumed: 26 types, 24,908 distinct slugs, 83 held by two and `sword-art-online` by three (book, franchise, show). " +
    "Three different things are behind the 83, wanting three different answers. 47 are `book-series` beside `story-read`, and those are one work twice: `azarinth-healer` is recorded as a book series from kindle, external id B0BN9N91J7, and again as a story read from royal-road, external id 16946. That is the intent about nothing duplicating what is already inside akasha, failing from the inside. " +
    "11 are `book` beside `great-course`, genuinely different works sharing a title: `how-we-learn` is a book by Benedict Carey of 175,500 words and a course of 702.6 minutes. Nothing duplicated; the names collide. 16 are `book` beside `book-series`, a book named for its series. 8 are `game` beside `story-played`, the work and the record of playing it under one name. " +
    "I made 8 of the 83 an hour before writing this, landing the game family onto slugs `story-played` already held. So this is not a legacy hazard migration is clearing. Every family landed on this relation adds to it and nothing warns you, because a landing checks a slug against its own page type and the collision is across types. " +
    "One relation for work, instalment and shelf alike was my choice and I would make it again: it is what let nineteen old page types become one shape. But a relation reaching across 26 types wants the type said, as `part-slugs` already says `page-type/book`, and as `unit-slug` gets away without saying because it targets one type. " +
    "Not yet known: how many of the 5,021 resolve to the wrong page today. The screen family was checked against a typed index of 24,850 slugs and all 160 were right, but that check was written by hand for one family.",
} as const satisfies Finding
