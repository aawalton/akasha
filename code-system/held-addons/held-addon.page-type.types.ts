import type { Page } from "../../pages/page.page-type.types.ts"
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
