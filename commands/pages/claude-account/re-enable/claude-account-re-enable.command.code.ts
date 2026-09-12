import {
  markedIn,
  subscriptionMarks,
} from "akasha/agents/claude-accounts/modules/marking/claude-account-marking.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"

const TAKES_ONE = "this takes one account and no more, named as its page is named"

const TAKES_AN_ACCOUNT =
  "no account was named, and this puts back one account named as its page is named"

export type Read = { readonly account: string } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  if (argv.length === 0) return { refused: [TAKES_AN_ACCOUNT] }
  if (argv.length > 1) return { refused: [TAKES_ONE] }
  const account = argv[0] ?? ""
  return account === "" ? { refused: [TAKES_AN_ACCOUNT] } : { account }
}

export function claudeAccountReEnable(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return mistaking(read.refused)
  try {
    const said = markedIn(
      given.root,
      read.account,
      subscriptionMarks(null),
      readingIn(given.root),
      (path) => valueAt(path, given.root)
    )
    if (said.kind === "absent") return refusedBy([said.why], DATA)
    if (said.kind === "refused") return refusedBy([said.why], OPERATIONAL)
    if (said.kind === "unchanged") {
      return told([`${read.account} was already standing, so nothing was cleared`])
    }
    return told([`${read.account} stands again, and the picker counts it from the next ask`])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
