import {
  LANDING,
  madeIn,
} from "akasha/agents/claude-accounts/modules/making/claude-account-making.module.code.ts"
import { aliasIndexesIn } from "akasha/agents/claude-accounts/modules/reading/claude-account-reading.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { account as accountArgument } from "akasha/commands/arguments/pages/account.argument.ts"
import { alias } from "akasha/commands/arguments/pages/alias.argument.ts"
import { email as emailArgument } from "akasha/commands/arguments/pages/email.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { claudeAccountAdd as page } from "akasha/commands/pages/claude-account/add/claude-account-add.command.ts"
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const ACCOUNT_SHAPE = /^[a-z][a-z0-9-]*$/

const EMAIL_SHAPE = /^\S+@\S+$/

export type Asked = {
  readonly account: string
  readonly email: string
  readonly alias: number | null
}

export function wrongIn(
  account: string,
  email: string,
  slot: number | undefined
): readonly string[] {
  const wrong: string[] = []
  if (!ACCOUNT_SHAPE.test(account)) {
    wrong.push(`\`${account}\` is no account name, which is lower letters, digits and hyphens`)
  }
  if (!EMAIL_SHAPE.test(email)) wrong.push(`\`${email}\` is no address this writes onto one line`)
  if (slot !== undefined && slot < 1) {
    wrong.push(`\`${slot}\` is no alias slot, which is a whole number from one up`)
  }
  return wrong
}

export function slotFrom(held: ReadonlyMap<string, number>, asked: number | null): number | string {
  if (asked === null) {
    let highest = 0
    for (const one of held.values()) if (one > highest) highest = one
    return highest + 1
  }
  for (const [account, one] of held) {
    if (one === asked) return `slot ${asked} is held by \`${account}\`, and a slot is not shared`
  }
  return asked
}

export type Filing = (done: string[], read: Asked, given: Given) => Promise<Answer>

async function filedPage(done: string[], read: Asked, given: Given): Promise<Answer> {
  const held = aliasIndexesIn(given.root)
  if (held.has(read.account)) {
    return mistaking([`a page already exists for \`${read.account}\`, and this writes over none`])
  }
  const slot = slotFrom(held, read.alias)
  if (typeof slot === "string") return mistaking([slot])
  const made = await madeIn(
    given.root,
    { slug: read.account, email: read.email, aliasIndex: slot },
    LANDING,
    readingIn(given.root),
    done
  )
  if (made.kind === "refused") return refused(made.why, DATA)
  return told([
    `${read.account} holds slot ${slot} and is filed at ${made.path}`,
    "run /login in the launching session to sign it in",
  ])
}

export async function filedBy(
  read: Asked,
  given: Given,
  filing: Filing = filedPage
): Promise<Answer> {
  return await answering(async (done) => keeping(done, await filing(done, read, given)))
}

export async function claudeAccountAdd(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [accountArgument, emailArgument, alias])
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const wrong = wrongIn(taken.account, taken.email, taken.alias)
  if (wrong.length > 0) return mistaking(wrong)
  return await filedBy(
    { account: taken.account, email: taken.email, alias: taken.alias ?? null },
    given
  )
}
