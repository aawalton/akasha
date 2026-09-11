import type { AddonKind } from "akasha/code-system/held-addons/properties/addon-kind.select-property.ts"
import type { AddonName } from "akasha/code-system/held-addons/properties/addon-name.text-property.ts"
import type { Adjacents } from "akasha/code-system/held-addons/properties/adjacents.relation-property.types.ts"
import type { EsoAddon } from "akasha/code-system/held-addons/properties/eso-addon.relation-property.types.ts"
import type { HeldBy } from "akasha/code-system/held-addons/properties/held-by.number-property.types.ts"
import type { TiClean } from "akasha/code-system/held-addons/properties/ti-clean.boolean-property.types.ts"
import type { TiCleanBlockedReason } from "akasha/code-system/held-addons/properties/ti-clean-blocked-reason.text-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type HeldAddon = Page & {
  addonName: AddonName
  esoAddon: EsoAddon
  addonKind: AddonKind
  heldBy: HeldBy
  adjacents?: Adjacents
  tiClean?: TiClean
  tiCleanBlockedReason?: TiCleanBlockedReason
}
