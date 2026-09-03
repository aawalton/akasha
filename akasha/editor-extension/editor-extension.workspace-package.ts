import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const editorExtension = {
  id: "01a063f4-6690-7556-b094-e83b2ecfe46d",
  pageTypeSlug: "workspace-package",
  slug: "editor-extension",
  definition: "what the editor draws of the system it sits in",
  manifest: "json",
  partSlugs: [
    "module/command-server-client",
    "module/work-initiatives",
    "module/panel-domains",
    "module/terminal-marks",
    "module/domain-tree-ids",
    "module/page-tree-ids",
    "module/work-tree-ids",
    "module/status-bar-theme",
    "module/seat-mode",
    "module/agent-tree-ids",
    "module/seat-page",
    "module/palette",
    "module/tree-filter",
    "module/editor-group",
    "module/window-identity",
    "module/settled-refresh",
    "module/activation",
    "module/group-stoplights",
    "module/terminal-lookup",
    "module/harness-call",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The editor loads the extension's TypeScript.",
    },
    {
      invariantKind: "departure",
      statement: "A feature that fails to start leaves the others running.",
    },
    {
      invariantKind: "departure",
      statement: "A panel finds its pages through the index rather than by walking the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index named is opened for a value the index does not file.",
    },
    {
      invariantKind: "departure",
      statement: "A panel row that represents a page names that page.",
    },
  ],
} as const satisfies WorkspacePackage
