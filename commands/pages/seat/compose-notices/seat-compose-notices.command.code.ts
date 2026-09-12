import { writeFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import { notices } from "akasha/agents/messaging/notices/compose-notices/compose-notices.module.code.ts"
import {
  faulted,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

export const OUTPUT = "--output"

export type Read = { readonly output: string | null } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let output: string | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const one = argv[i]
    if (one === OUTPUT) {
      const value = argv[i + 1]
      if (value === undefined) refusals.push(`\`${OUTPUT}\` takes a value, and none was named`)
      else {
        i += 1
        output = value
      }
      continue
    }
    refusals.push(`\`${one}\` is no word this takes — it takes \`${OUTPUT} <path>\``)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { output }
}

export function saidOf(found: Readonly<Record<string, string>>): string {
  return JSON.stringify(found, null, 2)
}

export function pathOf(said: string, root: string): string {
  return isAbsolute(said) ? said : resolve(root, said)
}

export function seatComposeNotices(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  let found: Readonly<Record<string, string>>
  try {
    found = notices()
  } catch (thrown) {
    return faulted(thrown)
  }
  try {
    const json = saidOf(found)
    if (read.output === null) return { report: [json], refusals: [], code: 0 }
    writeFileSync(pathOf(read.output, resolve(given.root)), `${json}\n`)
    return { report: [], refusals: [], code: 0 }
  } catch (thrown) {
    return faulted(thrown)
  }
}
