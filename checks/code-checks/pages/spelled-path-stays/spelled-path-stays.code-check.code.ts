import { textOf } from "@akasha/code/body-text"
import { lineOf, literalIn, parsedAs } from "@akasha/code/code-source"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import ts from "typescript"
import {
  FILES,
  input,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const SEPARATOR = "/"

const REPO = `akasha${SEPARATOR}`

const APART = /[^\w.@+/-]+/

const NOTHING_THERE = "and this change leaves nothing there"

export type Holding = (path: string) => boolean

export function holdingOver(paths: readonly string[]): Holding {
  const held = new Set<string>()
  for (const one of paths) {
    held.add(one)
    let at = one.lastIndexOf(SEPARATOR)
    while (at > 0) {
      held.add(one.slice(0, at))
      at = one.lastIndexOf(SEPARATOR, at - 1)
    }
  }
  return (path) => held.has(path)
}

export function brokenBy(taken: readonly string[], holding: Holding): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of taken) {
    const parts = one.split(SEPARATOR)
    for (let deep = parts.length; deep > 0; deep -= 1) {
      const said = parts.slice(0, deep).join(SEPARATOR)
      if (holding(said) || found.has(said)) break
      found.add(said)
    }
  }
  return found
}

export function shallowestIn(broken: ReadonlySet<string>): readonly string[] {
  const found: string[] = []
  for (const one of broken) {
    const at = one.lastIndexOf(SEPARATOR)
    if (at > 0 && broken.has(one.slice(0, at))) continue
    found.push(one)
  }
  return found.sort()
}

export function spelledIn(text: string): readonly string[] {
  return text.split(APART).filter((one) => one !== "")
}

export function namedBy(run: string): readonly string[] {
  const shut = run.endsWith(SEPARATOR)
  const said = shut ? run.slice(0, -SEPARATOR.length) : run
  if (said === "") return []
  if (!shut && !said.includes(SEPARATOR)) return []
  if (!said.startsWith(REPO)) return [said]
  return [said, said.slice(REPO.length)]
}

export function brokenAt(run: string, broken: ReadonlySet<string>): string | null {
  for (const one of namedBy(run)) {
    if (broken.has(one)) return one
  }
  return null
}

export function reasonsIn(
  at: string,
  text: string,
  broken: ReadonlySet<string>
): readonly string[] {
  const source = parsedAs(at, text)
  const seen = new Set<string>()
  const said: string[] = []
  const walk = (node: ts.Node): undefined => {
    const value = literalIn(node)
    if (value !== null) {
      for (const run of spelledIn(value)) {
        const one = brokenAt(run, broken)
        if (one === null) continue
        const line = lineOf(source, node)
        const key = `${line}\n${one}`
        if (seen.has(key)) continue
        seen.add(key)
        said.push(`line ${line} spells \`${one}\`, ${NOTHING_THERE}`)
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return said
}

export function carrying(text: string, shallowest: readonly string[]): boolean {
  return shallowest.some((one) => text.includes(one))
}

type Sorted = {
  readonly gone: readonly string[]
  readonly made: readonly string[]
}

export function sortedBy(change: Change): Sorted {
  const gone: string[] = []
  const made: string[] = []
  for (const one of change.changed) {
    if (change.after(one) !== null) {
      made.push(one)
      continue
    }
    if (change.before(one) !== null) gone.push(one)
  }
  return { gone, made }
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const sorted = sortedBy(change)
  if (sorted.gone.length === 0) return []
  const away = new Set(sorted.gone)
  const kept = shadow.index.everyPath().filter((one) => !away.has(one))
  const left = [...new Set([...kept, ...sorted.made])].sort()
  const broken = brokenBy(sorted.gone, holdingOver(left))
  if (broken.size === 0) return []
  const shallowest = shallowestIn(broken)
  const said: Judged[] = []
  for (const path of left) {
    if (!textNamed(path)) continue
    const text = textOf(change.after(path))
    if (text === null || !carrying(text, shallowest)) continue
    for (const reason of reasonsIn(path, text, broken)) said.push({ path, reason })
  }
  return said
}

export const spelledPathStays = input(FILES, refusalsIn)
