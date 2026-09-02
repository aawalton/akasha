import type { EsoAddon } from "../../code-system/eso-addon/eso-addon.page-type.ts"

export const temperLibTreasure = {
  id: "01a061d5-d0c3-7a12-a5dc-1ab43add5958",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-treasure",
  definition: "where every treasure map, survey report and clue is buried",
  manifest: "json",
  addonManifest: "json",
  partSlugs: [
    "module/treasure-constants",
    "module/treasure-types",
    "module/treasure-casts",
    "module/treasure-icons",
    "module/treasure-book-ids",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pin is placed by where the pin falls on its own map rather than on the world.",
    },
    {
      invariantKind: "departure",
      statement: "Every lookup is built once as the library loads.",
    },
    {
      invariantKind: "departure",
      statement: "An addon adds an icon to the shared list rather than keeping a separate list.",
    },
    {
      invariantKind: "constraint",
      statement: "The pin rows are what upstream LibTreasure v24 states.",
    },
  ],
} as const satisfies EsoAddon
