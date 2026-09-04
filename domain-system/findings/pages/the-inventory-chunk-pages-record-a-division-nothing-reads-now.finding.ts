import type { Finding } from "../finding.page-type.ts"

export const theInventoryChunkPagesRecordADivisionNothingReadsNow = {
  id: "01a06079-e46f-7444-83b0-d22dc078a55e",
  pageTypeSlug: "finding",
  slug: "the-inventory-chunk-pages-record-a-division-nothing-reads-now",
  domainSlug: "domain/temper-holdings",
  claim:
    "The 458 `temper-inventory-chunk` pages record where a 900,000-byte transport division fell across 151 captures. What those bytes held now sits beside each snapshot page as rows, so the chunk pages describe a boundary nothing reads any more. Their page type's invariant that the bytes it counts are not in akasha is no longer true.",
  evidence:
    'The finding `temper-cut-its-inventory-to-fit-a-limit-akasha-does-not-share` worked out that the 458 chunks are 157 captures divided on a byte count rather than on a JSON boundary, and said to rejoin them into one page each once the file ceiling was ruled on. The ceiling was ruled on: commit `2c31d47f4a` gives an entry file 8,388,608 bytes.\n\nThe rejoin is done. Each of the 151 readable captures is one `stacks` entry file beside its `temper-inventory-snapshot` page, and every row round-trips field for field back to the source bytes. The largest is 2,672,521 bytes, under a third of the ceiling, so no capture came near a wall.\n\nWhat remains is the page type `temper-inventory-chunk`, its three properties `byte-count`, `chunk-index` and `inventory`, its 458 pages, and its `gap` invariant "The bytes a page here counts are not in akasha." The six captures that lost chunks keep a reason to record which index went missing, which the snapshot\'s own `chunk-count` already half tells. Whether the 458 pages are deleted is a decision nobody has made, and the source under `pages/temper-inventory-chunk` is untouched.',
} as const satisfies Finding
