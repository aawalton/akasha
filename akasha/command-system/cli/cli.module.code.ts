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

if (import.meta.main) {
  const said = await answering(process.argv.slice(2), process.env, import.meta.path, process.cwd())
  // A PIPE TAKES AN ANSWER IN PIECES, and `process.exit` gives up whatever has not left yet, so a
  // large answer reaching a piped reader ended at a 64 KiB boundary. Measured: the 985,937-byte
  // `page-tree` answer came back short in 5 runs of 8 through a pipe and was whole every time into
  // a file, and a probe of one line that size lost bytes 6 times in 6. `Bun.write` is awaited, so
  // what is printed is out before the code is given, and the code still ends the process at once.
  if (said.out.length > 0) await Bun.write(Bun.stdout, said.out.map((one) => `${one}\n`).join(""))
  if (said.err.length > 0) await Bun.write(Bun.stderr, said.err.map((one) => `${one}\n`).join(""))
  process.exit(said.code)
}
