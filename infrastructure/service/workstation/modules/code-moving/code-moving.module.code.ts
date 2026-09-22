import { readFileSync } from "node:fs"
import { RESTART_EXIT } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

export type Moved = {
  readonly from: string
  readonly to: string
}

export type Moving =
  | { readonly moving: "moved"; readonly moved: Moved }
  | { readonly moving: "still" }
  | { readonly moving: "unknown"; readonly why: string }

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

export function saidOfNoBundle(at: string): string {
  return (
    `this run cannot tell whether the code it is running has moved, because the unit beside ` +
    `${at} names no bundle, so nothing here ends this run when the code it came out of moves, ` +
    "and a deploy has to restart it"
  )
}

export function saidOfMoved(moved: Moved): string {
  return (
    `the code this run is running moved from ${moved.from} to ${moved.to}, so this run ends on ` +
    `${RESTART_EXIT} here, where the unit of work before it has landed, for systemd to start it ` +
    "again on the code that commit holds"
  )
}

export function movingUnder(at: string, from: string | null): Moving {
  const to = bundleNamedBy(at)
  if (to === null || from === null) return { moving: "unknown", why: saidOfNoBundle(at) }
  return from === to ? { moving: "still" } : { moving: "moved", moved: { from, to } }
}

const HERE = import.meta.dir

const SELF = import.meta.path

const STARTED: string | null = bundleCommitIn(SELF)

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
