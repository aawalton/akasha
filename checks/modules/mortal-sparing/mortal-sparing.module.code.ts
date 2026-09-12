import type { AnyRunning, Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Known } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import { type Shadow, shadowAsked } from "akasha/pages/shadow/shadow.module.code.ts"

export type Dies = (path: string) => boolean

export type Sparing = (run: AnyRunning, found: readonly Judged[]) => Promise<readonly Judged[]>

type Was = {
  readonly change: Change
  readonly shadow: Shadow
}

function keyOf(one: Judged): string {
  return JSON.stringify([one.path, one.reason])
}

export function diesIn(known: Known): Dies {
  const held = new Map<string, boolean>()
  return (path) => {
    const said = partedIn(path)
    if (said === null) return false
    const found = held.get(said.pageType)
    if (found !== undefined) return found
    const made = known.mortal(said.pageType)
    held.set(said.pageType, made)
    return made
  }
}

function asItWas(change: Change): Change {
  return {
    root: change.root,
    changed: change.changed,
    before: change.before,
    after: change.before,
  }
}

export function sparingOver(change: Change, dies: Dies): Sparing {
  let was: Was | null = null
  const before = (): Was => {
    if (was !== null) return was
    const one = asItWas(change)
    was = { change: one, shadow: shadowAsked(one) }
    return was
  }
  return async (run, found) => {
    if (!found.some((one) => dies(one.path))) return found
    const already = await run(before().change, before().shadow)
    const had = new Set(already.map(keyOf))
    return found.filter((one) => !dies(one.path) || !had.has(keyOf(one)))
  }
}
