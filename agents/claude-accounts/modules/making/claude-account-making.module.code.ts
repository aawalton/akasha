import { type Asking, runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import type { Reading } from "@akasha/indexes/shape"
import { exportedAs } from "@akasha/pages/page-export-name"
import type { Applied } from "../../../../commands/modules/applying/applying.module.code.ts"
import type { Refused } from "../../../../commands/modules/landing/landing.module.code.ts"
import { accountPathIn, everyAccountIn } from "../reading/claude-account-reading.module.code.ts"

export const PAGE_TYPE_SLUG = "claude-account"

const PUT = "change-mechanical-file/add-file"

export const ACCOUNT_SHAPE = /^[a-z0-9][a-z0-9_-]*$/

const EMAIL_SHAPE = /^\S+@\S+$/

const FIRST_SLOT = 1

export type Made =
  | { readonly kind: "made"; readonly slug: string; readonly path: string; readonly id: string }
  | { readonly kind: "standing"; readonly slug: string; readonly path: string }
  | { readonly kind: "refused"; readonly slug: string; readonly why: string }

export type Landing = (
  root: string,
  asked: readonly Asking[],
  message: string
) => Promise<Applied | Refused>

export const LANDING: Landing = runMechanicalChange

export function accountsAtIn(given: string | Reading): string {
  const first = everyAccountIn(given)[0]
  if (first === undefined) {
    throw new Error(
      `no page is filed under \`${PAGE_TYPE_SLUG}\`, and where a new one is written is read off ` +
        `the pages already there, so this root says nothing about where to write one`
    )
  }
  const cut = first.path.lastIndexOf("/")
  if (cut <= 0) {
    throw new Error(
      `\`${first.path}\` is the page the folder is read off and names no folder, so where a new ` +
        `account is written is unknown`
    )
  }
  return first.path.slice(0, cut)
}

export function accountPagePathIn(given: string | Reading, slug: string): string {
  return `${accountsAtIn(given)}/${slug}.${PAGE_TYPE_SLUG}.ts`
}

export function accountPageText(given: {
  readonly slug: string
  readonly email: string
  readonly aliasIndex: number
  readonly id: string
}): string {
  return [
    `import type { ClaudeAccount } from "../claude-account.page-type.ts"`,
    ``,
    `export const ${exportedAs(given.slug)} = {`,
    `  id: "${given.id}",`,
    `  pageTypeSlug: "${PAGE_TYPE_SLUG}",`,
    `  slug: "${given.slug}",`,
    `  email: "${given.email}",`,
    `  aliasIndex: ${given.aliasIndex},`,
    `} as const satisfies ClaudeAccount`,
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
  reading: Reading
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
    const text = accountPageText({ slug, email: given.email, aliasIndex: given.aliasIndex, id })
    const landed = await landing(
      root,
      [{ at: PUT, given: { at: path, body: text } }],
      `akasha: add ${path}`
    )
    const wrong = "refusals" in landed ? landed.refusals : landed.wrong
    if (wrong.length > 0) return { kind: "refused", slug, why: wrong.join("; ") }
    return { kind: "made", slug, path, id }
  } catch (thrown) {
    return {
      kind: "refused",
      slug,
      why: `the page make threw, which it is written never to do: ${
        thrown instanceof Error ? thrown.message : String(thrown)
      }`,
    }
  }
}
