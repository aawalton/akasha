import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeRemoteControlRegistrationCredential = {
  id: "01a08866-f117-71ad-a4ee-7c213a9155b8",
  type: "page-type/domain",
  slug: "claude-code-remote-control-registration-credential",
  definition: "a registration account's credential in Claude Code's credential file",
  parts: ["module/account-terminal", "module/oauth-health-lines", "module/supervisor-credentials"],
  createdAt: "2026-09-09T23:00:42.903Z",
  updatedAt: "2026-09-22T19:42:38.000Z",
} as const satisfies Domain
