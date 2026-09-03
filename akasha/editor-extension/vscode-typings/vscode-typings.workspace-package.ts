import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const vscodeTypings = {
  id: "01a06977-65e4-7fe1-86eb-b5c80ca5d401",
  pageTypeSlug: "workspace-package",
  slug: "vscode-typings",
  definition: "the editor api presented to a typecheck under the package name it resolves",
  manifest: "json",
  partSlugs: ["type-declaration/vscode-typings"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifest name is the whole mechanism, so nothing here is imported by path.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies WorkspacePackage
