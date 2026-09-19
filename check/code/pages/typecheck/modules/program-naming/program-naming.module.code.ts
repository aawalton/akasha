import { compiled } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

const DECLARED = ".d.ts"

export type Naming = {
  readonly named: readonly string[]
  readonly asked: readonly string[]
}

function declaringIn(change: Change, shadow: Shadow): readonly string[] {
  const held = new Set([...shadow.listed(), ...change.changed])
  return [...held].filter(
    (one) => compiled(one) && one.endsWith(DECLARED) && change.after(one) !== null
  )
}

export function namingOf(
  change: Change,
  shadow: Shadow,
  roots: readonly string[],
  orphaned: readonly string[],
  claimed: (path: string) => boolean
): Naming {
  const declared = declaringIn(change, shadow).filter((one) => !claimed(one))
  const named = [...new Set([...roots, ...declared])]
  return { named, asked: roots.length === 0 && orphaned.length > 0 ? named : roots }
}
