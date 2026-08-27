import type { BuildContext, Said, SaidName } from "../../graph/build-context/build-context.ts"
import type { Roots } from "../../page/page.ts"
import { KEEPS_NOTHING } from "../../graph/build-context/build-context.ts"
import { AKASHA } from "../../repo/roots/roots.ts"
import { type Key, answerAt, answersAt, cacheAnswer, sweep } from "../cache.ts"
import { closureOf } from "../closure/closure.ts"
import { markOf } from "../mark/mark.ts"
import { oidsUnder } from "../../repo/oid/oid.ts"

export const SAID_KIND = "said"

const ENGINE = "graph/ask.ts"

const SAID_FIELD = "said"

export type MarkFor = (entry: string) => string

function keyOf(name: string, mark: string, oid: string): Key {
  return { kind: SAID_KIND, name, mark, subject: oid }
}

function heldIn(answer: unknown): { readonly said: unknown } | null {
  if (answer === null || typeof answer !== "object") return null
  return SAID_FIELD in answer ? (answer as { readonly said: unknown }) : null
}

export function saidUnder(
  at: string,
  roots: Roots,
  markFor: MarkFor,
  known: ReadonlyMap<string, ReadonlyMap<string, string>>
): Said {
  const oids = new Map<string, ReadonlyMap<string, string>>(known)
  // Each name against the mark its answers were filed under, so `done` sweeps every name by its
  // own mark rather than by one shared across them.
  const marked = new Map<string, string>()
  return {
    of: (said, repo, key, work) => {
      let under = oids.get(repo)
      if (under === undefined) {
        const root = roots[repo]
        under = root === undefined ? new Map<string, string>() : oidsUnder(root, null)
        oids.set(repo, under)
      }
      const oid = under.get(key)
      if (oid === undefined) return work()
      const mark = markFor(said.entry)
      marked.set(said.name, mark)
      const named = keyOf(said.name, mark, oid)
      const held = heldIn(answerAt(at, named))
      if (held !== null) return held.said
      const answer = work() ?? null
      cacheAnswer(at, named, { [SAID_FIELD]: answer })
      return answer
    },
    done: () => {
      for (const [name, mark] of marked) sweep(at, SAID_KIND, name, mark)
    },
  }
}

/**
 * A mark for each held answer, taken over the closure of the code that works that answer out.
 *
 * ONE MARK OVER THE WHOLE ENGINE CHARGED EVERY PRODUCER FOR ANY ONE'S CHANGE. Landing the
 * `contains` producer, which holds no answers at all and reads everything off the path, put a file
 * in the engine's closure and so dropped all 59,376 answers held by `typescript`, whose extraction
 * had not moved. A closure taken from the answering file holds only what that answer depends on: a
 * shared helper appears in both closures, and a producer reading another's output has that other
 * inside its own.
 *
 * AN ENTRY THE GRAPH DOES NOT REACH FALLS BACK TO THE ENGINE, because a closure of no files hashes
 * to a mark that never moves, and an answer under a mark that never moves outlives every change to
 * the code that wrote it. Falling back is over-eager, which is the safe direction to be wrong in.
 */
export function marksHere(
  root: string,
  runtime: string,
  oids: ReadonlyMap<string, string>
): MarkFor {
  const bare: BuildContext = { roots: { [AKASHA]: root }, said: KEEPS_NOTHING }
  const held = new Map<string, string>()
  return (entry) => {
    const had = held.get(entry)
    if (had !== undefined) return had
    const reached = closureOf(bare, entry, oids)
    const inputs = reached.length === 0 ? closureOf(bare, ENGINE, oids) : reached
    const made = markOf(SAID_KIND, entry, runtime, inputs)
    held.set(entry, made)
    return made
  }
}

export function contextOver(
  root: string,
  runtime: string,
  oids: ReadonlyMap<string, string>
): BuildContext {
  const roots = { [AKASHA]: root }
  const known = new Map([[AKASHA, oids]])
  return { roots, said: saidUnder(answersAt(root), roots, marksHere(root, runtime, oids), known) }
}
