import type { WorkspacePackage } from "../workspace-packages/workspace-package.page-type.ts"
import type { AddonBundleImage } from "./properties/addon-bundle-image.code-file-property.ts"
import type { AppLayout } from "./properties/app-layout.code-file-property.ts"
import type { BundleDirectory } from "./properties/bundle-directory.build-folder-property.ts"
import type { CompileConfig } from "./properties/compile-config.file-property.ts"
import type { DeclarationDirectory } from "./properties/declaration-directory.build-folder-property.ts"
import type { PlaceholderImage } from "./properties/placeholder-image.file-property.ts"
import type { RootRoute } from "./properties/root-route.code-file-property.ts"
import type { RouteTable } from "./properties/route-table.code-file-property.ts"
import type { RouteTypesDirectory } from "./properties/route-types-directory.build-folder-property.ts"
import type { RouterAppGitIgnore } from "./properties/router-app-git-ignore.file-property.ts"
import type { RouterConfig } from "./properties/router-config.code-file-property.ts"
import type { Server } from "./properties/server.code-file-property.ts"
import type { ServerEntry } from "./properties/server-entry.code-file-property.ts"
import type { SidebarBoot } from "./properties/sidebar-boot.code-file-property.ts"
import type { SiteIcon } from "./properties/site-icon.file-property.ts"
import type { TestPreload } from "./properties/test-preload.file-property.ts"
import type { ViteConfig } from "./properties/vite-config.code-file-property.ts"

export type RouterApp = WorkspacePackage & {
  rootRoute: RootRoute
  routeTable: RouteTable
  serverEntry: ServerEntry
  routerConfig: RouterConfig
  compileConfig?: CompileConfig
  appLayout?: AppLayout
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
