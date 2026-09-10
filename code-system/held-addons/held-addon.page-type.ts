import type { PageType } from "@akasha/pages/page-type"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { AddonKind } from "./properties/addon-kind.text-property.ts"
import type { AddonName } from "./properties/addon-name.text-property.ts"
import type { Adjacents } from "./properties/adjacents.relation-property.ts"
import type { EsoAddon } from "./properties/eso-addon.relation-property.ts"
import type { HeldBy } from "./properties/held-by.number-property.ts"
import type { TiClean } from "./properties/ti-clean.boolean-property.ts"
import type { TiCleanBlockedReason } from "./properties/ti-clean-blocked-reason.text-property.ts"

export type HeldAddon = Page & {
  addonName: AddonName
  esoAddon: EsoAddon
  addonKind: AddonKind
  heldBy: HeldBy
  adjacents?: Adjacents
  tiClean?: TiClean
  tiCleanBlockedReason?: TiCleanBlockedReason
}

export const heldAddon = {
  id: "01a0819e-eab2-7732-96da-90412118ff10",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "held-addon",
  definition: "an addon the temper port has taken over",
  pluralSlug: "held-addons",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/ti-clean",
    "number-property/held-by",
    "relation-property/adjacents",
    "relation-property/eso-addon",
    "text-property/addon-kind",
    "text-property/addon-name",
    "text-property/ti-clean-blocked-reason",
  ],
  properties: [
    { pageProperty: "text-property/addon-name", required: true, many: false },
    { pageProperty: "relation-property/eso-addon", required: true, many: false },
    { pageProperty: "text-property/addon-kind", required: true, many: false },
    { pageProperty: "number-property/held-by", required: true, many: false },
    {
      pageProperty: "relation-property/adjacents",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "boolean-property/ti-clean", required: false, many: false },
    { pageProperty: "text-property/ti-clean-blocked-reason", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon is a page here once the port has taken that addon over.",
    },
    {
      invariantKind: "departure",
      statement: "An addon the port has not taken over is no page here.",
    },
    {
      invariantKind: "departure",
      statement: "A key this page type does not declare is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The name a page here states is judged against the addon manifests the tree has.",
    },
    {
      invariantKind: "gap",
      statement: "Every addon the temper port has is a page here.",
    },
  ],
} as const satisfies PageType
