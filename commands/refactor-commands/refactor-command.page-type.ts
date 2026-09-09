import type { PageType } from "@akasha/pages/page-type"
import type { Command } from "../command.page-type.ts"

export type RefactorCommand = Command

export const refactorCommand = {
  id: "01a072c8-f35c-7256-b138-59c7d4c96679",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "refactor-command",
  definition: "a command that runs one refactor change",
  pluralSlug: "refactor-commands",
  extends: ["page-type/command"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refactor command runs one refactor change and does nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "Most refactor changes are run by no command.",
    },
  ],
} as const satisfies PageType
