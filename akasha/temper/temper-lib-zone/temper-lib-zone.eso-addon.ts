import type { EsoAddon } from "../../code-system/eso-addon/eso-addon.page-type.ts"

export const temperLibZone = {
  id: "01a061e7-9339-786d-9b8b-dd5d2b7a609c",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-zone",
  definition: "every zone and subzone the game holds, named in each language",
  manifest: "json",
  addonManifest: "json",
  partSlugs: [
    "module/zone-constants",
    "module/zone-types",
    "module/zone-casts",
    "module/zone-ui-strings",
    "module/zone-internal-state",
    "module/zone-geo-data-00",
    "module/zone-geo-data-01",
    "module/zone-geo-data-02",
    "module/zone-geo-data",
    "module/zone-public-dungeon-map-ids",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A zone name is carried here rather than asked of the game one zone at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A zone geographical parent is stated where the game's own parent is wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A zone name the running game does not know is dropped as the library loads.",
    },
    {
      invariantKind: "constraint",
      statement: "The zone rows are what upstream LibZone v8.98 states.",
    },
    {
      invariantKind: "constraint",
      statement: "The slash-command autocompletion needs LibSlashCommander loaded first.",
    },
  ],
} as const satisfies EsoAddon
