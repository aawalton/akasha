import { type FSWatcher, watch } from "node:fs"
import { dirname, join } from "node:path"
import { akashaObservedOf } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import { workingOf } from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import {
  everyOfType,
  type Listed,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const TRANSCRIPT_KEY = "transcript-path"

const LOOKED_AGAIN_MS = 5_000

const SETTLE_MS = 100

type Sat = {
  readonly id: string
  readonly slug: string
}

type Observed = (id: string) => Readonly<Record<string, unknown>> | null

export function transcriptsAmong(
  seats: readonly Listed[],
  observed: Observed = akashaObservedOf
): ReadonlyMap<string, Sat> {
  const found = new Map<string, Sat>()
  for (const one of seats) {
    const slug = partedIn(one.path)?.slug
    if (slug === undefined) continue
    let held: Readonly<Record<string, unknown>> | null
    try {
      held = observed(one.id)
    } catch {
      continue
    }
    const path = held?.[TRANSCRIPT_KEY]
    if (typeof path === "string" && path !== "") found.set(path, { id: one.id, slug })
  }
  return found
}

export function refreshingTurns(root: string, grew: (sat: Sat) => undefined): () => undefined {
  let transcripts: ReadonlyMap<string, Sat> = new Map()
  const watchers = new Map<string, FSWatcher>()
  const settling = new Map<string, ReturnType<typeof setTimeout>>()

  const heard = (path: string): undefined => {
    const sat = transcripts.get(path)
    if (sat === undefined || settling.has(path)) return undefined
    settling.set(
      path,
      setTimeout(() => {
        settling.delete(path)
        try {
          workingOf(sat.id)
        } catch (thrown) {
          process.stderr.write(`the turn of ${sat.slug} was not read again: ${String(thrown)}\n`)
        }
        grew(sat)
      }, SETTLE_MS)
    )
    return undefined
  }

  const look = (): undefined => {
    const had = transcripts
    try {
      transcripts = transcriptsAmong(everyOfType(root, seat.slug))
    } catch (thrown) {
      process.stderr.write(`the seats' transcripts were not found: ${String(thrown)}\n`)
      return undefined
    }
    const folders = new Set([...transcripts.keys()].map((one) => dirname(one)))
    for (const [folder, watcher] of watchers) {
      if (folders.has(folder)) continue
      watcher.close()
      watchers.delete(folder)
    }
    for (const folder of folders) {
      if (watchers.has(folder)) continue
      try {
        const watcher = watch(folder, (_, name) => {
          if (typeof name === "string" && name !== "") heard(join(folder, name))
        })
        watcher.on("error", () => {
          watcher.close()
          watchers.delete(folder)
        })
        watchers.set(folder, watcher)
      } catch (thrown) {
        process.stderr.write(`${folder} is not watched: ${String(thrown)}\n`)
      }
    }
    for (const path of transcripts.keys()) if (!had.has(path)) heard(path)
    return undefined
  }

  look()
  const beat = setInterval(look, LOOKED_AGAIN_MS)
  return () => {
    clearInterval(beat)
    for (const watcher of watchers.values()) watcher.close()
    watchers.clear()
    for (const timer of settling.values()) clearTimeout(timer)
    settling.clear()
    return undefined
  }
}
