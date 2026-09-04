import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsSeatResume = {
  id: "01a06904-524a-7396-b361-c22083ff9533",
  pageTypeSlug: "ops-command",
  slug: "ops-seat-resume",
  definition: "a seat put back on its bound session, live or stopped.",
  opsPath: "seat resume",
  opsEntryFile: "seat-system/seat-resume/seat-resume.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
