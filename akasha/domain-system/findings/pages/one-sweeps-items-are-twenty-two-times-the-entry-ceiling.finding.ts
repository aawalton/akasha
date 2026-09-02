import type { Finding } from "../finding.page-type.ts"

export const oneSweepsItemsAreTwentyTwoTimesTheEntryCeiling = {
  id: "01a06053-3728-798d-8b97-009662f9985b",
  pageTypeSlug: "finding",
  slug: "one-sweeps-items-are-twenty-two-times-the-entry-ceiling",
  domainSlug: "domain/temper",
  claim:
    "The 8,388,608 byte entry ceiling does not admit the ESO item sweep. The rows are 188,484,624 bytes once shaped to what `items` declares, 22.4 times the ceiling, and akasha names one file for one property of one page, so there is no split to make. The 24 `.partN` files outside are a naming akasha does not read: `besideAt` builds `<page>.<property>.<extension>` and nothing else, and a name carrying a second section is a stray. The sweep's quests landed; its items did not.",
  evidence:
    "besideAt (page-file-name.module.code.ts:94-97) builds one name per page and property, and entriesAt (page-entries.module.code.ts:45-53) reads that one name and refuses where no file is there. partedIn:52 reads `eso.temper-mine.items.part2.jsonl` as sections ['items','part2'], and heldIn:169 keys a property file only where onlyIn:67 finds a single section, so a `.partN` name is a stray rather than an entry. ceilingFor (file-length.code-check.code.ts:22-24) gives any `jsonl` the 8,388,608 byte ENTRY_CEILING, so the ceiling is the wide one already and the file is still 180,096,016 bytes over. Concatenating the 24 files outside gives 155,440 rows, every slug distinct, 196,161,960 bytes; dropping `slug` and `name`, the two keys `items` does not declare, leaves 188,484,624. 155,436 of those rows carry a minedAt inside one day, so this is one sweep rather than several, and temper-mine.page-type.ts:66 says one file holds every item a sweep read. Splitting the rows across several `temper-mine` pages would invent sweeps that never ran. temper-mine.page-type.ts:73-75 already carries the gap `A sweep's rows are over the byte ceiling akasha holds a file to`, which the new ceiling narrowed rather than closed. The source is unchanged at pages/temper-mine/, which holds the only copy.",
} as const satisfies Finding
