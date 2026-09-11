import type { addonKind } from "akasha/code-system/held-addons/properties/addon-kind.select-property.ts"

export type AddonKind = (typeof addonKind.values)[number]
