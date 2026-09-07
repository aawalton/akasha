import type { PageType } from "@akasha/pages/page-type"
import type { WorkspacePackage } from "../workspace-packages/workspace-package.page-type.ts"
import type { AppLayout } from "./properties/app-layout.named-file-property.ts"
import type { CompileConfig } from "./properties/compile-config.named-file-property.ts"
import type { RootRoute } from "./properties/root-route.named-file-property.ts"
import type { RouteTable } from "./properties/route-table.named-file-property.ts"
import type { RouterConfig } from "./properties/router-config.named-file-property.ts"
import type { ServerEntry } from "./properties/server-entry.named-file-property.ts"
import type { ViteConfig } from "./properties/vite-config.named-file-property.ts"

export type RouterApp = WorkspacePackage & {
  rootRoute: RootRoute
  routeTable: RouteTable
  serverEntry: ServerEntry
  routerConfig: RouterConfig
  compileConfig?: CompileConfig
  appLayout?: AppLayout
  viteConfig?: ViteConfig
}

export const routerApp = {
  id: "01a063f3-c2ab-765b-9c87-954f96167da7",
  pageTypeSlug: "page-type",
  slug: "router-app",
  definition: "what serves the routes its own table declares",
  pluralSlug: "router-apps",
  partSlugs: [
    "named-file-property/app-layout",
    "named-file-property/compile-config",
    "named-file-property/root-route",
    "named-file-property/route-table",
    "named-file-property/router-config",
    "named-file-property/server-entry",
    "named-file-property/vite-config",
    "type-declaration/vite-client",
  ],
  extendsSlug: ["page-type/workspace-package"],
  properties: [
    { pagePropertySlug: "named-file-property/root-route", required: true, many: false },
    { pagePropertySlug: "named-file-property/route-table", required: true, many: false },
    { pagePropertySlug: "named-file-property/server-entry", required: true, many: false },
    { pagePropertySlug: "named-file-property/router-config", required: true, many: false },
    { pagePropertySlug: "named-file-property/compile-config", required: false, many: false },
    { pagePropertySlug: "named-file-property/app-layout", required: false, many: false },
    { pagePropertySlug: "named-file-property/vite-config", required: false, many: false },
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
