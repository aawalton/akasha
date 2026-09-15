import type { AddonArtFolder } from "akasha/code/eso-addon/properties/addon-art-folder.named-folder-property.types.ts"
import type { AddonBinFolder } from "akasha/code/eso-addon/properties/addon-bin-folder.named-folder-property.types.ts"
import type { AddonDdsFile } from "akasha/code/eso-addon/properties/addon-dds-file.named-extension-property.types.ts"
import type { AddonDdsFolder } from "akasha/code/eso-addon/properties/addon-dds-folder.named-folder-property.types.ts"
import type { AddonGitIgnore } from "akasha/code/eso-addon/properties/addon-git-ignore.file-property.types.ts"
import type { AddonIconsFolder } from "akasha/code/eso-addon/properties/addon-icons-folder.named-folder-property.types.ts"
import type { AddonImageFolder } from "akasha/code/eso-addon/properties/addon-image-folder.named-folder-property.types.ts"
import type { AddonManifest } from "akasha/code/eso-addon/properties/addon-manifest.file-property.types.ts"
import type { Bindings } from "akasha/code/eso-addon/properties/bindings.file-property.types.ts"
import type { BundleEntry } from "akasha/code/eso-addon/properties/bundle-entry.relation-property.types.ts"
import type { EsoInterfaces } from "akasha/code/eso-addon/properties/eso-interfaces.relation-property.types.ts"
import type { LuaModules } from "akasha/code/eso-addon/properties/lua-modules.relation-property.types.ts"
import type { SiblingManifest } from "akasha/code/eso-addon/properties/sibling-manifest.file-property.types.ts"
import type { Service } from "akasha/infrastructure/service/service.page-type.types.ts"

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
