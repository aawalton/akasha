import type { Finding } from "../finding.page-type.ts"

export const twoHundredOldPagesAreSluggedSoTheyCannotBeExported = {
  id: "01a0657f-1a2c-7000-9d5c-6e2b41f0a1c3",
  pageTypeSlug: "finding",
  slug: "two-hundred-old-pages-are-slugged-so-they-cannot-be-exported",
  domainSlug: "domain/akasha-migration",
  claim:
    "Two hundred and thirteen pages still outside akasha are slugged beginning with a digit, and a page slugged that way composes an export name no TypeScript file can declare.",
  evidence:
    "A page is one exported object named for the page's slug, and the slug property states that a slug that cannot become a page's export name is no slug. " +
    "`exportedAs` only uppercases the letter after each hyphen, so `1066-the-year-that-changed-everything` composes `1066TheYearThatChangedEverything`, which cannot open an identifier. " +
    "A mechanical landing does not typecheck, so nine such courses landed looking correct and were found only on reading one back. " +
    "Counted over the folders still to move: scripture-passage 172, learn-everything-topic 20, book 11, book-series 1. The nine great courses are already mended. " +
    "akasha answers this already where a day is slugged `wake-day-` before the day it is of, under the rule that no day is slugged by its date alone. " +
    "The great courses migration took the same road, prefixing the page type slug, so `7-days-of-drawing` became `great-course-7-days-of-drawing`. " +
    "The nine that had already landed were removed and put back rather than left, and the carry now refuses any shelf whose own slug would have to move, because a shelf that moved would leave every page naming it pointing at nothing.",
} as const satisfies Finding
