import {
  type AddonInfo,
  listAllAddons,
  type ResolveOpts,
} from "../addon-roster/addon-roster.module.code.ts"

export type DeployableInfo = {
  readonly name: string
  readonly workspaceClosure: readonly string[]
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
    .map((one) => ({ name: one.canonicalName, workspaceClosure: one.workspaceClosure }))
    .sort((left, right) => left.name.localeCompare(right.name))
}
