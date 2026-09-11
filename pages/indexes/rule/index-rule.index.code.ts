import { join } from "node:path"
import { digestOf } from "akasha/code-system/carried-file/carried-file.module.code.ts"
import { speltIn } from "akasha/code-system/code-rule/code-rule.module.code.ts"
import { typed } from "akasha/code-system/code-typing/code-typing.module.code.ts"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { under } from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import { indexRule } from "akasha/pages/indexes/rule/index-rule.index.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const RULE = indexRule.name

const SAID = "said"

const READ = "read/at-path"

const ENDING = ".jsonl"

const BYTES = new TextEncoder()

export type Said = {
  readonly path: string
  readonly place: number
  readonly name: string
}

export function saidAt(rule: string): string {
  return join(RULE, SAID, `${digestOf(BYTES.encode(rule))}${ENDING}`)
}

export function ruleIn(body: string, path: string, repo: string): readonly Entry[] {
  const own = under(repo, path)
  if (!typed(own)) return []
  const spelt = speltIn(own, body).filter((one) => !one.forwards)
  return [
    { at: join(RULE, `${READ}${ENDING}`), line: JSON.stringify({ path: own }) },
    ...spelt.map((one, place) => ({
      at: saidAt(one.rule),
      line: JSON.stringify({ path: own, place, name: one.name }),
    })),
  ]
}

export function pathsRead(reading: Reading): ReadonlySet<string> {
  const found = new Set<string>()
  for (const line of reading.lines(join(RULE, `${READ}${ENDING}`))) {
    found.add((JSON.parse(line) as { readonly path: string }).path)
  }
  return found
}

export function ruleWhole(reading: Reading, named: readonly string[]): boolean {
  if (!reading.holds(RULE)) return false
  const read = pathsRead(reading)
  return named.every((one) => !typed(one) || read.has(one))
}

export function saidOf(reading: Reading, rule: string): readonly Said[] {
  const found = reading.lines(saidAt(rule)).map((line) => JSON.parse(line) as Said)
  return found.sort((one, two) => {
    if (one.path !== two.path) return one.path < two.path ? -1 : 1
    return one.place - two.place
  })
}
