import { landedMechanically } from "@akasha/command-system/asking"
import type { Answer } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import type { Reading } from "@akasha/indexes/shape"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { accountPathIn, everyAccountIn } from "../reading/claude-account-reading.module.code.ts"

export const PAGE_TYPE_SLUG = "claude-account"

const CALLED_AS = "claude-account-making"

export const ACCOUNT_SHAPE = /^[a-z0-9][a-z0-9_-]*$/

const EMAIL_SHAPE = /^\S+@\S+$/

const FIRST_SLOT = 1

const LANDED = 0

export type Made =
  | { readonly kind: "made"; readonly slug: string; readonly path: string; readonly id: string }
  | { readonly kind: "standing"; readonly slug: string; readonly path: string }
  | { readonly kind: "refused"; readonly slug: string; readonly why: string }

export type Landing = (
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
  message: string
) => Promise<Answer>

export const LANDING: Landing = landedMechanically

// Where a new account page is written is read off the pages already standing rather than written
// out a second time. A folder move repoints no string in this repository, so a spelled folder is
// the answer that goes stale; a root standing no account at all names that rather than guessing.
export function accountsAtIn(given: string | Reading): string {
  const first = everyAccountIn(given)[0]
  if (first === undefined) {
    throw new Error(
      `no page is filed under \`${PAGE_TYPE_SLUG}\`, and where a new one is written is read off ` +
        `the pages already standing, so this root says nothing about where to write one`
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

// What an account states when it is made. The uuid, the plan, the band, the renewal day and the
// scopes are all answered by the upstream probe at the first sign-in, so none of them is written
// here and the page type declares none of them required.
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

export function madeIn(
  root: string,
  given: {
    readonly slug: string
    readonly email: string
    readonly aliasIndex: number
    readonly id?: string
  },
  landing: Landing,
  reading: Reading
): Made {
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
    const answer = landing(
      root,
      CALLED_AS,
      [{ path, body: new TextEncoder().encode(text) }],
      `akasha: add ${path}`
    )
    if (answer.code !== LANDED) {
      return { kind: "refused", slug, why: answer.refusals.join("; ") }
    }
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
