import { landedMechanically } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { aliasIndexesIn } from "../../modules/reading/claude-account-reading.module.code.ts"

const EMAIL = "--email"

const ALIAS = "--alias"

const ACCOUNT_SHAPE = /^[a-z][a-z0-9-]*$/

const EMAIL_SHAPE = /^\S+@\S+$/

export const PAGES_AT = "akasha/agents/claude-accounts/pages"

export type Read =
  | { readonly account: string; readonly email: string; readonly alias: number | null }
  | { readonly refused: readonly string[] }

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
  id: string
): string {
  return [
    `import type { ClaudeAccount } from "../../claude-account.page-type.ts"`,
    ``,
    `export const ${exportedAs(account)} = {`,
    `  id: "${id}",`,
    `  pageTypeSlug: "claude-account",`,
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

export function claudeAccountAdd(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    const held = aliasIndexesIn(given.root)
    if (held.has(read.account)) {
      return {
        report: [],
        refusals: [`a page already stands for \`${read.account}\`, and this writes over none`],
        code: 1,
      }
    }
    const slot = slotFrom(held, read.alias)
    if (typeof slot === "string") return { report: [], refusals: [slot], code: 1 }
    const at = `${PAGES_AT}/${read.account}/${read.account}.claude-account.ts`
    const body = pageTextFor(read.account, read.email, slot, Bun.randomUUIDv7())
    const said = landedMechanically(
      given.root,
      "claude-account-add",
      [{ path: at, body: new TextEncoder().encode(body) }],
      `akasha: file a page for the claude account ${read.account}`
    )
    if (said.code !== 0) return said
    return {
      report: [
        `${read.account} holds slot ${slot} and is filed at ${at}`,
        "run /login in the launching session to sign it in",
      ],
      refusals: [],
      code: 0,
    }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
