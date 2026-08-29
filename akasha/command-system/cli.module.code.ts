import { dirname, resolve } from "node:path"
import type { Answer, Outside } from "./calling.module.code.ts"
import { calling } from "./calling.module.code.ts"

export const OK = 0

export const INPUT = 1

export const DATA = 2

export const OPERATIONAL = 3

export const UNCLASSIFIED = 70

export const AUTHOR = "Akasha <akasha@alanwalton.com>"

export type Said = {
  readonly out: readonly string[]
  readonly err: readonly string[]
  readonly code: number
}

export function rootOf(at: string): string {
  return resolve(dirname(at), "..", "..")
}

export function outsideOf(
  argv: readonly string[],
  env: Readonly<Record<string, string | undefined>>,
  at: string,
  from: string
): Outside {
  const stated = env["AKASHA_ROOT"]
  const said = env["AKASHA_WRITER"]
  return {
    root: stated === undefined || stated === "" ? rootOf(at) : resolve(stated),
    calledAs: "akasha",
    from,
    writer: said === undefined || said === "" ? AUTHOR : said,
  }
}

export function saidOf(answer: Answer): Said {
  return { out: answer.report, err: answer.refusals, code: answer.code }
}

export function answering(
  argv: readonly string[],
  env: Readonly<Record<string, string | undefined>>,
  at: string,
  from: string
): Said {
  try {
    return saidOf(calling(argv, outsideOf(argv, env, at, from)))
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { out: [], err: [`akasha: ${why}`], code: UNCLASSIFIED }
  }
}

if (import.meta.main) {
  const said = answering(process.argv.slice(2), process.env, import.meta.path, process.cwd())
  for (const one of said.out) process.stdout.write(`${one}\n`)
  for (const one of said.err) process.stderr.write(`${one}\n`)
  process.exit(said.code)
}
