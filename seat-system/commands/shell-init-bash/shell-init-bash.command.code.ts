import { aliasIndexesIn } from "@akasha/agents/claude-account-reading"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import type { AliasEntry } from "../../terminal-init/terminal-bash/terminal-bash.module.code.ts"
import { generateBashInit } from "../../terminal-init/terminal-bash/terminal-bash.module.code.ts"

const NO_ACCOUNT =
  "no claude account page was read, so the set would carry no account launcher at all — " +
  "the shell keeps the definitions it started with rather than losing them silently"

export type Read = { readonly composing: true } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals = argv.map(
    (one) => `\`${one}\` is no word this takes — this takes none and composes one set, for bash`
  )
  return refusals.length > 0 ? { refused: refusals } : { composing: true }
}

export function accountsIn(root: string): readonly AliasEntry[] {
  return [...aliasIndexesIn(root)]
    .map(([account, aliasIndex]) => ({ account, aliasIndex }))
    .sort((a, b) => a.aliasIndex - b.aliasIndex)
}

export function shellInitBash(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    const accounts = accountsIn(given.root)
    if (accounts.length === 0) return { report: [], refusals: [NO_ACCOUNT], code: 2 }
    return { report: generateBashInit(accounts).split("\n"), refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
