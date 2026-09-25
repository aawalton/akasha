import type { BundleDirectory } from "akasha/code/router-app/properties/bundle-directory.build-folder-property.types.ts"
import type { CompileConfig } from "akasha/code/router-app/properties/compile-config.file-property.types.ts"
import type { DeclarationDirectory } from "akasha/code/router-app/properties/declaration-directory.build-folder-property.types.ts"
import type { PlaceholderImage } from "akasha/code/router-app/properties/placeholder-image.file-property.types.ts"
import type { RootRoute } from "akasha/code/router-app/properties/root-route.code-file-property.types.ts"
import type { RouteTable } from "akasha/code/router-app/properties/route-table.code-file-property.types.ts"
import type { RouteTypesDirectory } from "akasha/code/router-app/properties/route-types-directory.build-folder-property.types.ts"
import type { RouterAppGitIgnore } from "akasha/code/router-app/properties/router-app-git-ignore.file-property.types.ts"
import type { RouterConfig } from "akasha/code/router-app/properties/router-config.code-file-property.types.ts"
import type { Server } from "akasha/code/router-app/properties/server.code-file-property.types.ts"
import type { ServerEntry } from "akasha/code/router-app/properties/server-entry.code-file-property.types.ts"
import type { SidebarBoot } from "akasha/code/router-app/properties/sidebar-boot.code-file-property.types.ts"
import type { SiteIcon } from "akasha/code/router-app/properties/site-icon.file-property.types.ts"
import type { TestPreload } from "akasha/code/router-app/properties/test-preload.file-property.types.ts"
import type { ViteConfig } from "akasha/code/router-app/properties/vite-config.code-file-property.types.ts"
import type { ToolReached } from "akasha/code/workspace/properties/tool-reached.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type RouterApp = Domain & {
  rootRoute: RootRoute
  routeTable: RouteTable
  serverEntry: ServerEntry
  routerConfig: RouterConfig
  compileConfig?: CompileConfig
  viteConfig?: ViteConfig
  server?: Server
  sidebarBoot?: SidebarBoot
  placeholderImage?: PlaceholderImage
  siteIcon?: SiteIcon
  gitIgnore?: RouterAppGitIgnore
  testPreload?: TestPreload
  routeTypesDirectory?: RouteTypesDirectory
  declarationDirectory?: DeclarationDirectory
  bundleDirectory?: BundleDirectory
  toolReached?: ToolReached
}
