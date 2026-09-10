import type { AstUnusedConfig } from "akasha/code-system/audit-ast-unused/ast-unused-configs/ast-unused-config.page-type.types.ts"

export const everyWorkspace = {
  id: "01a08198-ecd4-76f3-b8f9-80999a4e0554",
  pageTypeSlug: "ast-unused-config",
  type: "ast-unused-config",
  slug: "every-workspace",
  definition: "the root of the ast-unused curation",
  parts: [
    "ast-unused-config/alanwalton",
    "ast-unused-config/archive-of-worlds",
    "ast-unused-config/audhdalan",
    "ast-unused-config/infra",
    "ast-unused-config/shared",
    "ast-unused-config/smilingjenny",
    "ast-unused-config/temper",
  ],
  curation: "json",
} as const satisfies AstUnusedConfig
