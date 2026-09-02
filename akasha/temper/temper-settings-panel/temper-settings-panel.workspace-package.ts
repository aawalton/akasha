import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperSettingsPanel = {
  id: "01a06053-3636-7e00-b329-e1ac77ae851e",
  pageTypeSlug: "workspace-package",
  slug: "temper-settings-panel",
  definition: "the settings an add-on shows in the game's own add-on menu",
  manifest: "json",
  partSlugs: ["module/build-lookup", "module/dropdown", "module/header", "module/register-panel"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A control here is a plain record the add-on menu library reads.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a control.",
    },
    {
      invariantKind: "departure",
      statement: "The add-on menu library is handed in rather than reached as a global.",
    },
    {
      invariantKind: "departure",
      statement: "A setting is read back the way the setting was stated.",
    },
  ],
} as const satisfies WorkspacePackage
