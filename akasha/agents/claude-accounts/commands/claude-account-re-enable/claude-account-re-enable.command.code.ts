import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { readingIn } from "@akasha/indexes"
import { valueAt } from "@akasha/pages-system/page-value"
import {
  markedIn,
  subscriptionMarks,
} from "../../modules/marking/claude-account-marking.module.code.ts"

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
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    const said = markedIn(
      given.root,
      read.account,
      subscriptionMarks(null),
      readingIn(given.root),
      (path) => valueAt(path, given.root)
    )
    if (said.kind === "absent") return { report: [], refusals: [said.why], code: 2 }
    if (said.kind === "refused") return { report: [], refusals: [said.why], code: 3 }
    if (said.kind === "unchanged") {
      return {
        report: [`${read.account} was already standing, so nothing was cleared`],
        refusals: [],
        code: 0,
      }
    }
    return {
      report: [`${read.account} stands again, and the picker counts it from the next ask`],
      refusals: [],
      code: 0,
    }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
