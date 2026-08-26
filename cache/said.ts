import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { BuildContext, Roots, Said } from "../graph/node-shape.ts"
import { KEEPS_NOTHING } from "../graph/node-shape.ts"
import { AKASHA, rootsHere, rootsOver } from "../graph/roots.ts"
import { answersAt, sweep } from "./answer.ts"
import { closureOf } from "./closure.ts"
import { markOf } from "./mark.ts"
import { oidsUnder } from "./oid.ts"

export const SAID_KIND = "said"

const ENTRY = "graph/ask.ts"

const JSON_ENDING = ".json"

type Held = {
  readonly rows: Record<string, unknown>
  dirty: boolean
}

function fileAt(at: string, name: string, mark: string, repo: string): string {
  return join(at, SAID_KIND, name, mark, `${repo}${JSON_ENDING}`)
}

function loaded(file: string): Record<string, unknown> {
  if (!existsSync(file)) return {}
  try {
    const back: unknown = JSON.parse(readFileSync(file, "utf8"))
    if (back === null || typeof back !== "object" || Array.isArray(back)) return {}
    return back as Record<string, unknown>
  } catch {
    return {}
  }
}

function sweepRepos(under: string, live: ReadonlySet<string>): void {
  if (!existsSync(under)) return
  for (const one of readdirSync(under)) {
    if (!one.endsWith(JSON_ENDING)) continue
    if (live.has(one.slice(0, -JSON_ENDING.length))) continue
    rmSync(join(under, one), { force: true })
  }
}

export function saidUnder(
  at: string,
  roots: Roots,
  live: ReadonlySet<string>,
  mark: string,
  known: ReadonlyMap<string, ReadonlyMap<string, string>>
): Said {
  const oids = new Map<string, ReadonlyMap<string, string>>(known)
  const held = new Map<string, Held>()
  return {
    of: (name, repo, key, work) => {
      let under = oids.get(repo)
      if (under === undefined) {
        const root = roots[repo]
        under = root === undefined ? new Map<string, string>() : oidsUnder(root, null)
        oids.set(repo, under)
      }
      const oid = under.get(key)
      if (oid === undefined) return work()
      const slot = `${name}\n${repo}`
      let rows = held.get(slot)
      if (rows === undefined) {
        rows = { rows: loaded(fileAt(at, name, mark, repo)), dirty: false }
        held.set(slot, rows)
      }
      if (oid in rows.rows) return rows.rows[oid]
      const answer = work() ?? null
      rows.rows[oid] = answer
      rows.dirty = true
      return answer
    },
    done: () => {
      for (const [slot, rows] of held) {
        if (!rows.dirty) continue
        const [name, repo] = slot.split("\n")
        if (name === undefined || repo === undefined) continue
        const file = fileAt(at, name, mark, repo)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, JSON.stringify(rows.rows))
      }
      const under = join(at, SAID_KIND)
      if (!existsSync(under)) return
      for (const name of readdirSync(under)) {
        sweep(at, SAID_KIND, name, mark)
        sweepRepos(join(under, name, mark), live)
      }
    },
  }
}

function markFor(root: string, runtime: string, oids: ReadonlyMap<string, string>): string {
  const bare: BuildContext = { roots: { [AKASHA]: root }, said: KEEPS_NOTHING }
  return markOf(SAID_KIND, ENTRY, runtime, closureOf(bare, ENTRY, oids))
}

function contextOn(
  root: string,
  roots: Roots,
  runtime: string,
  oids: ReadonlyMap<string, string>
): BuildContext {
  const live = new Set(Object.keys(rootsHere()))
  const mark = markFor(root, runtime, oids)
  const known = new Map([[AKASHA, oids]])
  return { roots, said: saidUnder(answersAt(root), roots, live, mark, known) }
}

export function contextOver(
  root: string,
  runtime: string,
  oids: ReadonlyMap<string, string>
): BuildContext {
  return contextOn(root, { [AKASHA]: root }, runtime, oids)
}

export function contextHere(
  root: string,
  runtime: string,
  oids: ReadonlyMap<string, string>
): BuildContext {
  return contextOn(root, rootsOver(root), runtime, oids)
}
