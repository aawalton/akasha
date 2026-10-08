import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  editsOver,
  type Page,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { momentOfVersionSeven } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"

export type Asked = {
  readonly pageType: string
  readonly atMost?: number | null
}

export type LastChanged = (paths: readonly string[]) => ReadonlyMap<string, number>

const CREATED_AT = "createdAt"

const UPDATED_AT = "updatedAt"

const STAMP = "\u0001"

type Lacking = { readonly path: string; readonly id: unknown; readonly keys: readonly string[] }

export function lackingIn(world: World, given: Asked): readonly Lacking[] | string {
  const kinds = world.index.kindsUnder(given.pageType)
  if (kinds.size === 0) return `\`${given.pageType}\` names no page type`
  const atMost = given.atMost ?? null
  const found: Lacking[] = []
  const seen = new Set<string>()
  for (const kind of kinds) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (atMost !== null && found.length >= atMost) return found
      if (seen.has(path)) continue
      seen.add(path)
      const keys = [CREATED_AT, UPDATED_AT].filter((key) => value[key] === undefined)
      if (keys.length > 0) found.push({ path, id: value.id, keys })
    }
  }
  return found
}

export function lastCommitted(root: string): LastChanged {
  return (paths) => {
    const found = new Map<string, number>()
    if (paths.length === 0) return found
    const told = gitIn(root, ["log", `--format=${STAMP}%cI`, "--name-only", "--", ...paths])
    let at: number | null = null
    for (const line of told.split("\n")) {
      if (line.startsWith(STAMP)) {
        at = Date.parse(line.slice(STAMP.length))
        continue
      }
      if (line === "" || at === null || found.has(line)) continue
      found.set(line, at)
    }
    return found
  }
}

function instant(at: number): string {
  return JSON.stringify(new Date(at).toISOString())
}

export function pagesStamped(lacking: readonly Lacking[], last: LastChanged): readonly Page[] {
  const changed = last(lacking.map((one) => one.path))
  return lacking.map((one) => {
    const made = typeof one.id === "string" ? momentOfVersionSeven(one.id) : null
    const touched = changed.get(one.path) ?? made ?? Date.now()
    const created = made === null ? touched : Math.min(made, touched)
    const stamps: Readonly<Record<string, number>> = {
      [CREATED_AT]: created,
      [UPDATED_AT]: Math.max(created, touched),
    }
    return {
      path: one.path,
      written: one.keys.map(
        (key) => ({ written: "put", key, value: instant(stamps[key] ?? touched) }) as const
      ),
    }
  })
}

export function addPageInstants(world: World, given: Asked, last: LastChanged): Said {
  const lacking = lackingIn(world, given)
  if (typeof lacking === "string") return refusing(lacking)
  const made = editsOver(world, pagesStamped(lacking, last))
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return addPageInstants(world, given, lastCommitted(world.root))
}
