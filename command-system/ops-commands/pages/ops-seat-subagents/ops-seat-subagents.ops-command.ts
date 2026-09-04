import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsSeatSubagents = {
  id: "01a06904-524c-74cb-b02b-3665b07aea9a",
  pageTypeSlug: "ops-command",
  slug: "ops-seat-subagents",
  definition: "every subagent kind that stands, as the JSON map `--agents` takes.",
  opsPath: "seat subagents",
  opsEntryFile: "seat-system/compose-subagents/compose-subagents.module.code.ts",
} as const satisfies OpsCommand
