import { homedir } from "node:os"
import { basename, join, resolve } from "node:path"

const TILDE = "~"

const TILDE_IN = "~/"

const CD = "cd"

const MOVING: readonly string[] = [CD, "pushd"]

const POPPING = "popd"

const BACK = "-"

const FLAG = "-"

const EXPANDED = /[$`]/

export type Move = { readonly by: string; readonly to: string | null }

export function placedFrom(here: string, said: string): string {
  if (said === TILDE) return homedir()
  if (said.startsWith(TILDE_IN)) return join(homedir(), said.slice(TILDE_IN.length))
  return resolve(here, said)
}

function movedTo(one: Move, here: string, left: string, pushed: string[]): string | undefined {
  if (one.by === POPPING) return pushed.pop()
  if (one.by !== CD) pushed.push(here)
  if (one.to === null) return undefined
  return one.to === BACK ? left : placedFrom(here, one.to)
}

export function hereOf(moves: readonly Move[], from: string): string {
  let here = from
  let left = from
  const pushed: string[] = []
  for (const one of moves) {
    const next = movedTo(one, here, left, pushed)
    if (next === undefined) continue
    left = here
    here = next
  }
  return here
}

export function movesOf(words: readonly string[]): readonly Move[] {
  const by = basename(words[0] ?? "")
  if (by === POPPING) return [{ by, to: null }]
  if (!MOVING.includes(by)) return []
  const to = words.slice(1).find((one) => one === BACK || !one.startsWith(FLAG))
  if (to === undefined) return [{ by, to: by === CD ? TILDE : null }]
  return [{ by, to: EXPANDED.test(to) ? null : to }]
}

export function apart(moves: Move[], read: () => undefined): undefined {
  const kept = moves.length
  read()
  moves.splice(kept)
}
