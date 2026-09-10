import type { PageType } from "@akasha/pages/page-type"

export const routerApp = {
  id: "01a063f3-c2ab-765b-9c87-954f96167da7",
  pageTypeSlug: "page-type",
  type: "page-type",
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
    { pageProperty: "code-file-property/root-route", required: true, many: false },
    { pageProperty: "code-file-property/route-table", required: true, many: false },
    { pageProperty: "code-file-property/server-entry", required: true, many: false },
    { pageProperty: "code-file-property/router-config", required: true, many: false },
    { pageProperty: "file-property/compile-config", required: false, many: false },
    { pageProperty: "code-file-property/app-layout", required: false, many: false },
    { pageProperty: "code-file-property/vite-config", required: false, many: false },
    { pageProperty: "code-file-property/server", required: false, many: false },
    { pageProperty: "code-file-property/addon-bundle-image", required: false, many: false },
    { pageProperty: "code-file-property/sidebar-boot", required: false, many: false },
    { pageProperty: "file-property/placeholder-image", required: false, many: false },
    { pageProperty: "file-property/site-icon", required: false, many: false },
    {
      pageProperty: "file-property/router-app-git-ignore",
      required: false,
      many: false,
    },
    { pageProperty: "file-property/test-preload", required: false, many: false },
    {
      pageProperty: "build-folder-property/route-types-directory",
      required: false,
      many: false,
    },
    {
      pageProperty: "build-folder-property/declaration-directory",
      required: false,
      many: false,
    },
    { pageProperty: "build-folder-property/bundle-directory", required: false, many: false },
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
  types: "ts",
} as const satisfies PageType
