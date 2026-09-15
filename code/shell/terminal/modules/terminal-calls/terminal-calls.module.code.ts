import {
  type Named,
  namingOver,
  pathOf,
} from "akasha/command/modules/walking/command-walking.module.code.ts"
import { git } from "akasha/command/pages/git/git.namespace.ts"
import { gitPush } from "akasha/command/pages/git/push/git-push.command.ts"
import { infrastructure } from "akasha/command/pages/infrastructure/infrastructure.namespace.ts"
import { infrastructureShellInitBash } from "akasha/command/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.ts"
import { measure } from "akasha/command/pages/measure/measure.namespace.ts"
import { measureModelAccount } from "akasha/command/pages/measure/model-account/measure-model-account.namespace.ts"
import { measureModelAccountUsage } from "akasha/command/pages/measure/model-account/usage/measure-model-account-usage.command.ts"
import { modelAccountAdd } from "akasha/command/pages/model-account/add/model-account-add.command.ts"
import { modelAccount } from "akasha/command/pages/model-account/model-account.namespace.ts"
import { seat } from "akasha/command/pages/seat/seat.namespace.ts"
import { seatStart } from "akasha/command/pages/seat/start/seat-start.command.ts"
import { seatSupervisor } from "akasha/command/pages/seat/supervisor/seat-supervisor.namespace.ts"
import { seatSupervisorStop } from "akasha/command/pages/seat/supervisor/stop/seat-supervisor-stop.command.ts"

const LEVELS: readonly Named[] = [
  modelAccount,
  modelAccountAdd,
  git,
  gitPush,
  infrastructure,
  infrastructureShellInitBash,
  measure,
  measureModelAccount,
  measureModelAccountUsage,
  seat,
  seatStart,
  seatSupervisor,
  seatSupervisorStop,
]

const NAMED = namingOver(LEVELS)

function calling(one: Named): string {
  return pathOf(one.slug, NAMED)
}

export const CLAUDE_ACCOUNT_ADD = calling(modelAccountAdd)

export const CLAUDE_USAGE = calling(measureModelAccountUsage)

export const GIT_PUSH = calling(gitPush)

export const SEAT_START = calling(seatStart)

export const SEAT_SUPERVISOR_STOP = calling(seatSupervisorStop)

export const SHELL_INIT = calling(infrastructureShellInitBash)
