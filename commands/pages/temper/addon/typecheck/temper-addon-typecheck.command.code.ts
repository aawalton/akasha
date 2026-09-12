import { join, resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  naming,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperAddonTypecheck as page } from "akasha/commands/pages/temper/addon/typecheck/temper-addon-typecheck.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { compilerConfigPathFor } from "akasha/temper/addon-build/modules/addon-compiler-config/addon-compiler-config.module.code.ts"
import {
  type AddonInfo,
  listAllAddons,
} from "akasha/temper/addons-resolve/modules/addon-roster/addon-roster.module.code.ts"
import { saidBy as saidOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const NAMED = [codeRootArgument]

const COMPILER_AT = "node_modules/typescript-7/bin/tsc"

const COMPILER = ["--noEmit", "--listFiles", "-p"]

const CEILING_MS = 30 * 60 * 1000

const A_MINUTE = 60000

const SAYS_ERROR = "error TS"

type Judged = {
  readonly name: string
  readonly readFiles: number
  readonly ownFiles: number
  readonly errors: readonly string[]
  readonly code: number
}

function inNameOrder(all: readonly AddonInfo[]): readonly AddonInfo[] {
  return [...all].sort((a, b) => a.canonicalName.localeCompare(b.canonicalName))
}

function judged(root: string, one: AddonInfo, config: string, left: number): Judged {
  const called = [join(root, COMPILER_AT), ...COMPILER, config]
  const said = ran(called, { cwd: root, timeout: left })
  const lines = `${said.out}\n${said.err}`.split("\n").map((line) => line.trim())
  const errors = lines.filter((line) => line.includes(SAYS_ERROR))
  const files = lines.filter((line) => line.startsWith("/") && !line.includes(SAYS_ERROR))
  return {
    name: one.canonicalName,
    readFiles: files.length,
    ownFiles: files.filter((line) => line.startsWith(`${one.dir}/`)).length,
    errors,
    code: said.code,
  }
}

function rowOf(one: Judged): string {
  return `${one.name}: ${String(one.errors.length)} error(s), ${String(one.ownFiles)} own file(s) of ${String(one.readFiles)} read, exit ${String(one.code)}`
}

async function typechecked(done: string[], root: string): Promise<Answer> {
  const every = inNameOrder(listAllAddons({ repoRoot: root }))
  if (every.length === 0) {
    return refused(
      `${root} holds no addon folder carrying an addon manifest, so a clean run here would typecheck nothing`,
      DATA
    )
  }

  const deadline = Date.now() + CEILING_MS
  const rows: Judged[] = []
  const unbuilt: string[] = []

  for (const one of every) {
    const left = deadline - Date.now()
    if (left <= 0) {
      return refused(
        `the run passed its ceiling of ${String(CEILING_MS / A_MINUTE)} minutes before ${one.canonicalName} was typechecked, so what it would have found is unknown`,
        OPERATIONAL
      )
    }

    let config: string | null
    try {
      config = await compilerConfigPathFor(root, one.dir, one.canonicalName, done)
    } catch (thrown) {
      throw new Error(
        `${one.canonicalName} names no settings the compiler could be run with — ${saidOf(thrown)}`
      )
    }
    if (config === null) {
      unbuilt.push(one.canonicalName)
      continue
    }

    const said = judged(root, one, config, left)
    rows.push(said)
    if (said.code !== 0) {
      return answeredWith(
        [...said.errors, ...rows.map(rowOf)],
        [
          `${said.name} does not typecheck against its own compiler settings (exit ${String(said.code)}, ${String(said.errors.length)} error(s)), so the addons after it were left unread`,
        ],
        OPERATIONAL
      )
    }
    if (said.ownFiles === 0) {
      return answeredWith(
        rows.map(rowOf),
        [
          `${said.name} compiled none of its own ${String(said.readFiles)} read file(s), so a clean result here is a result over nothing`,
        ],
        OPERATIONAL
      )
    }
  }

  const readFiles = rows.reduce((sum, one) => sum + one.readFiles, 0)
  const ownFiles = rows.reduce((sum, one) => sum + one.ownFiles, 0)
  const report = [...rows.map(rowOf)]
  for (const name of unbuilt) {
    report.push(`${name}: no bundle entry is named, so nothing of it was compiled`)
  }
  report.push(
    `typechecked ${String(rows.length)} addon(s) of the ${String(every.length)} under ${root}: read ${String(readFiles)} file(s), ${String(ownFiles)} of them the addons' own`
  )
  return told(report)
}

export type Judging = (done: string[], root: string) => Promise<Answer>

async function typecheckedBy(root: string, judging: Judging = typechecked): Promise<Answer> {
  return await answering(async (done) => naming(done, await judging(done, root)))
}

export async function temperAddonTypecheck(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  return await typecheckedBy(resolve(read.taken.codeRoot ?? codeRoot()))
}
