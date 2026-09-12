import { pathOf } from "akasha/commands/modules/walking/command-walking.module.code.ts"
import { claudeAccountAdd } from "akasha/commands/pages/claude-account/add/claude-account-add.command.ts"
import { claudeAccount } from "akasha/commands/pages/claude-account/claude-account.namespace.ts"
import { git } from "akasha/commands/pages/git/git.namespace.ts"
import { gitPush } from "akasha/commands/pages/git/push/git-push.command.ts"
import { infrastructure } from "akasha/commands/pages/infrastructure/infrastructure.namespace.ts"
import { infrastructureShellInitBash } from "akasha/commands/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.ts"
import { measureClaudeAccount } from "akasha/commands/pages/measure/claude-account/measure-claude-account.namespace.ts"
import { measureClaudeAccountUsage } from "akasha/commands/pages/measure/claude-account/usage/measure-claude-account-usage.command.ts"
import { measure } from "akasha/commands/pages/measure/measure.namespace.ts"
import { seat } from "akasha/commands/pages/seat/seat.namespace.ts"
import { seatStart } from "akasha/commands/pages/seat/start/seat-start.command.ts"
import { seatSupervisor } from "akasha/commands/pages/seat/supervisor/seat-supervisor.namespace.ts"
import { seatSupervisorStop } from "akasha/commands/pages/seat/supervisor/stop/seat-supervisor-stop.command.ts"

type Level = { readonly slug: string; readonly name: string }

const LEVELS: readonly Level[] = [
  claudeAccount,
  claudeAccountAdd,
  git,
  gitPush,
  infrastructure,
  infrastructureShellInitBash,
  measure,
  measureClaudeAccount,
  measureClaudeAccountUsage,
  seat,
  seatStart,
  seatSupervisor,
  seatSupervisorStop,
]

const NAMED: ReadonlyMap<string, string> = new Map(LEVELS.map((one) => [one.slug, one.name]))

export function calling(one: Level): string {
  return pathOf(one.slug, (slug) => NAMED.get(slug) ?? null)
}

export const CLAUDE_ACCOUNT_ADD = calling(claudeAccountAdd)

export const CLAUDE_USAGE = calling(measureClaudeAccountUsage)

export const GIT_PUSH = calling(gitPush)

export const SEAT_START = calling(seatStart)

export const SEAT_SUPERVISOR_STOP = calling(seatSupervisorStop)

export const SHELL_INIT = calling(infrastructureShellInitBash)
