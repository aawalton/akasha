import type { Finding } from "../finding.page-type.ts"

export const nothingJoinsAFilePropertysPartsSoDividedProseReachesNoReader = {
  id: "01a0693b-cd0e-7ee4-892e-13b69767f218",
  pageTypeSlug: "finding",
  slug: "nothing-joins-a-file-propertys-parts-so-divided-prose-reaches-no-reader",
  domainSlug: "domain/akasha-migration",
  claim:
    "Nothing joins the numbered parts of a file property on read, so prose divided to fit the 15,000 byte ceiling reaches every reader as its first part alone.",
  evidence:
    'Measured 2026-09-03 on the akasha checkout.\n\n`partsOf` is called from four places, every one of them an entry road: `page-entries.module.code.ts:58` (`entriesAt`), `page-entry-landing.module.code.ts:40`, `index-entries.module.code.ts:91` and `page-matches-its-type.code-check.code.ts:140`. Each reaches a property only through `entriedAmong` (`page-entries.module.code.ts:18`), which keeps a property whose `pageTypeSlug` is `ENTRY_PROPERTY`. `prose` and `chapter-text` are `file-property`, so none of the four reaches them.\n\nEvery other reader resolves a file property with `besideAt` (`page-file-name.module.code.ts:145`), which builds one name and carries no part section. `besideOf` and `besideAll` do name every part, but their only callers are move, remove, write and the seat-log sweep, which is file lifecycle rather than value reading.\n\nCounted across `*.prose.part*.txt`: 16,649 part files under 8,116 pages, to a maximum of `part30`. Those pages hold 287,730,182 bytes of prose on disk and deliver 116,780,799 through the `prose` key. 170,949,383 bytes, 59.4 per cent, are reachable by no reader.\n\n`the-wandering-inn-0304-5-58.story-chapter-read.ts` states `ownLength: 20713` and `prose: "txt"`. Nine files hold that chapter and a reader is handed the first 15,000 bytes. The page records the true length and the property contradicts it.\n\nNo bytes are lost from the repository, and the division was made at line boundaries rather than mid-word: part 1 of that chapter closes a paragraph and part 2 opens the next. What is lost is reach, and nothing refuses it, because the page states one key and the file it names is there.',
} as const satisfies Finding
