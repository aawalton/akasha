import { expect, test } from "bun:test"
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
import {
  CLAUDE_ACCOUNT_ADD,
  CLAUDE_USAGE,
  GIT_PUSH,
  SEAT_START,
  SEAT_SUPERVISOR_STOP,
  SHELL_INIT,
} from "akasha/shell/terminal/terminal-calls/terminal-calls.module.code.ts"

const EVERY: readonly (readonly [string, readonly { readonly name: string }[]])[] = [
  [CLAUDE_ACCOUNT_ADD, [claudeAccount, claudeAccountAdd]],
  [CLAUDE_USAGE, [measure, measureClaudeAccount, measureClaudeAccountUsage]],
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
  expect(CLAUDE_ACCOUNT_ADD.split(" ")[0]).toBe(claudeAccount.name)
  expect(claudeAccount.name).toContain("-")
})

test("no call carries the slug that names its command", () => {
  for (const [said] of EVERY) {
    expect(said).not.toContain("akasha")
  }
  expect(CLAUDE_USAGE).not.toBe(measureClaudeAccountUsage.slug)
})
