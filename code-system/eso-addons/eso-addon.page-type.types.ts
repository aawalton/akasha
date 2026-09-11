import type { AddonArtFolder } from "akasha/code-system/eso-addons/properties/addon-art-folder.named-folder-property.types.ts"
import type { AddonBinFolder } from "akasha/code-system/eso-addons/properties/addon-bin-folder.named-folder-property.types.ts"
import type { AddonDdsFolder } from "akasha/code-system/eso-addons/properties/addon-dds-folder.named-folder-property.types.ts"
import type { AddonGitIgnore } from "akasha/code-system/eso-addons/properties/addon-git-ignore.file-property.types.ts"
import type { AddonIconsFolder } from "akasha/code-system/eso-addons/properties/addon-icons-folder.named-folder-property.types.ts"
import type { AddonImageFolder } from "akasha/code-system/eso-addons/properties/addon-image-folder.named-folder-property.types.ts"
import type { AddonManifest } from "akasha/code-system/eso-addons/properties/addon-manifest.file-property.types.ts"
import type { Bindings } from "akasha/code-system/eso-addons/properties/bindings.file-property.types.ts"
import type { BundleEntry } from "akasha/code-system/eso-addons/properties/bundle-entry.relation-property.types.ts"
import type { EsoInterfaces } from "akasha/code-system/eso-addons/properties/eso-interfaces.relation-property.types.ts"
import type { LuaModules } from "akasha/code-system/eso-addons/properties/lua-modules.relation-property.types.ts"
import type { SiblingManifest } from "akasha/code-system/eso-addons/properties/sibling-manifest.file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type EsoAddon = Domain & {
  addonManifest: AddonManifest
  bundleEntry?: BundleEntry
  bindings?: Bindings
  interfaces?: EsoInterfaces
  luaModules?: LuaModules
  gitIgnore?: AddonGitIgnore
  siblingManifest?: SiblingManifest
  addonIconsFolder?: AddonIconsFolder
  addonDdsFolder?: AddonDdsFolder
  addonArtFolder?: AddonArtFolder
  addonImageFolder?: AddonImageFolder
  addonBinFolder?: AddonBinFolder
}
