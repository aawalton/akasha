import { join } from "node:path"
import type {
  KeptHeard,
  Target,
} from "akasha/page/service/modules/follow-planning/follow-planning.module.code.ts"

type KeptHearing = {
  readonly again: (
    read: ReadonlyMap<string, KeptHeard>,
    aimed: ReadonlyMap<string, readonly Target[]>
  ) => undefined
  readonly holds: (folder: string) => boolean
  readonly folders: () => Iterable<string>
  readonly heard: (folder: string, name: string) => undefined
}

export function keptHearingFor(reach: (one: Target, path: string) => undefined): KeptHearing {
  let keptHeard: ReadonlyMap<string, KeptHeard> = new Map()
  let aimed: ReadonlyMap<string, readonly Target[]> = new Map()
  const keptAts = new Map<string, Set<string>>()
  const again = (
    read: ReadonlyMap<string, KeptHeard>,
    aiming: ReadonlyMap<string, readonly Target[]>
  ): undefined => {
    for (const [at, heard] of keptHeard) {
      if (read.get(at) === heard) continue
      for (const folder of heard.keys()) {
        const ats = keptAts.get(folder)
        ats?.delete(at)
        if (ats?.size === 0) keptAts.delete(folder)
      }
    }
    for (const [at, heard] of read) {
      if (keptHeard.get(at) === heard) continue
      for (const folder of heard.keys()) {
        const ats = keptAts.get(folder) ?? new Set<string>()
        ats.add(at)
        keptAts.set(folder, ats)
      }
    }
    keptHeard = read
    aimed = aiming
    return undefined
  }
  const heard = (folder: string, name: string): undefined => {
    for (const at of keptAts.get(folder) ?? []) {
      const names = keptHeard.get(at)?.get(folder)
      if (names?.has(name) !== true && names?.has(null) !== true) continue
      for (const one of aimed.get(at) ?? []) reach(one, join(folder, name))
    }
    return undefined
  }
  return {
    again,
    holds: (folder) => keptAts.has(folder),
    folders: () => keptAts.keys(),
    heard,
  }
}
