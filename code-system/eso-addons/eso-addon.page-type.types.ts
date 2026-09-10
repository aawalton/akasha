import type { WorkspacePackage } from "../workspace-packages/workspace-package.page-type.types.ts"
import type { AddonGitIgnore } from "./properties/addon-git-ignore.file-property.ts"
import type { AddonManifest } from "./properties/addon-manifest.file-property.ts"
import type { Bindings } from "./properties/bindings.file-property.ts"
import type { BundleEntry } from "./properties/bundle-entry.relation-property.ts"
import type { EsoInterfaces } from "./properties/eso-interfaces.relation-property.ts"
import type { LuaModules } from "./properties/lua-modules.relation-property.ts"
import type { SiblingManifest } from "./properties/sibling-manifest.file-property.ts"

export type EsoAddon = WorkspacePackage & {
  addonManifest: AddonManifest
  bundleEntry?: BundleEntry
  bindings?: Bindings
  interfaces?: EsoInterfaces
  luaModules?: LuaModules
  gitIgnore?: AddonGitIgnore
  siblingManifest?: SiblingManifest
}
