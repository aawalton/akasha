import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  askingFor,
  type Fetcher,
  type Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  personSlugFor,
  type Whom,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

const PERSON_ACCESS_PAGE_TYPE = "person-access"

const PERSON_PAGE_TYPE = "person"

const ACCESS_KIND_PAGE_TYPE = "access-kind"

const ACCESS_DEED_PAGE_TYPE = "access-deed"

const PAGE_TYPE_ACCESS_KIND = namedAs(ACCESS_KIND_PAGE_TYPE, "page-type", null)

const EVERY_TARGET = "all"

export const ANONYMOUS_PERSON = "anonymous"

export const DEEDS = {
  READ: namedAs(ACCESS_DEED_PAGE_TYPE, "read", null),
  WRITE: namedAs(ACCESS_DEED_PAGE_TYPE, "write", null),
} as const

export type Deed = (typeof DEEDS)[keyof typeof DEEDS]

export type Narrow = { readonly key: string; readonly is: string }

export type Grant = {
  readonly target: string
  readonly deeds: readonly string[]
  readonly narrow: Narrow | null
}

export type Reach =
  | { readonly permitted: false; readonly why: string }
  | { readonly permitted: true; readonly narrows: readonly Narrow[] | null }

export type Granted =
  | { readonly ok: true; readonly grants: readonly Grant[] }
  | { readonly ok: false; readonly why: string }

function deedsOf(value: unknown): readonly string[] {
  if (typeof value === "string") return value === "" ? [] : [value]
  if (!Array.isArray(value)) return []
  return value.filter((one): one is string => typeof one === "string" && one !== "")
}

function narrowOf(value: unknown): Narrow | null {
  const held = asObjectRecord(value)
  if (held === undefined) return null
  const key = held["key"]
  const is = held["is"]
  if (typeof key !== "string" || key === "") return null
  if (typeof is !== "string") return null
  return { key, is }
}

export async function pageTypeGrantsFor(
  personSlug: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Granted> {
  const asked = await askingFor(
    {
      pageTypeSlug: PERSON_ACCESS_PAGE_TYPE,
      where: {
        person: { is: namedAs(PERSON_PAGE_TYPE, personSlug, null) },
        accessKind: { is: PAGE_TYPE_ACCESS_KIND },
      },
      keys: ["target", "deed", "narrow"],
    },
    fetcher,
    naps
  )
  if ("refused" in asked) {
    return {
      ok: false,
      why: `the access pages went unread, so nothing \`${personSlug}\` holds could be read: ${asked.refused}`,
    }
  }
  const grants: Grant[] = []
  for (const row of asked.rows) {
    const target = row["target"]
    if (typeof target !== "string" || target === "") continue
    grants.push({ target, deeds: deedsOf(row["deed"]), narrow: narrowOf(row["narrow"]) })
  }
  return { ok: true, grants }
}

export function reachOf(
  grants: Iterable<Grant>,
  pageTypeSlug: string,
  deed: Deed,
  personSlug: string
): Reach {
  const narrows: Narrow[] = []
  let named = false
  for (const one of grants) {
    if (one.target !== EVERY_TARGET && one.target !== pageTypeSlug) continue
    if (!one.deeds.includes(deed)) continue
    named = true
    if (one.narrow === null) return { permitted: true, narrows: null }
    narrows.push(one.narrow)
  }
  if (!named) {
    return {
      permitted: false,
      why: `\`${personSlug}\` holds no page type access naming \`${pageTypeSlug}\` for \`${deed}\``,
    }
  }
  return { permitted: true, narrows }
}

export async function pageTypeReachForPerson(
  personSlug: string,
  pageTypeSlug: string,
  deed: Deed,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Reach> {
  const held = await pageTypeGrantsFor(personSlug, fetcher, naps)
  if (!held.ok) return { permitted: false, why: held.why }
  return reachOf(held.grants, pageTypeSlug, deed, personSlug)
}

export async function pageTypeReachFor(
  whom: Whom | null,
  pageTypeSlug: string,
  deed: Deed,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Reach> {
  if (whom === null) {
    return pageTypeReachForPerson(ANONYMOUS_PERSON, pageTypeSlug, deed, fetcher, naps)
  }
  const enrolled = await personSlugFor(whom, fetcher, naps)
  if (!enrolled.ok) return { permitted: false, why: enrolled.why }
  return pageTypeReachForPerson(enrolled.personSlug, pageTypeSlug, deed, fetcher, naps)
}
