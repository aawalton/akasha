import { askingFor, type Fetcher, type Sleeper } from "@akasha/pages-system-service/calling"

export const PERSON_PAGE_TYPE = "person"

export const ACCOUNT_KEY = "supabaseAuthUserId"

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
