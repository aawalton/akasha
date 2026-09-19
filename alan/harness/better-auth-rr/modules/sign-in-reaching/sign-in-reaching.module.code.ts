import {
  CONTRIBUTOR,
  contributorNamedAs,
  contributorSlugFor,
  emailHashOf,
  SIGN_IN,
  signInSlugFor,
  subjectHashOf,
} from "akasha/alan/harness/better-auth-rr/modules/sign-in-naming/sign-in-naming.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const WRITER = "alanwalton web <web@alanwalton.com>"

const OPENING_BALANCE = 100

const SIGN_IN_KEYS: readonly string[] = ["slug", "provider", "subjectHash", "contributor"]

const CONTRIBUTOR_KEYS: readonly string[] = ["slug"]

export type Signing = {
  readonly provider: string
  readonly subject: string
  readonly email: string | null
  readonly emailVerified: boolean
}

export type Reached =
  | { readonly contributor: string; readonly subjectHash: string; readonly opened: boolean }
  | { readonly refused: string }

function contributorIn(held: unknown): string | null {
  const named = textIn(held)
  return named === null ? null : slugIn(named)
}

async function reachedAlready(contributorSlug: string): Promise<string | null> {
  const asked = await askingFor({ pageTypeSlug: SIGN_IN, keys: ["slug", "contributor"] })
  if ("refused" in asked) return asked.refused
  for (const row of asked.rows) {
    if (contributorIn(row.contributor) !== contributorSlug) continue
    const named = textIn(row.slug) ?? "another sign-in"
    return `\`${contributorSlug}\` is reached by \`${named}\` already, and one contributor holds one sign-in`
  }
  return null
}

export async function reachSignIn(signing: Signing): Promise<Reached> {
  const subject = signing.subject.trim()
  if (subject === "") {
    return { refused: `\`${signing.provider}\` named no person, and a sign-in is named by one` }
  }

  const subjectHash = await subjectHashOf(subject)
  const signInSlug = signInSlugFor(signing.provider, subjectHash)

  const askedSignIn = await askingFor({
    pageTypeSlug: SIGN_IN,
    where: { slug: { is: signInSlug } },
    keys: SIGN_IN_KEYS,
  })
  if ("refused" in askedSignIn) return { refused: askedSignIn.refused }

  const already = askedSignIn.rows[0]
  if (already !== undefined) {
    const reached = contributorIn(already.contributor)
    if (reached === null) {
      return { refused: `\`${signInSlug}\` reaches no contributor this can read` }
    }
    return { contributor: reached, subjectHash, opened: false }
  }

  const email = signing.email === null ? null : textIn(signing.email.trim())
  if (email === null) {
    return {
      refused: `\`${signing.provider}\` handed over no address, and a new sign-in needs one`,
    }
  }
  if (!signing.emailVerified) {
    return {
      refused: `\`${signing.provider}\` has not marked that address verified, and such an address signs nobody in`,
    }
  }

  const emailHash = await emailHashOf(email)
  const contributorSlug = contributorSlugFor(emailHash)

  const askedContributor = await askingFor({
    pageTypeSlug: CONTRIBUTOR,
    where: { slug: { is: contributorSlug } },
    keys: CONTRIBUTOR_KEYS,
  })
  if ("refused" in askedContributor) return { refused: askedContributor.refused }

  const opened = askedContributor.rows[0] === undefined

  if (!opened) {
    const taken = await reachedAlready(contributorSlug)
    if (taken !== null) return { refused: taken }
  }

  const contributorPages = opened
    ? [
        {
          pageTypeSlug: CONTRIBUTOR,
          slug: contributorSlug,
          merge: true,
          values: { slug: contributorSlug, emailHash, balance: OPENING_BALANCE, transactions: [] },
        },
      ]
    : []

  const wrote = await writingFor({
    writer: WRITER,
    message: opened
      ? "a person signing in opens a contributor"
      : "a sign-in reaches the contributor an address already names",
    pages: [
      ...contributorPages,
      {
        pageTypeSlug: SIGN_IN,
        slug: signInSlug,
        merge: true,
        values: {
          slug: signInSlug,
          provider: signing.provider,
          subjectHash,
          contributor: contributorNamedAs(contributorSlug),
        },
      },
    ],
  })
  if ("refused" in wrote) return { refused: wrote.refused }

  return { contributor: contributorSlug, subjectHash, opened }
}
