import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const agent = {
  id: "01a0535c-f2cf-7d3b-9a3d-826379a0252b",
  pageTypeSlug: "workspace-package",
  slug: "agent",
  definition: "an agent and what puts its work to a model",
  manifest: "json",
  parts: [
    "domain/claude-code",
    "domain/model",
    "module/patch-keeping",
    "page-type/agent",
    "page-type/claude-account",
  ],
} as const satisfies WorkspacePackage
