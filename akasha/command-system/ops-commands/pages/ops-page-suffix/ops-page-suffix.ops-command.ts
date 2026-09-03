import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsPageSuffix = {
  id: "01a06904-5244-7192-bb48-860c7d82ecdc",
  pageTypeSlug: "ops-command",
  slug: "ops-page-suffix",
  definition:
    "every file of one page type named for that page type, and the page type filed by that name.",
  opsPath: "page suffix",
  opsEntryFile: "tools/commands/page/suffix.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
