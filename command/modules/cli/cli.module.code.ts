import { Buffer } from "node:buffer"
import { writerIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  refusedBy,
  unclassified,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Outside } from "akasha/command/modules/calling/calling.module.code.ts"
import { calling } from "akasha/command/modules/calling/calling.module.code.ts"
import { authorIn } from "akasha/command/modules/commit-author/commit-author.module.code.ts"
import { callNow, refusalOf } from "akasha/command/modules/lone-calling/lone-calling.module.code.ts"
import { rootIn } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { writtenWhole } from "akasha/file/system/modules/whole-writing/whole-writing.module.code.ts"
import {
  type Sinks,
  scrubbedAbove,
  scrubbedRun,
  scrubberFor,
} from "akasha/story/lore-disclosure/modules/lore-scrubbing/lore-scrubbing.module.code.ts"

const CALLED_AS = "akasha"

type Said = {
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

export async function unclassifying(
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

export async function scrubbedCode(
  argv: readonly string[],
  env: Readonly<Record<string, string | undefined>>,
  at: string,
  sinks: Sinks
): Promise<number | null> {
  const agentId = writerIn(env)
  if (agentId === null) return null
  const scrubber = scrubberFor(rootIn(env, at), agentId)
  if (scrubber === null) return null
  return await scrubbedRun([process.execPath, at, ...argv], scrubber, sinks)
}

function spilled(fd: number, lines: readonly string[]): undefined {
  if (lines.length === 0) return
  writtenWhole(fd, Buffer.from(lines.map((one) => `${one}\n`).join("")))
}

const PRINTED: Sinks = {
  out: (text) => writtenWhole(1, Buffer.from(text)),
  err: (text) => writtenWhole(2, Buffer.from(text)),
}

if (import.meta.main) {
  const argv = process.argv.slice(2)
  const above = scrubbedAbove(process.env, process.ppid)
  const joined = above ? null : refusalOf(callNow(argv, process.env, import.meta.path))
  const scrubbed =
    above || joined !== null
      ? null
      : await scrubbedCode(argv, process.env, import.meta.path, PRINTED)
  if (scrubbed !== null) process.exit(scrubbed)
  const said =
    joined === null
      ? await unclassifying(argv, process.env, import.meta.path, process.cwd())
      : saidOf(refusedBy(joined))
  spilled(1, said.out)
  spilled(2, said.err)
  process.exit(said.code)
}
