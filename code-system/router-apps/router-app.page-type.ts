import type { PageType } from "@akasha/pages/page-type"
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

export const routerApp = {
  id: "01a063f3-c2ab-765b-9c87-954f96167da7",
  pageTypeSlug: "page-type",
  slug: "router-app",
  definition: "what serves the routes its own table declares",
  pluralSlug: "router-apps",
  parts: [
    "code-file-property/addon-bundle-image",
    "code-file-property/app-layout",
    "file-property/compile-config",
    "file-property/placeholder-image",
    "code-file-property/root-route",
    "code-file-property/route-table",
    "file-property/router-app-git-ignore",
    "code-file-property/router-config",
    "code-file-property/server",
    "code-file-property/server-entry",
    "code-file-property/sidebar-boot",
    "file-property/site-icon",
    "file-property/test-preload",
    "code-file-property/vite-config",
    "type-declaration/vite-client",
    "build-folder-property/route-types-directory",
    "build-folder-property/declaration-directory",
    "build-folder-property/bundle-directory",
  ],
  extends: ["page-type/workspace-package"],
  properties: [
    { pagePropertySlug: "code-file-property/root-route", required: true, many: false },
    { pagePropertySlug: "code-file-property/route-table", required: true, many: false },
    { pagePropertySlug: "code-file-property/server-entry", required: true, many: false },
    { pagePropertySlug: "code-file-property/router-config", required: true, many: false },
    { pagePropertySlug: "file-property/compile-config", required: false, many: false },
    { pagePropertySlug: "code-file-property/app-layout", required: false, many: false },
    { pagePropertySlug: "code-file-property/vite-config", required: false, many: false },
    { pagePropertySlug: "code-file-property/server", required: false, many: false },
    { pagePropertySlug: "code-file-property/addon-bundle-image", required: false, many: false },
    { pagePropertySlug: "code-file-property/sidebar-boot", required: false, many: false },
    { pagePropertySlug: "file-property/placeholder-image", required: false, many: false },
    { pagePropertySlug: "file-property/site-icon", required: false, many: false },
    {
      pagePropertySlug: "file-property/router-app-git-ignore",
      required: false,
      many: false,
    },
    { pagePropertySlug: "file-property/test-preload", required: false, many: false },
    {
      pagePropertySlug: "build-folder-property/route-types-directory",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "build-folder-property/declaration-directory",
      required: false,
      many: false,
    },
    { pagePropertySlug: "build-folder-property/bundle-directory", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One table names every route a router app serves.",
    },
    {
      invariantKind: "departure",
      statement: "A route is reached by the path the table names rather than by its own file name.",
    },
    {
      invariantKind: "departure",
      statement: "The names the router fixes are beside the package's manifest.",
    },
    {
      invariantKind: "constraint",
      statement: "The tsconfig naming a fixed name gives that name the package's path mappings.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The router bundles to the browser whatever a route module exports beyond its loader and its action.",
    },
    {
      invariantKind: "departure",
      statement: "A route module exports its loader and its action alone.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A request whose method is OPTIONS reaches a route's loader rather than its action.",
    },
  ],
} as const satisfies PageType
