import { writeFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import { whyOf } from "@akasha/command-system/fault-saying"
import { notices } from "@akasha/seat-system/compose-notices"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"

export const OUT = "--out"

export type Read = { readonly out: string | null } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let out: string | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const one = argv[i]
    if (one === OUT) {
      const value = argv[i + 1]
      if (value === undefined) refusals.push(`\`${OUT}\` takes a value, and none was named`)
      else {
        i += 1
        out = value
      }
      continue
    }
    refusals.push(`\`${one}\` is no word this takes — it takes \`${OUT} <path>\``)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { out }
}

export function saidOf(found: Readonly<Record<string, string>>): string {
  return JSON.stringify(found, null, 2)
}

export function pathOf(said: string, root: string): string {
  return isAbsolute(said) ? said : resolve(root, said)
}

export function seatComposeNotices(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  let found: Readonly<Record<string, string>>
  try {
    found = notices()
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 1 }
  }
  try {
    const json = saidOf(found)
    if (read.out === null) return { report: [json], refusals: [], code: 0 }
    writeFileSync(pathOf(read.out, resolve(given.root)), `${json}\n`)
    return { report: [], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
