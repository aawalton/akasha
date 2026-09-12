import { accountsAtIn } from "akasha/agents/claude-accounts/modules/making/claude-account-making.module.code.ts"
import { aliasIndexesIn } from "akasha/agents/claude-accounts/modules/reading/claude-account-reading.module.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { importedFrom } from "akasha/pages/body/page-body.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt, typeSlugOf } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const PAGE_TYPE = "page-type"

const TYPES = "types"

const HOLDS = "ts"

const PUT = "change-mechanical-file/add-file"

const EMAIL = "--email"

const ALIAS = "--alias"

const ACCOUNT_SHAPE = /^[a-z][a-z0-9-]*$/

const EMAIL_SHAPE = /^\S+@\S+$/

export type Asked = {
  readonly account: string
  readonly email: string
  readonly alias: number | null
}

export type Read = Asked | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let account: string | null = null
  let email: string | null = null
  let alias: number | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (one === EMAIL || one === ALIAS) {
      const said = argv[at + 1]
      at += 1
      if (said === undefined) {
        refusals.push(`\`${one}\` was said with nothing after it`)
        continue
      }
      if (one === EMAIL) email = said
      else {
        const many = Number(said)
        if (!Number.isInteger(many) || many < 1) {
          refusals.push(`\`${said}\` is no alias slot, which is a whole number from one up`)
        } else alias = many
      }
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(`\`${one}\` is no word this takes`)
      continue
    }
    if (account !== null) {
      refusals.push("this files one account and no more")
      continue
    }
    account = one
  }
  if (account === null) refusals.push("no account was named, and this files one account by name")
  else if (!ACCOUNT_SHAPE.test(account)) {
    refusals.push(`\`${account}\` is no account name, which is lower letters, digits and hyphens`)
  }
  if (email === null)
    refusals.push(`${EMAIL} is not said, and an account states the address it signs in as`)
  else if (!EMAIL_SHAPE.test(email))
    refusals.push(`\`${email}\` is no address this writes onto one line`)
  if (refusals.length > 0) return { refused: refusals }
  return { account: account as string, email: email as string, alias }
}

export function pageTextFor(
  account: string,
  email: string,
  aliasIndex: number,
  id: string,
  pageTypeSlug: string,
  importFrom: string
): string {
  return [
    `import type { ClaudeAccount } from "${importFrom}"`,
    ``,
    `export const ${exportedAs(account)} = {`,
    `  id: "${id}",`,
    `  type: "${pageTypeSlug}",`,
    `  slug: "${account}",`,
    `  email: "${email}",`,
    `  aliasIndex: ${aliasIndex},`,
    `} as const satisfies ClaudeAccount`,
    ``,
  ].join("\n")
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
  const pageType = typeSlugOf(given.root, ACCOUNT_TYPE)
  const typeAt = listedAt(given.root, PAGE_TYPE, pageType)[0]?.path
  const typesAt = typeAt === undefined ? null : besideAt(typeAt, TYPES, HOLDS)
  if (typesAt === null) {
    const why = `no page type page is filed under \`${pageType}\`, so a page names no type`
    return refused(why, DATA)
  }
  const at = `${accountsAtIn(given.root)}/${read.account}/${read.account}.${pageType}.ts`
  const body = pageTextFor(
    read.account,
    read.email,
    slot,
    Bun.randomUUIDv7(),
    pageType,
    importedFrom(typesAt)
  )
  const landed = await runMechanicalChange(
    given.root,
    [{ at: PUT, given: { at, body } }],
    `akasha: file a page for the claude account ${read.account}`,
    null,
    { done }
  )
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refusedBy(wrong, DATA)
  return told([
    `${read.account} holds slot ${slot} and is filed at ${at}`,
    "run /login in the launching session to sign it in",
  ])
}

export async function filedBy(
  read: Asked,
  given: Given,
  filing: Filing = filedPage
): Promise<Answer> {
  return await answering(async (done) => await filing(done, read, given))
}

export async function claudeAccountAdd(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return mistaking(read.refused)
  return await filedBy(read, given)
}
