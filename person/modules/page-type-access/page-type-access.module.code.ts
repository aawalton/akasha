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

export type Decision = { readonly permitted: boolean; readonly why: string | null }

export type Grant = { readonly target: string; readonly deeds: readonly string[] }

export type Granted =
  | { readonly ok: true; readonly grants: readonly Grant[] }
  | { readonly ok: false; readonly why: string }

const PERMITTED: Decision = { permitted: true, why: null }

function deedsOf(value: unknown): readonly string[] {
  if (typeof value === "string") return value === "" ? [] : [value]
  if (!Array.isArray(value)) return []
  return value.filter((one): one is string => typeof one === "string" && one !== "")
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
      keys: ["target", "deed"],
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
    grants.push({ target, deeds: deedsOf(row["deed"]) })
  }
  return { ok: true, grants }
}

export function grantsPageType(grants: Iterable<Grant>, pageTypeSlug: string, deed: Deed): boolean {
  for (const one of grants) {
    if (one.target !== EVERY_TARGET && one.target !== pageTypeSlug) continue
    if (one.deeds.includes(deed)) return true
  }
  return false
}

export async function pageTypeAccessForPerson(
  personSlug: string,
  pageTypeSlug: string,
  deed: Deed,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Decision> {
  const held = await pageTypeGrantsFor(personSlug, fetcher, naps)
  if (!held.ok) return { permitted: false, why: held.why }
  if (grantsPageType(held.grants, pageTypeSlug, deed)) return PERMITTED
  return {
    permitted: false,
    why: `\`${personSlug}\` holds no page type access naming \`${pageTypeSlug}\` for \`${deed}\``,
  }
}

export async function pageTypeAccessFor(
  whom: Whom | null,
  pageTypeSlug: string,
  deed: Deed,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Decision> {
  if (whom === null) {
    return pageTypeAccessForPerson(ANONYMOUS_PERSON, pageTypeSlug, deed, fetcher, naps)
  }
  const enrolled = await personSlugFor(whom, fetcher, naps)
  if (!enrolled.ok) return { permitted: false, why: enrolled.why }
  return pageTypeAccessForPerson(enrolled.personSlug, pageTypeSlug, deed, fetcher, naps)
}
