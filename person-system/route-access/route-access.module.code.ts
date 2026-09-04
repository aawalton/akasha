import { askingFor, type Fetcher, type Sleeper } from "@akasha/pages-system-service/calling"
import { personSlugForAccount } from "../person-enrolment/person-enrolment.module.code.ts"

export const PERSON_ACCESS_PAGE_TYPE = "person-access"

export const ROUTE_ACCESS_KIND = "route"

export const EVERY_TARGET = "all"

export const ROUTE_TARGETS = {
  DEVICE_SECRET_MINT: "device-secret-mint",
  READOUT_FEED: "readout-feed",
} as const

export type Decision = { readonly permitted: boolean; readonly why: string | null }

export type Granted =
  | { readonly ok: true; readonly targets: readonly string[] }
  | { readonly ok: false; readonly why: string }

const PERMITTED: Decision = { permitted: true, why: null }

export async function routeTargetsFor(
  personSlug: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Granted> {
  const asked = await askingFor(
    {
      pageTypeSlug: PERSON_ACCESS_PAGE_TYPE,
      where: { personSlug: { is: personSlug }, accessKind: { is: ROUTE_ACCESS_KIND } },
      keys: ["target"],
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
  const targets: string[] = []
  for (const row of asked.rows) {
    const target = row["target"]
    if (typeof target === "string" && target !== "") targets.push(target)
  }
  return { ok: true, targets }
}

export function grantsRoute(targets: Iterable<string>, target: string): boolean {
  for (const one of targets) {
    if (one === EVERY_TARGET || one === target) return true
  }
  return false
}

export async function routeAccessForPerson(
  personSlug: string,
  target: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Decision> {
  const held = await routeTargetsFor(personSlug, fetcher, naps)
  if (!held.ok) return { permitted: false, why: held.why }
  if (grantsRoute(held.targets, target)) return PERMITTED
  return {
    permitted: false,
    why: `\`${personSlug}\` holds no route access naming \`${target}\``,
  }
}

export async function routeAccessForAccount(
  accountUserId: string,
  target: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Decision> {
  const enrolled = await personSlugForAccount(accountUserId, fetcher, naps)
  if (!enrolled.ok) return { permitted: false, why: enrolled.why }
  return routeAccessForPerson(enrolled.personSlug, target, fetcher, naps)
}
