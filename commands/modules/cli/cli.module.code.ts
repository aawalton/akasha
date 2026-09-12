import { Buffer } from "node:buffer"
import { writerIn } from "akasha/agents/read-record/read-record.module.code.ts"
import { unclassified } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Outside } from "akasha/commands/modules/calling/calling.module.code.ts"
import { calling } from "akasha/commands/modules/calling/calling.module.code.ts"
import { authorIn } from "akasha/commands/modules/commit-author/commit-author.module.code.ts"
import { rootIn } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { writtenWhole } from "akasha/utils/fs/whole-writing/whole-writing.module.code.ts"

const CALLED_AS = "akasha"

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
  return {
    root: rootIn(env, at),
    calledAs: CALLED_AS,
    from,
    writer: authorIn(env),
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
    return saidOf(unclassified(thrown, CALLED_AS))
  }
}

export function spilled(fd: number, lines: readonly string[]): undefined {
  if (lines.length === 0) return
  writtenWhole(fd, Buffer.from(lines.map((one) => `${one}\n`).join("")))
}

if (import.meta.main) {
  const said = await answering(process.argv.slice(2), process.env, import.meta.path, process.cwd())
  spilled(1, said.out)
  spilled(2, said.err)
  process.exit(said.code)
}
