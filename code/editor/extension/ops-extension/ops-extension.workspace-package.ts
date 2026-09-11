import type { WorkspacePackage } from "akasha/code/workspace-packages/workspace-package.page-type.types.ts"

export const opsExtension = {
  id: "01a0680b-7175-7002-8feb-84b86f70fc2f",
  pageTypeSlug: "workspace-package",
  type: "workspace-package",
  slug: "ops-extension",
  definition: "the extension this repository gives the editor",
  parts: ["module/extension-entry"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The root manifest names this entry, so no manifest sits here.",
    },
    {
      invariantKind: "departure",
      statement: "The editor reaches the repository root by a link and reads the root manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A panel and a command and a menu and a color are stated in the root manifest.",
    },
    {
      invariantKind: "departure",
      statement: "The editor reads the manifest before any code here is loaded.",
    },
    {
      invariantKind: "constraint",
      statement: "The extension host strips the types, so the entry reaches only erasable syntax.",
    },
    {
      invariantKind: "departure",
      statement: "A panel's code sits in the `extension` domain rather than here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The extension is identified as `vscode.akasha` wherever the editor keeps its state.",
    },
  ],
} as const satisfies WorkspacePackage
