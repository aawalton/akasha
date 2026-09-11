import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"

export type Sought = {
  readonly at: string
  readonly key: string
}

export function requiredIn(world: World, given: Sought): boolean | null {
  const named = partedIn(given.at)
  if (named === null || named.sections.length > 0) return null
  const carried = world.index.propertiesIfNamed(named.pageType)
  if (carried === null) return null
  return carried.some((one) => one.key === given.key && one.required)
}
