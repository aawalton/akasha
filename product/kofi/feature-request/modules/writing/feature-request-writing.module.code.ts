import { contributorNamedAs } from "akasha/alan/harness/better-auth-rr/modules/sign-in-naming/sign-in-naming.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import {
  recordsIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { balanceOf } from "akasha/product/kofi/contribution-point/modules/balance/contribution-point-balance.module.code.ts"
import {
  type Boost,
  boosting,
  proposing,
} from "akasha/product/kofi/contribution-point/modules/spending/contribution-point-spending.module.code.ts"
import { requestSlugFor } from "akasha/product/kofi/feature-request/modules/naming/feature-request-naming.module.code.ts"
import { featureRequestAsk } from "akasha/product/kofi/feature-request/properties/feature-request-ask.text-property.ts"

const FEATURE_REQUEST = "feature-request"

const CONTRIBUTOR = "contributor"

const PROPOSED = "proposed"

const WRITER = "alanwalton web <web@alanwalton.com>"

const CONTRIBUTOR_KEYS: readonly string[] = ["slug", "transactions"]

const REQUEST_KEYS: readonly string[] = ["slug", "standing", "boosts"]

const SLUG_KEYS: readonly string[] = ["slug"]

export type Landed = { readonly slug: string } | { readonly refused: string }

type Held =
  | { readonly balance: number; readonly transactions: readonly Value[] }
  | { readonly refused: string }

async function heldBy(contributor: string): Promise<Held> {
  const asked = await askingFor({
    pageTypeSlug: CONTRIBUTOR,
    where: { slug: { is: contributor } },
    keys: CONTRIBUTOR_KEYS,
  })
  if ("refused" in asked) return { refused: asked.refused }
  const row = asked.rows[0]
  if (row === undefined) return { refused: `\`${contributor}\` names no contributor` }
  const transactions = recordsIn(row.transactions)
  return { balance: balanceOf(transactions), transactions }
}

export async function balanceHeldBy(contributor: string): Promise<number | null> {
  const held = await heldBy(contributor)
  return "refused" in held ? null : held.balance
}

function movedOnto(contributor: string, transactions: readonly Value[]): Naming {
  return {
    pageTypeSlug: CONTRIBUTOR,
    slug: contributor,
    merge: true,
    values: { slug: contributor, transactions, balance: balanceOf(transactions) },
  }
}

function boostsIn(held: unknown): readonly Boost[] {
  const kept: Boost[] = []
  for (const one of recordsIn(held)) {
    const contributor = textIn(one.contributor)
    const points = one.points
    if (contributor === null || typeof points !== "number") continue
    kept.push({ contributor, points })
  }
  return kept
}

async function namesTaken(): Promise<
  { readonly taken: ReadonlySet<string> } | { readonly refused: string }
> {
  const asked = await askingFor({ pageTypeSlug: FEATURE_REQUEST, keys: SLUG_KEYS })
  if ("refused" in asked) return { refused: asked.refused }
  const taken = new Set<string>()
  for (const row of asked.rows) {
    const slug = textIn(row.slug)
    if (slug !== null) taken.add(slug)
  }
  return { taken }
}

export type Proposal = {
  readonly product: string
  readonly contributor: string
  readonly ask: string
}

export async function proposedBy(given: Proposal): Promise<Landed> {
  const ask = given.ask.trim()
  if (ask === "") return { refused: "a feature request says what it asks for" }
  if (ask.length > featureRequestAsk.maxLength) {
    const holds = `an ask holds ${featureRequestAsk.maxLength} characters`
    return { refused: `${holds}, and this one runs to ${ask.length}` }
  }
  const held = await heldBy(given.contributor)
  if ("refused" in held) return held
  const booster = contributorNamedAs(given.contributor)
  const moving = proposing({
    contributor: booster,
    balance: held.balance,
    at: new Date().toISOString(),
  })
  if ("refused" in moving) return moving
  const named = await namesTaken()
  if ("refused" in named) return named
  const slug = requestSlugFor(ask, named.taken)
  const wrote = await writingFor({
    writer: WRITER,
    message: `a contributor opens \`${slug}\``,
    pages: [
      {
        pageTypeSlug: FEATURE_REQUEST,
        slug,
        values: {
          slug,
          title: ask,
          ask,
          product: given.product,
          proposer: booster,
          standing: PROPOSED,
          boosts: moving.moved.boosts,
        },
      },
      movedOnto(given.contributor, [...held.transactions, moving.moved.transaction]),
    ],
  })
  if ("refused" in wrote) return wrote
  return { slug }
}

export type Boosting = {
  readonly product: string
  readonly contributor: string
  readonly request: string
  readonly points: number
}

export async function boostedBy(given: Boosting): Promise<Landed> {
  const asked = await askingFor({
    pageTypeSlug: FEATURE_REQUEST,
    where: { slug: { is: given.request }, product: { is: given.product } },
    keys: REQUEST_KEYS,
  })
  if ("refused" in asked) return { refused: asked.refused }
  const row = asked.rows[0]
  if (row === undefined) {
    return { refused: `\`${given.request}\` names no feature request of this product` }
  }
  const held = await heldBy(given.contributor)
  if ("refused" in held) return held
  const moving = boosting({
    contributor: contributorNamedAs(given.contributor),
    balance: held.balance,
    boosts: boostsIn(row.boosts),
    points: given.points,
    standing: textIn(row.standing) ?? "",
    at: new Date().toISOString(),
  })
  if ("refused" in moving) return moving
  const wrote = await writingFor({
    writer: WRITER,
    message: `${given.points} points reach \`${given.request}\``,
    pages: [
      {
        pageTypeSlug: FEATURE_REQUEST,
        slug: given.request,
        merge: true,
        values: { boosts: moving.moved.boosts },
      },
      movedOnto(given.contributor, [...held.transactions, moving.moved.transaction]),
    ],
  })
  if ("refused" in wrote) return wrote
  return { slug: given.request }
}
