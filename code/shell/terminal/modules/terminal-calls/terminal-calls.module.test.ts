import { expect, test } from "bun:test"
import {
  CLAUDE_ACCOUNT_ADD,
  CLAUDE_USAGE,
  GIT_PUSH,
  SEAT_START,
  SEAT_SUPERVISOR_STOP,
  SHELL_INIT,
} from "akasha/code/shell/terminal/modules/terminal-calls/terminal-calls.module.code.ts"
import { modelAccountAdd } from "akasha/command/pages/model/account/add/model-account-add.command.ts"
import { modelAccount } from "akasha/command/pages/model/account/model-account.namespace.ts"
import { git } from "akasha/command/pages/git/git.namespace.ts"
import { gitPush } from "akasha/command/pages/git/push/git-push.command.ts"
import { infrastructure } from "akasha/command/pages/infrastructure/infrastructure.namespace.ts"
import { infrastructureShellInitBash } from "akasha/command/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.ts"
import { measureModelAccount } from "akasha/command/pages/measure/model/account/measure-model-account.namespace.ts"
import { measureModelAccountUsage } from "akasha/command/pages/measure/model/account/usage/measure-model-account-usage.command.ts"
import { measure } from "akasha/command/pages/measure/measure.namespace.ts"
import { seat } from "akasha/command/pages/seat/seat.namespace.ts"
import { seatStart } from "akasha/command/pages/seat/start/seat-start.command.ts"
import { seatSupervisor } from "akasha/command/pages/seat/supervisor/seat-supervisor.namespace.ts"
import { seatSupervisorStop } from "akasha/command/pages/seat/supervisor/stop/seat-supervisor-stop.command.ts"

const EVERY: readonly (readonly [string, readonly { readonly name: string }[]])[] = [
  [CLAUDE_ACCOUNT_ADD, [modelAccount, modelAccountAdd]],
  [CLAUDE_USAGE, [measure, measureModelAccount, measureModelAccountUsage]],
  [GIT_PUSH, [git, gitPush]],
  [SEAT_START, [seat, seatStart]],
  [SEAT_SUPERVISOR_STOP, [seat, seatSupervisor, seatSupervisorStop]],
  [SHELL_INIT, [infrastructure, infrastructureShellInitBash]],
]

test("a call is the levels' own names with a space between each", () => {
  for (const [said, levels] of EVERY) {
    expect(said).toBe(levels.map((one) => one.name).join(" "))
  }
})

test("a call has one word for each level it reaches", () => {
  for (const [said, levels] of EVERY) {
    expect(said.split(" ")).toHaveLength(levels.length)
  }
})

test("a level whose own name carries a hyphen keeps that hyphen", () => {
  expect(CLAUDE_ACCOUNT_ADD.split(" ")[0]).toBe(modelAccount.name)
  expect(modelAccount.name).toContain("-")
})

test("no call carries the slug that names its command", () => {
  for (const [said] of EVERY) {
    expect(said).not.toContain("akasha")
  }
  expect(CLAUDE_USAGE).not.toBe(measureModelAccountUsage.slug)
})
