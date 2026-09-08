import type { AstUnusedConfig } from "@akasha/code/ast-unused-config"

export const everyWorkspace = {
  id: "01a08198-ecd4-76f3-b8f9-80999a4e0554",
  pageTypeSlug: "ast-unused-config",
  slug: "every-workspace",
  definition: "the root of the ast-unused curation",
  partSlugs: ["ast-unused-config/archive-of-worlds"],
  curation: "json",
} as const satisfies AstUnusedConfig
