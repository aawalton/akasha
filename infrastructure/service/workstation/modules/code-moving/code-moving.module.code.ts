import { existsSync, readFileSync } from "node:fs"
import { dirname } from "node:path"
import {
  PINNED_AT,
  stampIn,
} from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { RESTART_EXIT } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

export type Moved = {
  readonly from: string
  readonly to: string
}

export type Moving =
  | { readonly moving: "moved"; readonly moved: Moved }
  | { readonly moving: "still" }
  | { readonly moving: "unknown"; readonly why: string }

export function stampOver(at: string): string | null {
  let held = at
  let up = dirname(held)
  while (!existsSync(stampIn(held))) {
    if (up === held) return null
    held = up
    up = dirname(held)
  }
  return stampIn(held)
}

export function commitAt(at: string): string | null {
  let held: string
  try {
    held = readFileSync(at, "utf8")
  } catch {
    return null
  }
  const one = held.trim()
  return one === "" ? null : one
}

export function commitOver(at: string): string | null {
  const stamp = stampOver(at)
  return stamp === null ? null : commitAt(stamp)
}

const BUNDLE = /\/([0-9a-f]{40})\.js/

const UNIT = ".service"

const EXEC = "ExecStart="

export function bundleCommitIn(path: string): string | null {
  return BUNDLE.exec(path)?.[1] ?? null
}

export function unitBeside(at: string): string {
  return `${at}${UNIT}`
}

export function bundleNamedBy(at: string): string | null {
  let held: string
  try {
    held = readFileSync(unitBeside(at), "utf8")
  } catch {
    return null
  }
  for (const line of held.split("\n")) {
    if (!line.startsWith(EXEC)) continue
    const found = bundleCommitIn(line)
    if (found !== null) return found
  }
  return null
}

export function saidOfNoStamp(at: string): string {
  return (
    `this run cannot tell whether the code it is running has moved, because no ${PINNED_AT} ` +
    `sits at ${at} or above it and no unit beside it names a bundle, so nothing here ends this ` +
    "run when the code it came out of moves, and a deploy has to restart it"
  )
}

export function saidOfNoCommit(at: string): string {
  return (
    `this run cannot tell whether the code it is running has moved, because ${at} gave back no ` +
    "commit, so nothing here ends this run when the tree that code came out of moves, and a " +
    "deploy has to restart it"
  )
}

export function saidOfMoved(moved: Moved): string {
  return (
    `the tree this code came out of moved from ${moved.from} to ${moved.to}, so this run ends on ` +
    `${RESTART_EXIT} here, where the unit of work before it has landed, for systemd to start it ` +
    "again on the code that tree holds now"
  )
}

export function movingUnder(at: string, from: string | null): Moving {
  const stamp = stampOver(at)
  if (stamp === null) return { moving: "unknown", why: saidOfNoStamp(at) }
  const to = commitAt(stamp)
  if (to === null || from === null) return { moving: "unknown", why: saidOfNoCommit(stamp) }
  return from === to ? { moving: "still" } : { moving: "moved", moved: { from, to } }
}

const HERE = import.meta.dir

const STARTED: string | null = commitOver(HERE)

export function codeMoving(): Moving {
  return movingUnder(HERE, STARTED)
}

let SAID = false

export function leftWhereCodeMoved(): undefined {
  const moving = codeMoving()
  if (moving.moving === "still") return undefined
  if (moving.moving === "unknown") {
    if (!SAID) {
      SAID = true
      console.warn(moving.why)
    }
    return undefined
  }
  console.log(saidOfMoved(moving.moved))
  process.exit(RESTART_EXIT)
}
