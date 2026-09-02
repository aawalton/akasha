import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperLostTreasure = {
  id: "01a06141-8003-755d-8ec8-3764b298f7ef",
  pageTypeSlug: "workspace-package",
  slug: "temper-lost-treasure",
  definition:
    "the buried treasure a map or a survey report points to, drawn where the player must dig",
  manifest: "json",
  partSlugs: [
    "module/lost-treasure-ui-strings",
    "module/lost-treasure-constants",
    "module/lost-treasure-types",
    "module/lost-treasure-logger",
    "module/lost-treasure-debug",
    "module/lost-treasure-utilities",
    "module/lost-treasure-saved-vars",
    "module/lost-treasure-pin-settings",
    "module/lost-treasure-mark-on-using",
    "module/lost-treasure-bag-cache",
    "module/lost-treasure-bug-report",
    "module/lost-treasure-notifications",
    "module/lost-treasure-mining",
    "module/lost-treasure-pins",
    "module/lost-treasure-opened-map",
    "module/lost-treasure-item-cache",
    "module/lost-treasure-settings",
    "module/lost-treasure-global",
    "module/lost-treasure-start",
    "type-declaration/lost-treasure-string-ids",
    "type-declaration/lost-treasure-global-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "departure",
      statement: "The text here is English alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dig site the add-on does not know is gathered from the player rather than shipped.",
    },
  ],
} as const satisfies WorkspacePackage
