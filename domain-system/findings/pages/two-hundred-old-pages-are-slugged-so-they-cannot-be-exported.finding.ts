import type { Finding } from "../finding.page-type.ts"

export const twoHundredOldPagesAreSluggedSoTheyCannotBeExported = {
  id: "01a0657f-1a2c-7000-9d5c-6e2b41f0a1c3",
  pageTypeSlug: "finding",
  slug: "two-hundred-old-pages-are-slugged-so-they-cannot-be-exported",
  domainSlug: "domain/akasha-migration",
  claim:
    "Nineteen thousand six hundred and ninety-seven pages still outside akasha carry a slug that composes no TypeScript export name, rather than the two hundred and four first counted, and a leading digit is one of two faults rather than the only one.",
  evidence:
    "A page is one exported object named for the page's slug, and the slug property states that a slug that cannot become a page's export name is no slug. " +
    "`exportedAs` only uppercases the letter after each hyphen, so `1066-the-year-that-changed-everything` composes `1066TheYearThatChangedEverything`, which cannot open an identifier. " +
    "Swept over every markdown page outside akasha rather than over four families: story-chapter-royal-road 18,091, story-chapter-wandering-inn 832, food-entry 333, learn-everything-topic 270, scripture-passage 86, book-chapter 17, code-editor-terminal 14, email-entry 13, book 12, story-chapter-written 12, and eight kinds carrying five or fewer. " +
    "The first count read directory entries rather than pages, so scripture-passage came back 172 for 86 pages each beside one attachment, and it read one folder level, so learn-everything-topic came back 20 for a tree holding 270. " +
    "The second fault is a slug whose whole name TypeScript keeps: `class`, `switch`, `package`, `private`, and `case`, which are seven pages under domain, page-type, book and class. A name reserved only under strict mode counts, because a page is a module. " +
    "The remedy is the page type slug in front, as `wake-day-2026-08-20` and `great-course-7-days-of-drawing` already carry it. " +
    "Nothing inside akasha is now slugged this way: 38,750 landed page files sweep clean, the nine great courses having been mended. " +
    "`nameFaultIn` in `page-export-name` answers whether a slug names an export, and `asking` refuses such a page beside the minting rather than among the checks, so a mechanical landing running no check is held to it too.",
} as const satisfies Finding
