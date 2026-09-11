import type { AddonArtFolder } from "akasha/code/eso-addons/properties/addon-art-folder.named-folder-property.types.ts"
import type { AddonBinFolder } from "akasha/code/eso-addons/properties/addon-bin-folder.named-folder-property.types.ts"
import type { AddonDdsFile } from "akasha/code/eso-addons/properties/addon-dds-file.named-extension-property.types.ts"
import type { AddonDdsFolder } from "akasha/code/eso-addons/properties/addon-dds-folder.named-folder-property.types.ts"
import type { AddonGitIgnore } from "akasha/code/eso-addons/properties/addon-git-ignore.file-property.types.ts"
import type { AddonIconsFolder } from "akasha/code/eso-addons/properties/addon-icons-folder.named-folder-property.types.ts"
import type { AddonImageFolder } from "akasha/code/eso-addons/properties/addon-image-folder.named-folder-property.types.ts"
import type { AddonManifest } from "akasha/code/eso-addons/properties/addon-manifest.file-property.types.ts"
import type { Bindings } from "akasha/code/eso-addons/properties/bindings.file-property.types.ts"
import type { BundleEntry } from "akasha/code/eso-addons/properties/bundle-entry.relation-property.types.ts"
import type { EsoInterfaces } from "akasha/code/eso-addons/properties/eso-interfaces.relation-property.types.ts"
import type { LuaModules } from "akasha/code/eso-addons/properties/lua-modules.relation-property.types.ts"
import type { SiblingManifest } from "akasha/code/eso-addons/properties/sibling-manifest.file-property.types.ts"
import type { Service } from "akasha/infrastructure/services/service.page-type.types.ts"

export type EsoAddon = Service & {
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
  addonDdsFile?: AddonDdsFile
}
