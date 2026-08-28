import type { BuildContext, Said, SaidName } from "../../graph/build-context/build-context.ts"
import type { Roots } from "../../page/page.ts"
import { KEEPS_NOTHING } from "../../graph/build-context/build-context.ts"
import { AKASHA } from "../../repo/roots/roots.ts"
import { type Key, answerAt, answersAt, answersUnder, cacheAnswer, forget, sweep } from "../cache.ts"
import { closureOf } from "../closure/closure.ts"
import { HELD_ANSWERS } from "../../graph/ask.ts"
import { markOf } from "../mark/mark.ts"
import { oidsUnder } from "../../repo/oid/oid.ts"

export const SAID_KIND = "said"

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
  known: ReadonlyMap<string, ReadonlyMap<string, string>>,
  live: readonly SaidName[]
): Said {
  const oids = new Map<string, ReadonlyMap<string, string>>(known)
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
    held: (said) => {
      const found = answersUnder(at, SAID_KIND, said.name, markFor(said.entry))
      if (found === null) return null
      const out = new Map<string, unknown>()
      for (const [subject, answer] of found) {
        const one = heldIn(answer)
        if (one !== null) out.set(subject, one.said)
      }
      return out
    },
    done: () => {
      for (const [name, mark] of marked) sweep(at, SAID_KIND, name, mark)
      forget(at, SAID_KIND, live.map((one) => one.name))
    },
  }
}

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
    const made = markOf(SAID_KIND, entry, runtime, closureOf(bare, entry, oids))
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
  const markFor = marksHere(root, runtime, oids)
  return { roots, said: saidUnder(answersAt(root), roots, markFor, known, HELD_ANSWERS) }
}
