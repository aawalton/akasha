import {
  type AddonInfo,
  listAllAddons,
  type ResolveOpts,
} from "akasha/temper/addon/build/resolve/modules/addon-roster/addon-roster.module.code.ts"

type DeployableInfo = {
  readonly name: string
}

function isRoster(
  held: readonly AddonInfo[] | ResolveOpts | undefined
): held is readonly AddonInfo[] {
  return Array.isArray(held)
}

export function listDeployables(
  rosterOrOpts?: readonly AddonInfo[] | ResolveOpts
): readonly DeployableInfo[] {
  const roster = isRoster(rosterOrOpts) ? rosterOrOpts : listAllAddons(rosterOrOpts)
  return roster
    .map((one) => ({ name: one.canonicalName }))
    .sort((left, right) => left.name.localeCompare(right.name))
}
