import { existsSync, readdirSync } from "node:fs"
import { join, resolve } from "node:path"
import { codeRoot } from "@akasha/pages/code-root"
import { ran } from "@akasha/utils/run/running"
import { valuesOf } from "../../../../temper/temper-commands/argument-word-reading/argument-word-reading.module.code.ts"
import { inNameOrder } from "../../../../temper/temper-commands/name-ordering/name-ordering.module.code.ts"
import type { Answer } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"

const DATA = 2
const FAILED = 3

const UNDER = "temper"
const CONFIG = "tsconfig.json"
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

function packagesUnder(at: string): readonly string[] {
  const folders = readdirSync(at, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => one.name)
  return inNameOrder(folders.filter((one) => existsSync(join(at, one, CONFIG))))
}

function judged(root: string, at: string, name: string, left: number): Judged {
  const here = join(at, name)
  const called = [join(root, COMPILER_AT), ...COMPILER, join(here, CONFIG)]
  const said = ran(called, { cwd: root, timeout: left })
  const lines = `${said.out}\n${said.err}`.split("\n").map((one) => one.trim())
  const errors = lines.filter((one) => one.includes(SAYS_ERROR))
  const files = lines.filter((one) => one.startsWith("/") && !one.includes(SAYS_ERROR))
  return {
    name,
    readFiles: files.length,
    ownFiles: files.filter((one) => one.startsWith(`${here}/`)).length,
    errors,
    code: said.code,
  }
}

function totalled(all: readonly Judged[], of: (one: Judged) => number): number {
  return all.reduce((sum, one) => sum + of(one), 0)
}

function reportOf(all: readonly Judged[], at: string): readonly string[] {
  const lines: string[] = []
  for (const one of all) lines.push(...one.errors)
  for (const one of all) {
    lines.push(
      `${one.name}: ${String(one.errors.length)} error(s), ${String(one.ownFiles)} own file(s) of ${String(one.readFiles)} read, exit ${String(one.code)}`
    )
  }
  lines.push(
    `typechecked ${String(all.length)} package(s) under ${at}: read ${String(totalled(all, (one) => one.readFiles))} file(s), ${String(totalled(all, (one) => one.ownFiles))} of them the packages' own, and found ${String(totalled(all, (one) => one.errors.length))} error(s)`
  )
  return lines
}

export function temperPackageTypecheck(argv: readonly string[] = []): Answer {
  const root = resolve(valuesOf(argv, "--code-root")[0] ?? codeRoot())
  const at = join(root, UNDER)
  if (!existsSync(at)) {
    return refused(`${root} holds no ${UNDER}/, so nothing there is a package to typecheck`, DATA)
  }

  const every = packagesUnder(at)
  const asked = valuesOf(argv, "--package")
  const unknown = asked.filter((one) => !every.includes(one))
  if (unknown.length > 0) {
    return refused(
      `${unknown.join(", ")} names no folder under ${at} carrying a ${CONFIG}, so there is nothing to typecheck it against`,
      DATA
    )
  }
  const taking = asked.length > 0 ? inNameOrder(asked) : every
  if (taking.length === 0) {
    return refused(
      `no folder under ${at} carries a ${CONFIG}, so a clean run here would report nothing typechecked`,
      DATA
    )
  }

  const deadline = Date.now() + CEILING_MS
  const all: Judged[] = []
  for (const name of taking) {
    const left = deadline - Date.now()
    if (left <= 0) {
      return refused(
        `the run passed its ceiling of ${String(CEILING_MS / A_MINUTE)} minutes before ${name} was typechecked, so what it would have found is unknown`,
        FAILED
      )
    }
    all.push(judged(root, at, name, left))
  }

  const report = reportOf(all, at)
  const refusals: string[] = []
  for (const one of all.filter((row) => row.ownFiles === 0)) {
    refusals.push(
      `${one.name} compiled none of its own files, so a clean result here is a result over nothing`
    )
  }
  for (const one of all.filter((row) => row.code !== 0)) {
    refusals.push(`${one.name} failed to typecheck (exit ${String(one.code)})`)
  }
  return { report, refusals, code: refusals.length > 0 ? FAILED : 0 }
}
