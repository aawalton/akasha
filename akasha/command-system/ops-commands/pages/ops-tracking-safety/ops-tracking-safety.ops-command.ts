import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingSafety = {
  id: "01a06904-5257-7a6e-8860-ea3c652b9181",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-safety",
  definition:
    "splitting the open session at a new safety level, carrying its title and difficulty over.",
  opsPath: "tracking safety",
  opsEntryFile: "tools/commands/tracking/safety.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
