import type { GitIgnore } from "akasha/code/properties/git-ignore.file-property.types.ts"
import type { Service } from "akasha/infrastructure/service/service.page-type.types.ts"
import type { AddonArtFolder } from "akasha/temper/addon/properties/addon-art-folder.named-folder-property.types.ts"
import type { AddonBinFolder } from "akasha/temper/addon/properties/addon-bin-folder.named-folder-property.types.ts"
import type { AddonDdsFile } from "akasha/temper/addon/properties/addon-dds-file.named-extension-property.types.ts"
import type { AddonDdsFolder } from "akasha/temper/addon/properties/addon-dds-folder.named-folder-property.types.ts"
import type { AddonIconsFolder } from "akasha/temper/addon/properties/addon-icons-folder.named-folder-property.types.ts"
import type { AddonImageFolder } from "akasha/temper/addon/properties/addon-image-folder.named-folder-property.types.ts"
import type { AddonLibrary } from "akasha/temper/addon/properties/addon-library.boolean-property.types.ts"
import type { AddonManifest } from "akasha/temper/addon/properties/addon-manifest.file-property.types.ts"
import type { Bindings } from "akasha/temper/addon/properties/bindings.file-property.types.ts"
import type { BundleEntry } from "akasha/temper/addon/properties/bundle-entry.relation-property.types.ts"
import type { EsoInterfaces } from "akasha/temper/addon/properties/eso-interfaces.multi-relation-property.types.ts"
import type { LuaModules } from "akasha/temper/addon/properties/lua-modules.multi-relation-property.types.ts"
import type { SiblingManifest } from "akasha/temper/addon/properties/sibling-manifest.file-property.types.ts"

export type TemperAddon = Service & {
  addonManifest: AddonManifest
  bundleEntry?: BundleEntry
  bindings?: Bindings
  interfaces?: EsoInterfaces
  luaModules?: LuaModules
  gitIgnore?: GitIgnore
  siblingManifest?: SiblingManifest
  addonIconsFolder?: AddonIconsFolder
  addonDdsFolder?: AddonDdsFolder
  addonArtFolder?: AddonArtFolder
  addonImageFolder?: AddonImageFolder
  addonBinFolder?: AddonBinFolder
  addonDdsFile?: AddonDdsFile
  library?: AddonLibrary
}
