import type { Finding } from "../finding.page-type.ts"

export const twoAddonDataGeneratorsReadPagePropertiesTheirPageTypesDropped = {
  id: "01a060ea-f374-76fc-827e-b69215478db7",
  pageTypeSlug: "finding",
  slug: "two-addon-data-generators-read-page-properties-their-page-types-dropped",
  domainSlug: "domain/temper",
  claim:
    "Two temper-addon-generators modules parse page properties their page types no longer declare, so each throws at its zod parse rather than writing a table. The generated files those two wrote are on disk from before the properties were renamed, and read as current. Nothing tells them apart from a table that regenerates, which is how both went unnoticed.",
  evidence:
    "temper-inventory-currency.module.code.ts line 7 requires `currencyId`, and the temper-inventory-currency page type declares `key` and `display-order`; every one of the 16 pages under akasha/temper/temper-holdings/inventory-currencies/pages carries `key`. item-category-tree.module.code.ts line 6 requires `key` and line 9 requires `sortOrder`, and the temper-item-category-tree page type declares `display-order` and neither of those, nor the `parent` its line 7 reads. Feeding the live pages to each generator through tools/lib/temper-addon-data/pages-bridge.ts throws `Invalid input: expected string, received undefined` at `currencyId` and at `key`. The other three generators over the same package run and answer byte for byte what is on disk: temper-location-type 7 rows and 973 bytes, temper-eso-companion-equipment-constant 24 rows and 1,826 bytes, temper-eso-player-equipment-constant 24 rows and 1,466 bytes. The currency table was proven against its pages instead, by key order and by whole structure, and both matched. Because both generators throw, `ops temper addon-data generate` cannot complete, and the two tables are frozen at whatever the last successful run wrote.",
} as const satisfies Finding
