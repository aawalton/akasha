import type { AstUnusedConfig } from "akasha/code-system/audit-ast-unused/ast-unused-configs/ast-unused-config.page-type.types.ts"

export const shared = {
  id: "01a0819d-481f-74fe-9c4f-42aa4013ac8e",
  pageTypeSlug: "ast-unused-config",
  type: "ast-unused-config",
  slug: "shared",
  definition: "the ast-unused curation part covering the workspaces every app draws on",
  workspaces: "json",
} as const satisfies AstUnusedConfig
