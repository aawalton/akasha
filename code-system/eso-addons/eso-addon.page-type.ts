import type { PageType } from "@akasha/pages/page-type"
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

export const esoAddon = {
  id: "01a06036-9b77-710a-8ddc-ee7c58591896",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "eso-addon",
  definition: "one thing the game loads out of its AddOns folder",
  pluralSlug: "eso-addons",
  parts: [
    "file-property/addon-manifest",
    "file-property/sibling-manifest",
    "file-property/addon-git-ignore",
    "file-property/bindings",
    "relation-property/bundle-entry",
    "relation-property/eso-interfaces",
    "relation-property/lua-modules",
  ],
  extends: ["page-type/workspace-package"],
  properties: [
    { pageProperty: "file-property/addon-manifest", required: true, many: false },
    { pageProperty: "relation-property/bundle-entry", required: false, many: false },
    { pageProperty: "file-property/bindings", required: false, many: false },
    {
      pageProperty: "relation-property/eso-interfaces",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "relation-property/lua-modules",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "file-property/addon-git-ignore", required: false, many: false },
    { pageProperty: "file-property/sibling-manifest", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An addon states the facts the game reads about that addon in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A seam writes the manifest the game reads from the manifest beside the page.",
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
      statement: "The modules an addon has are compiled from TypeScript to Lua before a build.",
    },
    {
      invariantKind: "departure",
      statement: "One module an addon has is where the transpiler starts the Lua bundle.",
    },
    {
      invariantKind: "departure",
      statement: "Which addons an addon needs loaded first is stated in its manifest.",
    },
    {
      invariantKind: "departure",
      statement: "An addon ships a second addon with a manifest and nothing more.",
    },
    {
      invariantKind: "departure",
      statement:
        "A second addon shipped inside an addon is versioned with the addon shipping that second addon.",
    },
    {
      invariantKind: "constraint",
      statement: "The game reloads an addon only when the whole client reloads.",
    },
  ],
} as const satisfies PageType
