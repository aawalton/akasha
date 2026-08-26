import type { BuildContext, Said } from "../../graph/node-shape.ts"
import type { Roots } from "../../page/page-at.ts"
import { KEEPS_NOTHING } from "../../graph/node-shape.ts"
import { AKASHA } from "../../repo/roots.ts"
import { type Key, answerAt, answersAt, cacheAnswer, sweep } from "../cache.ts"
import { closureOf } from "../closure/closure.ts"
import { markOf } from "../mark/mark.ts"
import { oidsUnder } from "../../repo/oid.ts"

export const SAID_KIND = "said"

const ENTRY = "graph/ask.ts"

const SAID_FIELD = "said"

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
  mark: string,
  known: ReadonlyMap<string, ReadonlyMap<string, string>>
): Said {
  const oids = new Map<string, ReadonlyMap<string, string>>(known)
  const names = new Set<string>()
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
      names.add(name)
      const named = keyOf(name, mark, oid)
      const held = heldIn(answerAt(at, named))
      if (held !== null) return held.said
      const answer = work() ?? null
      cacheAnswer(at, named, { [SAID_FIELD]: answer })
      return answer
    },
    done: () => {
      for (const name of names) sweep(at, SAID_KIND, name, mark)
    },
  }
}

export function markHere(root: string, runtime: string, oids: ReadonlyMap<string, string>): string {
  const bare: BuildContext = { roots: { [AKASHA]: root }, said: KEEPS_NOTHING }
  return markOf(SAID_KIND, ENTRY, runtime, closureOf(bare, ENTRY, oids))
}

export function contextOver(
  root: string,
  runtime: string,
  oids: ReadonlyMap<string, string>
): BuildContext {
  const roots = { [AKASHA]: root }
  const known = new Map([[AKASHA, oids]])
  return { roots, said: saidUnder(answersAt(root), roots, markHere(root, runtime, oids), known) }
}
