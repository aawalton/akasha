import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  askingFor,
  type Fetcher,
  type Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const PERSON_ACCESS_PAGE_TYPE = "person-access"

const PERSON_PAGE_TYPE = "person"

const ACCESS_KIND_PAGE_TYPE = "access-kind"

const ACCESS_DEED_PAGE_TYPE = "access-deed"

const PAGE_TYPE_ACCESS_KIND = namedAs(ACCESS_KIND_PAGE_TYPE, "page-type", null)

const EVERY_TARGET = "all"

export const ANONYMOUS_PERSON = "anonymous"

export const DEEDS = {
  READ: namedAs(ACCESS_DEED_PAGE_TYPE, "read", null),
  READ_SOME: namedAs(ACCESS_DEED_PAGE_TYPE, "read-some", null),
  WRITE: namedAs(ACCESS_DEED_PAGE_TYPE, "write", null),
} as const

export type Deed = (typeof DEEDS)[keyof typeof DEEDS]

type Narrow = { readonly key: string; readonly is: string }

export type Grant = {
  readonly target: string
  readonly deeds: readonly string[]
  readonly narrow: Narrow | null
}

export type Reach =
  | { readonly permitted: false; readonly why: string }
  | { readonly permitted: true; readonly narrows: readonly Narrow[] | null }

type Granted =
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

export function malformed(grant: Grant): string | null {
  const some = grant.deeds.includes(DEEDS.READ_SOME)
  if (some && grant.narrow === null) {
    return `an access stating \`${DEEDS.READ_SOME}\` carries no narrow, so it names no pages`
  }
  if (!some && grant.narrow !== null) {
    return `an access carrying a narrow states a deed other than \`${DEEDS.READ_SOME}\`, and a gate that does not read narrows would widen past it`
  }
  return null
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
    const why = malformed(one)
    if (why !== null) {
      console.warn(`[page-type-access] \`${personSlug}\` holds an access reaching nothing: ${why}`)
      continue
    }
    if (deed === DEEDS.READ && one.deeds.includes(DEEDS.READ_SOME) && one.narrow !== null) {
      named = true
      narrows.push(one.narrow)
      continue
    }
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
