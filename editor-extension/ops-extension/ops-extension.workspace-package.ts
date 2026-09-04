import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const opsExtension = {
  id: "01a0680b-7175-7002-8feb-84b86f70fc2f",
  pageTypeSlug: "workspace-package",
  slug: "ops-extension",
  definition: "the extension this repository gives the editor",
  manifest: "json",
  partSlugs: ["module/extension-entry"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifest names the extension `ops` under the publisher `vscode`.",
    },
    {
      invariantKind: "departure",
      statement: "The editor resolves the entry point rather than TypeScript.",
    },
    {
      invariantKind: "departure",
      statement: "A panel, a command, a menu and a color are stated in the manifest.",
    },
    {
      invariantKind: "departure",
      statement: "The editor reads the manifest before any code here is loaded.",
    },
    {
      invariantKind: "constraint",
      statement: "The editor fork reaches this folder by a symlink at `extensions/ops`.",
    },
    {
      invariantKind: "departure",
      statement: "What a panel does stands in `editor-extension` rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "The extension is identified as `vscode.ops` wherever the editor keeps its state.",
    },
  ],
} as const satisfies WorkspacePackage
