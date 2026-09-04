import type { PageType } from "@akasha/pages-system/page-type"
import type { WorkspacePackage } from "../workspace-packages/workspace-package.page-type.ts"
import type { AddonGitIgnore } from "./properties/addon-git-ignore.named-file-property.ts"
import type { AddonManifest } from "./properties/addon-manifest.file-property.ts"
import type { Bindings } from "./properties/bindings.named-file-property.ts"
import type { BundleEntrySlug } from "./properties/bundle-entry-slug.relation-property.ts"
import type { EsoInterfaceSlugs } from "./properties/eso-interface-slugs.relation-property.ts"
import type { LuaModuleSlugs } from "./properties/lua-module-slugs.relation-property.ts"
import type { SiblingManifest } from "./properties/sibling-manifest.file-property.ts"

export type EsoAddon = WorkspacePackage & {
  addonManifest: AddonManifest
  bundleEntrySlug?: BundleEntrySlug
  bindings?: Bindings
  interfaceSlugs?: EsoInterfaceSlugs
  luaModuleSlugs?: LuaModuleSlugs
  gitIgnore?: AddonGitIgnore
  siblingManifest?: SiblingManifest
}

export const esoAddon = {
  id: "01a06036-9b77-710a-8ddc-ee7c58591896",
  pageTypeSlug: "page-type",
  slug: "eso-addon",
  definition: "one thing the game loads out of its AddOns folder",
  pluralSlug: "eso-addons",
  partSlugs: [
    "file-property/addon-manifest",
    "file-property/sibling-manifest",
    "named-file-property/addon-git-ignore",
    "named-file-property/bindings",
    "relation-property/bundle-entry-slug",
    "relation-property/eso-interface-slugs",
    "relation-property/lua-module-slugs",
  ],
  extendsSlug: ["page-type/workspace-package"],
  properties: [
    { pagePropertySlug: "addon-manifest", required: true, many: false },
    { pagePropertySlug: "bundle-entry-slug", required: false, many: false },
    { pagePropertySlug: "bindings", required: false, many: false },
    { pagePropertySlug: "eso-interface-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "lua-module-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "addon-git-ignore", required: false, many: false },
    { pagePropertySlug: "sibling-manifest", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon states what the game reads about that addon in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A seam writes the manifest the game reads from the one beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "An addon names every Lua module the game loads for that addon.",
    },
    {
      invariantKind: "departure",
      statement: "An addon names every XML document the game loads for that addon.",
    },
    {
      invariantKind: "departure",
      statement: "The modules an addon holds are compiled from TypeScript to Lua before a build.",
    },
    {
      invariantKind: "departure",
      statement: "One module an addon holds is where the transpiler starts the Lua bundle.",
    },
    {
      invariantKind: "departure",
      statement: "Which addons an addon needs loaded first is stated in its manifest.",
    },
    {
      invariantKind: "departure",
      statement: "An addon ships a second addon holding a manifest and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A second addon shipped inside one is versioned with the addon shipping it.",
    },
    {
      invariantKind: "constraint",
      statement: "The game reloads an addon only when the whole client reloads.",
    },
  ],
} as const satisfies PageType
