import {
  claudeNewAccountFn,
  supervisorFn,
} from "../terminal-account-launchers/terminal-account-launchers.module.code.ts"
import {
  terminalEndedFnLines,
  terminalEndedTrapLines,
} from "../terminal-ended/terminal-ended.module.code.ts"
import { AKASHA } from "../terminal-entry-points/terminal-entry-points.module.code.ts"
import {
  implName,
  launcher,
  reloadFnLines,
} from "../terminal-reload/terminal-reload.module.code.ts"
import {
  seatLiveFnLines,
  seatNewFn,
  seatResumeFn,
  tmuxLaunchFnLines,
} from "../terminal-seat-launchers/terminal-seat-launchers.module.code.ts"

export type AliasEntry = {
  readonly account: string
  readonly aliasIndex: number
}

function claudeUsageFn(): string {
  return [`${implName("cu")}() {`, `  ${AKASHA} measure claude-accounts "$@"`, "}"].join("\n")
}

function aliases(): string {
  return [
    "# aliases - shell",
    "alias s.='source ~/.bashrc'",
    "",
    "# aliases - git",
    "alias gs='git status'",
    "alias gc='git commit -m'",
    `alias gca='git add . && git commit -m'`,
    `alias gcc='git add . && git commit -m "checkpoint"'`,
    "alias gp='git push'",
    "alias gl='git pull'",
    "alias gg='git log'",
    "alias gcb='git checkout -b'",
  ].join("\n")
}

export function inAliasOrder(accounts: readonly AliasEntry[]): readonly AliasEntry[] {
  return [...accounts].sort((a, b) => a.aliasIndex - b.aliasIndex)
}

function functions(accounts: readonly AliasEntry[]): string {
  const blocks: string[] = []

  blocks.push(
    "# the bounded reload every launcher runs before dispatching",
    reloadFnLines().join("\n")
  )

  blocks.push(
    "",
    "# cu - claude usage, read straight off the account pages",
    launcher("cu", claudeUsageFn())
  )

  blocks.push("", "# c<N> - reauth: claude on one account, in this terminal, seating nothing")
  for (const { account, aliasIndex } of inAliasOrder(accounts)) {
    const name = `c${String(aliasIndex)}`
    blocks.push("", launcher(name, supervisorFn(name, ` -a ${account}`)))
  }

  blocks.push(
    "",
    "# cna - claude new account (prompt + create page + bootstrap /login)",
    launcher("cna", claudeNewAccountFn("cna"))
  )

  blocks.push(
    "",
    "# whether a seat's tmux session holds a pane that is still alive",
    seatLiveFnLines().join("\n"),
    "",
    "# the shared tmux launch step every seat comes up under",
    tmuxLaunchFnLines().join("\n"),
    "",
    "# sn - seat new: a fresh seat under tmux and this repo's supervisor, attached",
    launcher("sn", seatNewFn("sn")),
    "",
    "# sr - seat resume: reattach, or resume a seat under tmux, attached",
    launcher("sr", seatResumeFn("sr"))
  )

  blocks.push(
    "",
    "# how an editor terminal's shell ended, left beside that terminal's own page",
    terminalEndedFnLines().join("\n"),
    "",
    terminalEndedTrapLines().join("\n")
  )

  return blocks.join("\n")
}

export function functionNames(accounts: readonly AliasEntry[]): readonly string[] {
  return [
    "cu",
    ...inAliasOrder(accounts).map((one) => `c${String(one.aliasIndex)}`),
    "cna",
    "sn",
    "sr",
  ]
}

function preamble(accounts: readonly AliasEntry[]): string {
  return `# clear stale aliases that are now functions\nunalias ${functionNames(accounts).join(" ")} 2>/dev/null`
}

export function generateBashInit(accounts: readonly AliasEntry[]): string {
  return `${preamble(accounts)}\n\n${aliases()}\n\n${functions(accounts)}`
}
