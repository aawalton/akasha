import type { AddonGitIgnore } from "akasha/code-system/eso-addons/properties/addon-git-ignore.file-property.ts"
import type { AddonManifest } from "akasha/code-system/eso-addons/properties/addon-manifest.file-property.ts"
import type { Bindings } from "akasha/code-system/eso-addons/properties/bindings.file-property.ts"
import type { BundleEntry } from "akasha/code-system/eso-addons/properties/bundle-entry.relation-property.types.ts"
import type { EsoInterfaces } from "akasha/code-system/eso-addons/properties/eso-interfaces.relation-property.types.ts"
import type { LuaModules } from "akasha/code-system/eso-addons/properties/lua-modules.relation-property.types.ts"
import type { SiblingManifest } from "akasha/code-system/eso-addons/properties/sibling-manifest.file-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type EsoAddon = Domain & {
  addonManifest: AddonManifest
  bundleEntry?: BundleEntry
  bindings?: Bindings
  interfaces?: EsoInterfaces
  luaModules?: LuaModules
  gitIgnore?: AddonGitIgnore
  siblingManifest?: SiblingManifest
}
