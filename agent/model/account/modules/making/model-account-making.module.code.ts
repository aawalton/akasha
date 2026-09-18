import {
  ANTHROPIC,
  accountPathIn,
  everyAccountIn,
} from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { importedFrom, saidAs } from "akasha/page/modules/body/page-body.module.code.ts"
import {
  exportedAs,
  typedAs,
} from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const PAGE_TYPE_SLUG = "model-account"

const PAGE_TYPE = "page-type"

const TYPES = "types"

const TS = "ts"

const PUT = "change-mechanical-file/add-file"

const ACCOUNT_SHAPE = /^[a-z0-9][a-z0-9_-]*$/

const EMAIL_SHAPE = /^\S+@\S+$/

const FIRST_SLOT = 1

export type Made =
  | { readonly kind: "made"; readonly slug: string; readonly path: string; readonly id: string }
  | { readonly kind: "standing"; readonly slug: string; readonly path: string }
  | { readonly kind: "refused"; readonly slug: string; readonly why: string }

export const LANDING: Landing = runMechanicalChange

export function accountsAtFor(page: string, slug: string): string {
  const named = page.lastIndexOf("/")
  if (named <= 0) {
    throw new Error(
      `\`${page}\` is the page the folder is read off and names no folder, so where a new ` +
        `account is written is unknown`
    )
  }
  const holding = page.slice(0, named)
  const own = holding.lastIndexOf("/")
  if (own <= 0 || holding.slice(own + 1) !== slug) return holding
  return holding.slice(0, own)
}

function accountsAtIn(given: string | Reading): string {
  const first = everyAccountIn(given)[0]
  if (first === undefined) {
    throw new Error(
      `no page is filed under \`${PAGE_TYPE_SLUG}\`, and where a new one is written is read off ` +
        `the pages already there, so this root says nothing about where to write one`
    )
  }
  return accountsAtFor(first.path, first.slug)
}

export function accountPageAt(accountsAt: string, slug: string): string {
  return `${accountsAt}/${slug}/${slug}.${PAGE_TYPE_SLUG}.ts`
}

function accountPagePathIn(given: string | Reading, slug: string): string {
  return accountPageAt(accountsAtIn(given), slug)
}

function typedFrom(given: string | Reading, typeSlug: string): string {
  const page = listedAt(given, PAGE_TYPE, typeSlug)[0]
  const at = page === undefined ? null : besideAt(page.path, TYPES, TS)
  if (at === null) {
    throw new Error(`no \`${PAGE_TYPE}\` is slugged \`${typeSlug}\`, so a body names no type`)
  }
  return importedFrom(at)
}

export function accountPageText(
  given: {
    readonly slug: string
    readonly email: string
    readonly aliasIndex: number
    readonly id: string
  },
  reading: string | Reading
): string {
  const named = typedAs(PAGE_TYPE_SLUG)
  return [
    `import type { ${named} } from ${saidAs(typedFrom(reading, PAGE_TYPE_SLUG))}`,
    ``,
    `export const ${exportedAs(given.slug)} = {`,
    `  id: ${saidAs(given.id)},`,
    `  type: ${saidAs(namedAs(PAGE_TYPE, PAGE_TYPE_SLUG, null))},`,
    `  slug: ${saidAs(given.slug)},`,
    `  provider: ${saidAs(ANTHROPIC)},`,
    `  email: ${saidAs(given.email)},`,
    `  aliasIndex: ${String(given.aliasIndex)},`,
    `} as const satisfies ${named}`,
    ``,
  ].join("\n")
}

export async function madeIn(
  root: string,
  given: {
    readonly slug: string
    readonly email: string
    readonly aliasIndex: number
    readonly id?: string
  },
  landing: Landing,
  reading: Reading,
  done: string[] = []
): Promise<Made> {
  const { slug } = given
  try {
    if (!ACCOUNT_SHAPE.test(slug)) {
      return {
        kind: "refused",
        slug,
        why: `\`${slug}\` is not an account name this writes a path from`,
      }
    }
    if (!EMAIL_SHAPE.test(given.email)) {
      return {
        kind: "refused",
        slug,
        why: `\`${given.email}\` is not an address this writes onto one frontmatter line`,
      }
    }
    if (!Number.isInteger(given.aliasIndex) || given.aliasIndex < FIRST_SLOT) {
      return {
        kind: "refused",
        slug,
        why: `\`${given.aliasIndex}\` is not a c-alias slot, which is a whole number from 1 up`,
      }
    }
    const standing = accountPathIn(reading, slug)
    if (standing !== null) return { kind: "standing", slug, path: standing }

    const path = accountPagePathIn(reading, slug)
    const id = given.id ?? Bun.randomUUIDv7()
    const text = accountPageText(
      { slug, email: given.email, aliasIndex: given.aliasIndex, id },
      reading
    )
    const landed = await landing(
      root,
      [{ at: PUT, given: { at: path, body: text } }],
      `akasha: add ${path}`,
      { done }
    )
    const wrong = refusalsIn(landed)
    if (wrong.length > 0) return { kind: "refused", slug, why: wrong.join("; ") }
    return { kind: "made", slug, path, id }
  } catch (thrown) {
    const whyThrown = thrown instanceof Error ? thrown.message : String(thrown)
    const why = `the page make threw, which it is written never to do: ${whyThrown}`
    return { kind: "refused", slug, why: [why, ...partWay(done)].join(" ") }
  }
}
