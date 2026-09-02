import type { Finding } from "../finding.page-type.ts"

export const twoAddonDataGeneratorsReadPagePropertiesTheirPageTypesDropped = {
  id: "01a060ea-f374-76fc-827e-b69215478db7",
  pageTypeSlug: "finding",
  slug: "two-addon-data-generators-read-page-properties-their-page-types-dropped",
  domainSlug: "domain/temper",
  claim:
    "Generators under temper-addon-generators parse page properties their page types no longer declare, so each throws at its zod parse rather than writing a table, and the file it last wrote stays on disk reading as current. It is more than two. Four are now mended and regenerate byte for byte, and seven of fourteen write sections still throw. One never threw: it read a property under the wrong name, its validator defaulted that to null, and it wrote a table with every value zeroed.",
  evidence:
    "tools/addon-data-proof.ts runs the real write table from tools/lib/temper-addon-data/writes.ts with a sink that compares instead of writing, so it cannot drift from what generate does. Against the live pages it answers 34 byte-identical, 1 differing, 7 sections throwing. The four mended are item-category-tree at 58,541 bytes, temper-completion-category at 5,497, temper-inventory-currency at 1,805 and temper-eso-companion at 4,881; each now reads what its page type declares and each reproduces what is checked in. temper-companion-trait is the one that never threw: it read `row.effectType` where the pages carry `type`, and its validator defaults that field to null, so it rendered every companion trait with a null effect and wrote 4,003 bytes where the checked-in table is 4,199. Reading `row.type` closes those 196 bytes exactly. temper-set still differs by 26 characters out of 1,362,584. The seven sections that throw are alchemy, lore, rules, scribing, stats, companions and skills; a section stops at its first throw, so one broken generator hides the rest of its section. This finding also claimed item-category-tree reads a `parent` its page type dropped, which is wrong: every one of the 439 rows carries `parent`.",
} as const satisfies Finding
