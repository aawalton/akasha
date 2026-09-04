import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsPageUnlanded = {
  id: "01a06904-5245-75e7-9c9e-4a20a0a9277e",
  pageTypeSlug: "ops-command",
  slug: "ops-page-unlanded",
  definition:
    "every page written to a repository whose commit has not landed, with the writer that wrote it.",
  opsPath: "page unlanded",
  opsEntryFile:
    "akasha/markdown-pages/markdown-page-unlanded/markdown-page-unlanded.module.code.ts",
} as const satisfies OpsCommand
