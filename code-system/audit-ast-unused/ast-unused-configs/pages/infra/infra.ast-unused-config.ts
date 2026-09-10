import type { AstUnusedConfig } from "akasha/code-system/audit-ast-unused/ast-unused-configs/ast-unused-config.page-type.types.ts"

export const infra = {
  id: "01a0819c-1b62-7187-ad59-ce58d41783af",
  pageTypeSlug: "ast-unused-config",
  type: "ast-unused-config",
  slug: "infra",
  definition: "the ast-unused curation part covering the infra workspaces",
  workspaces: "json",
} as const satisfies AstUnusedConfig
