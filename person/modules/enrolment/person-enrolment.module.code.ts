import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  askingFor,
  type Fetcher,
  type Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const PERSON_PAGE_TYPE = "person"

const ACCOUNT_KEY = "supabaseAuthUserId"

const CONTRIBUTOR_KEY = "contributor"

const CONTRIBUTOR_PAGE_TYPE = "contributor"

export type Enrolment =
  | { readonly ok: true; readonly personSlug: string }
  | { readonly ok: false; readonly unread: boolean; readonly why: string }

const NAMING_NOBODY =
  "an account naming nothing is nobody, and a person stating no account is not that nobody"

function slugsIn(rows: readonly Readonly<Record<string, unknown>>[]): readonly string[] {
  const held: string[] = []
  for (const row of rows) {
    const slug = row["slug"]
    if (typeof slug === "string" && slug !== "") held.push(slug)
  }
  return held
}

export async function personSlugForAccount(
  accountUserId: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Enrolment> {
  const account = accountUserId.trim()
  if (account === "") return { ok: false, unread: false, why: NAMING_NOBODY }
  const asked = await askingFor(
    {
      pageTypeSlug: PERSON_PAGE_TYPE,
      where: { [ACCOUNT_KEY]: { is: account } },
      keys: ["slug"],
    },
    fetcher,
    naps
  )
  if ("refused" in asked) {
    return {
      ok: false,
      unread: true,
      why: `the person pages went unread, so the account ${account} could be read to nobody: ${asked.refused}`,
    }
  }
  const held = slugsIn(asked.rows)
  const only = held[0]
  if (only === undefined) {
    return { ok: false, unread: false, why: `no person states the account ${account}` }
  }
  if (held.length > 1) {
    return {
      ok: false,
      unread: true,
      why: `${held.join(" and ")} each state the account ${account}, so it names no one person`,
    }
  }
  return { ok: true, personSlug: only }
}

const SIGNING_IN_AS_NOBODY =
  "a session naming no contributor is nobody, and a person stating no contributor is not that nobody"

export function contributorNamed(said: string): string | null {
  const held = said.trim()
  if (held === "") return null
  const address = addressIn(held)
  if (address.kind === "bare") return namedAs(CONTRIBUTOR_PAGE_TYPE, address.slug, null)
  if (address.kind === "qualified" && address.pageTypeSlug === CONTRIBUTOR_PAGE_TYPE) {
    return namedAs(CONTRIBUTOR_PAGE_TYPE, address.slug, null)
  }
  return null
}

export async function personSlugForContributor(
  contributorSlug: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Enrolment> {
  const contributor = contributorNamed(contributorSlug)
  if (contributor === null) return { ok: false, unread: false, why: SIGNING_IN_AS_NOBODY }
  const asked = await askingFor(
    {
      pageTypeSlug: PERSON_PAGE_TYPE,
      where: { [CONTRIBUTOR_KEY]: { is: contributor } },
      keys: ["slug"],
    },
    fetcher,
    naps
  )
  if ("refused" in asked) {
    return {
      ok: false,
      unread: true,
      why: `the person pages went unread, so the contributor ${contributor} could be read to nobody: ${asked.refused}`,
    }
  }
  const held = slugsIn(asked.rows)
  const only = held[0]
  if (only === undefined) {
    return { ok: false, unread: false, why: `no person states the contributor ${contributor}` }
  }
  if (held.length > 1) {
    return {
      ok: false,
      unread: true,
      why: `${held.join(" and ")} each state the contributor ${contributor}, so it names no one person`,
    }
  }
  return { ok: true, personSlug: only }
}

export type Whom =
  | { readonly by: "contributor"; readonly contributor: string }
  | { readonly by: "account"; readonly account: string }

export function asContributor(contributor: string): Whom {
  return { by: "contributor", contributor }
}

export function asAccount(account: string): Whom {
  return { by: "account", account }
}

export async function personSlugFor(
  whom: Whom,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Enrolment> {
  if (whom.by === "contributor") {
    return personSlugForContributor(whom.contributor, fetcher, naps)
  }
  return personSlugForAccount(whom.account, fetcher, naps)
}
