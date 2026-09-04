import { dirname, join, relative } from "node:path"
import { counted } from "../../../command-system/asking/asking.module.code.ts"
import type { FileEdit } from "../../../command-system/landing/landing.module.code.ts"
import type { Placed } from "../../../command-system/outside-naming/outside-naming.module.code.ts"
import {
  namesIn,
  spelledRespelt,
  splicedOver,
} from "../../../command-system/outside-naming/outside-naming.module.code.ts"
import type { Carry } from "../../../command-system/reading/reading.module.code.ts"
import { blobIdOf } from "../../../command-system/reading/reading.module.code.ts"

const HERE = "."

const CLIMBS = ".."

const UNDER = "/"

export const OUTSIDE_SPELLING =
  "a path that moved is looked for as the path itself and as a relative reach resolved against " +
  "the folder of the file carrying that reach, so a body naming what moved by any other spelling " +
  "is left alone"

export type Outside = {
  readonly paths: readonly string[]
  readonly reaching: readonly string[]
  readonly changes: readonly FileEdit[]
  readonly carries: readonly Carry[]
}

export function arrivalOf(landed: string, moved: ReadonlyMap<string, string>): string | null {
  const whole = moved.get(landed)
  if (whole !== undefined) return whole
  let held = ""
  let found: string | null = null
  for (const [was, now] of moved) {
    if (was.length <= held.length || !landed.startsWith(`${was}${UNDER}`)) continue
    held = was
    found = `${now}${landed.slice(was.length)}`
  }
  return found
}

export function reachedFrom(from: string, said: string): string | null {
  const at = join(from, said)
  const landed = at.endsWith(UNDER) ? at.slice(0, -1) : at
  if (landed === HERE || landed === CLIMBS || landed.startsWith(`${CLIMBS}${UNDER}`)) return null
  return landed
}

export function saidFrom(from: string, to: string): string {
  const said = relative(from, to)
  return said.startsWith(CLIMBS) ? said : `${HERE}${UNDER}${said}`
}

export function reachesIn(
  path: string,
  text: string,
  moved: ReadonlyMap<string, string>
): readonly Placed[] {
  const from = dirname(path)
  const scan = /(?<![A-Za-z0-9._@/-])\.\.?\/[A-Za-z0-9._/-]*/g
  const found: Placed[] = []
  for (let one = scan.exec(text); one !== null; one = scan.exec(text)) {
    const said = one[0]
    const landed = reachedFrom(from, said)
    if (landed === null) continue
    const now = arrivalOf(landed, moved)
    if (now === null) continue
    const tail = said.endsWith(UNDER) ? UNDER : ""
    found.push({ at: one.index, was: said, now: `${saidFrom(from, now)}${tail}` })
  }
  return found
}

export function repointedText(
  path: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string {
  return splicedOver(text, [...namesIn(text, moved), ...reachesIn(path, text, moved)])
}

export function outsideIn(
  root: string,
  base: string,
  moved: ReadonlyMap<string, string>,
  already: ReadonlySet<string>
): Outside | { readonly refusal: string } {
  const found = spelledRespelt(
    root,
    base,
    [...moved.keys()],
    (path, text) => repointedText(path, text, moved),
    already
  )
  if ("refusal" in found) return found
  const paths: string[] = []
  const reaching: string[] = []
  const changes: FileEdit[] = []
  const carries: Carry[] = []
  for (const one of found.respelt) {
    paths.push(one.path)
    if (reachesIn(one.path, one.was, moved).length > 0) reaching.push(one.path)
    carries.push({ was: one.path, now: one.path, from: blobIdOf(one.held) })
    changes.push({ path: one.path, body: new TextEncoder().encode(one.text), carried: true })
  }
  return { paths, reaching, changes, carries }
}

export function outsideSaid(
  paths: readonly string[],
  reaching: readonly string[],
  dry: boolean
): readonly string[] {
  if (paths.length === 0) {
    return ["no further file spelled what moved by its path", OUTSIDE_SPELLING]
  }
  const said = [
    `${counted(paths.length, "file")} spelling what moved by its path ` +
      `${dry ? "would be" : "was"} repointed — ${paths.join(", ")}`,
  ]
  if (reaching.length > 0) {
    said.push(
      `${counted(reaching.length, "file")} of them ${dry ? "would reach" : "reached"} in by a ` +
        `relative path rather than by the path itself — ${reaching.join(", ")}`
    )
  }
  said.push(OUTSIDE_SPELLING)
  return said
}
