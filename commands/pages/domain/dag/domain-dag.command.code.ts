import { resolve } from "node:path"
import { refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"
import {
  type Drawn,
  dagLines,
} from "akasha/commands/pages/domain/dag/domain-drawing/domain-drawing.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const AT_DOMAIN = "--domain"

export const UP = "--up"

export const PATHS = "--paths"

export const DESCENT = "--descent"

const FLAGS: readonly string[] = [AT_DOMAIN, UP, PATHS, DESCENT]

export type Read = Drawn | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const rooted: string[] = []
  const above: string[] = []
  let paths = false
  let descent = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === PATHS) {
      paths = true
      continue
    }
    if (one === DESCENT) {
      descent = true
      continue
    }
    if (one === AT_DOMAIN || one === UP) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("-")) {
        refusals.push(`\`${one}\` names one word and nothing followed it`)
        continue
      }
      if (one === AT_DOMAIN) rooted.push(value)
      else above.push(value)
      continue
    }
    const taken = namesDrawn(FLAGS)
    refusals.push(`\`${one}\` is no flag this takes — it takes ${taken}`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { rooted, above, paths, descent }
}

export function domainDag(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return answeredBy(() => dagLines(read, resolve(given.root)))
}
