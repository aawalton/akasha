import type { Finding } from "../finding.page-type.ts"

export const fourItemsCoreTablesAreGeneratorOutputAlreadyInAkasha = {
  id: "01a060c6-c8aa-72cb-a404-d97a1e41189b",
  pageTypeSlug: "finding",
  slug: "four-items-core-tables-are-generator-output-already-in-akasha",
  domainSlug: "domain/temper",
  claim:
    "Four of the six generated tables under temper/game-items-core/src/generated are written by generators that already stand in akasha as temper-addon-generators modules of the same slug. Recreating them as temper-items-core modules is refused, because the index files one page to a slug. They are build output rather than source, and the eight modules reading them wait on a decision about where the data lives rather than on any held package.",
  evidence:
    "akasha write refused module/temper-eso-companion-equipment-constant, module/temper-eso-player-equipment-constant, module/temper-inventory-currency and module/temper-location-type, each naming the page already standing at akasha/temper/temper-addon-generators/<slug>/<slug>.module.ts. The same write also refused eso-companion-equipment-constants-data and location-type-data under no-re-export, since each only sends on names its generated table declared. Dropping the four and their readers took the batch from 44 modules to 32. What is left out is eso-companion-equipment-constants-data, eso-player-equipment-constants-data, inventory-currency-data, location-type-data, and by closure inventory-currencies, inventory-guild-bank-filter, item-centric-inventory, location-classify and location-condition. Two more are left out for their size, item-category-tree.generated.ts at 58,543 bytes and set-category-mappings.generated.ts at 28,261, and with them classify-item, classify-item-node-ids and item-category-tree-data. Seven wait on packages another seat holds: companion-gear-diff, companion-trait-labels, eso-trait-reverse-map and script-knowledge-lookup take values from game-companions-core, game-characters-equipment and game-characters-skills, and inventory-grouping, compute-item-stock and inventory-type-tree-builder follow them. The two type-only reaches, in the player and companion equipment constant tables, need no package landed.",
} as const satisfies Finding
