import { aliasIndexesIn } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import type { AliasEntry } from "akasha/code/shell/terminal/modules/terminal-bash/terminal-bash.module.code.ts"
import { generateBashInit } from "akasha/code/shell/terminal/modules/terminal-bash/terminal-bash.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { infrastructureShellInitBash as page } from "akasha/command/pages/infrastructure/shell-init-bash/infrastructure-shell-init-bash.command.ts"

const NO_ACCOUNT =
  "no model account page was read, so the set would carry no account launcher at all — " +
  "the shell keeps the definitions it started with rather than losing them silently"

function accountsIn(root: string): readonly AliasEntry[] {
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
