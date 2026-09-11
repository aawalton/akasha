import type { AddonBundleImage } from "akasha/code-system/router-apps/properties/addon-bundle-image.code-file-property.ts"
import type { BundleDirectory } from "akasha/code-system/router-apps/properties/bundle-directory.build-folder-property.types.ts"
import type { CompileConfig } from "akasha/code-system/router-apps/properties/compile-config.file-property.ts"
import type { DeclarationDirectory } from "akasha/code-system/router-apps/properties/declaration-directory.build-folder-property.types.ts"
import type { PlaceholderImage } from "akasha/code-system/router-apps/properties/placeholder-image.file-property.ts"
import type { RootRoute } from "akasha/code-system/router-apps/properties/root-route.code-file-property.ts"
import type { RouteTable } from "akasha/code-system/router-apps/properties/route-table.code-file-property.ts"
import type { RouteTypesDirectory } from "akasha/code-system/router-apps/properties/route-types-directory.build-folder-property.types.ts"
import type { RouterAppGitIgnore } from "akasha/code-system/router-apps/properties/router-app-git-ignore.file-property.ts"
import type { RouterConfig } from "akasha/code-system/router-apps/properties/router-config.code-file-property.ts"
import type { Server } from "akasha/code-system/router-apps/properties/server.code-file-property.ts"
import type { ServerEntry } from "akasha/code-system/router-apps/properties/server-entry.code-file-property.ts"
import type { SidebarBoot } from "akasha/code-system/router-apps/properties/sidebar-boot.code-file-property.ts"
import type { SiteIcon } from "akasha/code-system/router-apps/properties/site-icon.file-property.ts"
import type { TestPreload } from "akasha/code-system/router-apps/properties/test-preload.file-property.ts"
import type { ViteConfig } from "akasha/code-system/router-apps/properties/vite-config.code-file-property.ts"
import type { WorkspacePackage } from "akasha/code-system/workspace-packages/workspace-package.page-type.types.ts"

export type RouterApp = WorkspacePackage & {
  rootRoute: RootRoute
  routeTable: RouteTable
  serverEntry: ServerEntry
  routerConfig: RouterConfig
  compileConfig?: CompileConfig
  viteConfig?: ViteConfig
  server?: Server
  addonBundleImage?: AddonBundleImage
  sidebarBoot?: SidebarBoot
  placeholderImage?: PlaceholderImage
  siteIcon?: SiteIcon
  gitIgnore?: RouterAppGitIgnore
  testPreload?: TestPreload
  routeTypesDirectory?: RouteTypesDirectory
  declarationDirectory?: DeclarationDirectory
  bundleDirectory?: BundleDirectory
}
