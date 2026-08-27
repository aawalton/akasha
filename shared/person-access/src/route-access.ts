import { askComposed } from "@shared/pages-query/ask"
import { anyTargetCovers } from "@shared/person-target/target"
import { PERSON_ACCESS_SLUG } from "./page-type"

export interface RouteAccess {
  readonly personSlug: string
  readonly granted: ReadonlySet<string>
}

export async function readRouteAccess(personSlug: string): Promise<RouteAccess> {
  const asked = await askComposed({
    "page-type": PERSON_ACCESS_SLUG,
    where: { "person-slug": { is: personSlug }, "access-kind": { is: "route" } },
    keys: ["target"],
  })
  if (!asked.ok) throw new Error(`readRouteAccess: ${asked.why}`)

  const granted = new Set<string>()
  for (const row of asked.answer.rows) {
    const target = row.values["target"]
    if (typeof target !== "string" || target === "") continue
    granted.add(target)
  }

  return { personSlug, granted }
}

export function grantsRoute(access: RouteAccess, target: string): boolean {
  return anyTargetCovers(access.granted, target)
}

export async function decideRouteAccess(
  personSlug: string,
  target: string
): Promise<{
  readonly permitted: boolean
  readonly unreadable?: string
}> {
  try {
    const access = await readRouteAccess(personSlug)
    return { permitted: grantsRoute(access, target) }
  } catch (error) {
    return {
      permitted: false,
      unreadable: error instanceof Error ? error.message : String(error),
    }
  }
}
