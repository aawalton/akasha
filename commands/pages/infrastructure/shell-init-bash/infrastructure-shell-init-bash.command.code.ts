import { aliasIndexesIn } from "akasha/agents/claude-accounts/modules/reading/claude-account-reading.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { infrastructureShellInitBash as page } from "akasha/commands/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.ts"
import type { AliasEntry } from "akasha/shell/terminal/terminal-bash/terminal-bash.module.code.ts"
import { generateBashInit } from "akasha/shell/terminal/terminal-bash/terminal-bash.module.code.ts"

const NO_ACCOUNT =
  "no claude account page was read, so the set would carry no account launcher at all — " +
  "the shell keeps the definitions it started with rather than losing them silently"

export function accountsIn(root: string): readonly AliasEntry[] {
  return [...aliasIndexesIn(root)]
    .map(([account, aliasIndex]) => ({ account, aliasIndex }))
    .sort((a, b) => a.aliasIndex - b.aliasIndex)
}

export function infrastructureShellInitBash(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return refusedBy(read.refused)
  try {
    const accounts = accountsIn(given.root)
    if (accounts.length === 0) return refusedBy([NO_ACCOUNT], DATA)
    return told(generateBashInit(accounts).split("\n"))
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
