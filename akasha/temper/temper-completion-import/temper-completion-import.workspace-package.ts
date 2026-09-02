import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCompletionImport = {
  id: "01a060d7-c8cc-7e3d-bff7-b5db10d7b35f",
  pageTypeSlug: "workspace-package",
  slug: "temper-completion-import",
  definition: "the addon's saved variables read back as what a player has completed",
  manifest: "json",
  partSlugs: ["module/completion-input-schema", "module/completion-saved-variables-parser"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the addon wrote badly falls away rather than failing the whole file.",
    },
    {
      invariantKind: "departure",
      statement: "A record read here keeps every key the reading does not name.",
    },
    {
      invariantKind: "departure",
      statement: "Which companion a saved definition id names is asked of the caller.",
    },
    {
      invariantKind: "absence",
      statement: "No page is written here.",
    },
  ],
} as const satisfies WorkspacePackage
