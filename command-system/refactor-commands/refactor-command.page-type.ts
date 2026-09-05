import type { PageType } from "@akasha/pages/page-type"
import type { Command } from "../commands/command.page-type.ts"

export type RefactorCommand = Command

export const refactorCommand = {
  id: "01a072c8-f35c-7256-b138-59c7d4c96679",
  pageTypeSlug: "page-type",
  slug: "refactor-command",
  definition: "a command built only from atomic changes in sequence",
  pluralSlug: "refactor-commands",
  extendsSlug: ["page-type/command"],
} as const satisfies PageType
