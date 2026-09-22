import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAddon = {
  id: "01a06036-9b77-710a-8ddc-ee7c58591896",
  type: "page-type/page-type",
  slug: "temper-addon",
  definition: "one thing the game loads out of its AddOns folder",
  parts: [
    "file-property/addon-git-ignore",
    "file-property/addon-manifest",
    "file-property/bindings",
    "file-property/sibling-manifest",
    "named-extension-property/addon-dds-file",
    "named-folder-property/addon-art-folder",
    "named-folder-property/addon-bin-folder",
    "named-folder-property/addon-dds-folder",
    "named-folder-property/addon-icons-folder",
    "named-folder-property/addon-image-folder",
    "relation-property/bundle-entry",
    "relation-property/eso-interfaces",
    "relation-property/lua-modules",
    "domain/temper-addon-type",
    "domain/temper-addon-build",
    "domain/temper-addon-community",
    "temper-addon/temper-addon-catalog",
    "temper-addon/temper-addon-characters",
    "temper-addon/temper-addon-combat",
    "temper-addon/temper-addon-hud",
    "temper-addon/temper-addon-items",
    "temper-addon/temper-addon-world",
    "boolean-property/addon-library",
    "temper-addon/temper-lib-addon-menu",
    "temper-addon/temper-lib-custom-menu",
    "temper-addon/temper-lib-debug-logger",
    "temper-addon/temper-lib-gps",
    "temper-addon/temper-lib-main-menu",
    "temper-addon/temper-lib-map-ping",
    "temper-addon/temper-lib-map-pins",
    "temper-addon/temper-lib-scrollable-menu",
    "domain/temper-addon-shared",
  ],
  extends: ["page-type/service"],
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
    {
      pageProperty: "named-folder-property/addon-icons-folder",
      required: false,
      many: false,
    },
    { pageProperty: "named-folder-property/addon-dds-folder", required: false, many: false },
    { pageProperty: "named-folder-property/addon-art-folder", required: false, many: false },
    {
      pageProperty: "named-folder-property/addon-image-folder",
      required: false,
      many: false,
    },
    { pageProperty: "named-folder-property/addon-bin-folder", required: false, many: false },
    { pageProperty: "named-extension-property/addon-dds-file", required: false, many: false },
    { pageProperty: "boolean-property/addon-library", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An addon states the facts the game reads about that addon in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seam writes the manifest the game reads from the manifest beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon names every Lua module the game loads for that addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon names every XML document the game loads for that addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The modules an addon has are compiled from TypeScript to Lua before a build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One module an addon has is where the transpiler starts the Lua bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which addons an addon needs loaded first is stated in its manifest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon ships a second addon with a manifest and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A second addon shipped inside an addon is versioned with the addon shipping that second addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon keeps the textures the game draws in a folder the page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture folder is named after the folder the upstream addon already used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An addon whose upstream kept no texture folder keeps its textures beside the page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game reloads an addon only when the whole client reloads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Being one of Temper's own libraries is a property of an addon rather than a page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Temper is the one addon every other Temper addon depends on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A library Temper rewrote is imported into a bundle rather than loaded as an addon of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A library name a foreign addon depends on is kept as an addon with a manifest and no code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How much a player's saved variables weigh decides how many addons Temper ships.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global declaration is how a bundle reaches code another bundle ships.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Code in one bundle reaches the rest of that bundle by import rather than through a global.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A library folded into one bundle loses the global that library set.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A binding reaches its addon through a global, because XML imports nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global a binding names is spelled with the addon declaring that global.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
