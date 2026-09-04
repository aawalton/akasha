import type { PageType } from "@akasha/pages-system/page-type"
import type { WorkspacePackage } from "../workspace-packages/workspace-package.page-type.ts"
import type { RootRoute } from "./properties/root-route.named-file-property.ts"
import type { RouteTable } from "./properties/route-table.named-file-property.ts"
import type { RouterConfig } from "./properties/router-config.named-file-property.ts"
import type { ServerEntry } from "./properties/server-entry.named-file-property.ts"

export type RouterApp = WorkspacePackage & {
  rootRoute: RootRoute
  routeTable: RouteTable
  serverEntry: ServerEntry
  routerConfig: RouterConfig
}

export const routerApp = {
  id: "01a063f3-c2ab-765b-9c87-954f96167da7",
  pageTypeSlug: "page-type",
  slug: "router-app",
  definition: "what serves the routes its own table declares",
  pluralSlug: "router-apps",
  partSlugs: [
    "named-file-property/root-route",
    "named-file-property/route-table",
    "named-file-property/router-config",
    "named-file-property/server-entry",
    "type-declaration/vite-client",
  ],
  extendsSlug: "page-type/workspace-package",
  properties: [
    { pagePropertySlug: "root-route", required: true, many: false },
    { pagePropertySlug: "route-table", required: true, many: false },
    { pagePropertySlug: "server-entry", required: true, many: false },
    { pagePropertySlug: "router-config", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One table names every route a router app serves.",
    },
    {
      invariantKind: "departure",
      statement: "A route is reached by what the table names rather than by its own file name.",
    },
    {
      invariantKind: "departure",
      statement: "The names the router fixes are beside the package's manifest.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The tsconfig naming a fixed name is what gives that name the package's path mappings.",
    },
  ],
} as const satisfies PageType
