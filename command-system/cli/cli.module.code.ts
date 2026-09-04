import { Buffer } from "node:buffer"
import { writeSync } from "node:fs"
import { resolve } from "node:path"
import type { Answer, Outside } from "../calling/calling.module.code.ts"
import { calling } from "../calling/calling.module.code.ts"
import { AUTHOR } from "../committing/committing.module.code.ts"
import { saidBy } from "../fault-saying/fault-saying.module.code.ts"
import { writerIn } from "../reading/reading.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"

export const OK = 0

export const INPUT = 1

export const DATA = 2

export const OPERATIONAL = 3

export const UNCLASSIFIED = 70

export type Said = {
  readonly out: readonly string[]
  readonly err: readonly string[]
  readonly code: number
}

export function outsideOf(
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
    agentId: writerIn(env),
  }
}

export function saidOf(answer: Answer): Said {
  return { out: answer.report, err: answer.refusals, code: answer.code }
}

export async function answering(
  argv: readonly string[],
  env: Readonly<Record<string, string | undefined>>,
  at: string,
  from: string
): Promise<Said> {
  try {
    return saidOf(await calling(argv, outsideOf(env, at, from)))
  } catch (thrown) {
    const why = saidBy(thrown)
    return { out: [], err: [`akasha: ${why}`], code: UNCLASSIFIED }
  }
}

export function spilled(fd: number, lines: readonly string[]): undefined {
  if (lines.length === 0) return
  const bytes = Buffer.from(lines.map((one) => `${one}\n`).join(""))
  let gone = 0
  while (gone < bytes.length) {
    try {
      gone += writeSync(fd, bytes, gone)
    } catch (thrown) {
      if ((thrown as { code?: string }).code !== "EAGAIN") throw thrown
    }
  }
}

if (import.meta.main) {
  const said = await answering(process.argv.slice(2), process.env, import.meta.path, process.cwd())
  spilled(1, said.out)
  spilled(2, said.err)
  process.exit(said.code)
}
