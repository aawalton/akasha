import { existsSync, rmSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../modules/calling/calling.module.code.ts"
import { saidBy as messageOf } from "../../../../modules/fault-saying/fault-saying.module.code.ts"
import { codeRoot } from "@akasha/pages/code-root"
import {
  compilerConfigPathFor,
  TSCONFIG_NAME,
} from "akasha/temper/addon-build/addon-compiler-config/addon-compiler-config.module.code.ts"
import { copyAddonMetadata } from "akasha/temper/addon-build/addon-metadata-copy/addon-metadata-copy.module.code.ts"
import {
  COMPILER_ENTRY,
  compilerCommand,
  compilerRoot,
} from "akasha/temper/addon-build/lua-build-command/lua-build-command.module.code.ts"
import { listAllAddons, resolveAddon } from "@akasha/temper-addons-resolve/addon-roster"
import { readSiblingAddonNames, siblingDistDir } from "@akasha/temper-addons-resolve/sibling-addons"
import { ran, shown } from "@akasha/utils/run/running"
import { valuesOf } from "../../../../../temper/commands/argument-word-reading/argument-word-reading.module.code.ts"
import { inNameOrder } from "../../../../../temper/commands/name-ordering/name-ordering.module.code.ts"

const SAID_WRONG = 1
const DATA = 2
const FAILED = 3

const ADDONS_UNDER = "temper/addons"
const DIST_UNDER = "dist"
const BUNDLE_SUFFIX = ".lua"
const SAYS_ERROR = "error TS"
const CEILING_MS = 60 * 60 * 1000
const A_MINUTE = 60000

const ALL = "--all"
const BUILD_ONLY = "--build-only"
const WATCH = "--watch"
const TAKING_A_VALUE = ["--code-root", "--compiler-root"]
const TAKING_NOTHING = [ALL, BUILD_ONLY, WATCH]

const INSTALLED_BY = "temper-addon-install"

type Built = {
  readonly name: string
  readonly bundle: string
  readonly bytes: number
  readonly errors: readonly string[]
  readonly code: number
}

function said(argv: readonly string[], flag: string): boolean {
  return argv.includes(flag)
}

function walked(argv: readonly string[]): { names: string[]; unknown: string[] } {
  const names: string[] = []
  const unknown: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (TAKING_A_VALUE.includes(one)) {
      at += 1
      continue
    }
    if (TAKING_NOTHING.includes(one)) continue
    if (one.startsWith("-")) unknown.push(one)
    else names.push(one)
  }
  return { names, unknown }
}

function bytesAt(path: string): number {
  return existsSync(path) ? statSync(path).size : 0
}

function saidWrongIn(argv: readonly string[]): string | null {
  const { names, unknown } = walked(argv)
  if (unknown.length > 0) {
    return `${unknown.join(", ")} is no flag a build takes, and a flag misspelled here would otherwise read as an addon name`
  }
  if (names.length > 1) {
    return `a build names one addon, and ${names.join(", ")} names ${String(names.length)}`
  }
  const one = names[0]
  const all = said(argv, ALL)
  if (all && one !== undefined) {
    return `${ALL} builds the whole roster, so it takes no addon name, and \`${one}\` is one`
  }
  if (!all && one === undefined) {
    return `name an addon to build, or say ${ALL} to build every one of them`
  }
  if (said(argv, WATCH) && all) {
    return `${WATCH} stays in the compiler over one addon, so it is refused beside ${ALL}`
  }
  if (said(argv, WATCH) && said(argv, BUILD_ONLY)) {
    return `${WATCH} installs nothing already, so ${BUILD_ONLY} says nothing beside it`
  }
  return null
}

function compiled(
  root: string,
  compiler: string,
  config: string,
  name: string,
  bundle: string,
  left: number
): Built {
  const answered = ran(compilerCommand(compiler, config), { cwd: root, timeout: left })
  const lines = `${answered.out}\n${answered.err}`.split("\n").map((one) => one.trim())
  return {
    name,
    bundle,
    bytes: bytesAt(bundle),
    errors: lines.filter((one) => one.includes(SAYS_ERROR)),
    code: answered.code,
  }
}

function lineOf(one: Built): string {
  const held = one.code === 0 ? "written" : "emitted despite the errors"
  return `${one.name}: exit ${String(one.code)}, ${String(one.errors.length)} error(s), ${String(one.bytes)} byte(s) ${held} at ${one.bundle}`
}

function reportOf(all: readonly Built[], root: string, compiler: string): readonly string[] {
  const done = all.filter((one) => one.code === 0)
  return [
    ...all.map(lineOf),
    `built ${String(done.length)} addon(s) of ${String(all.length)} compiled from ${root} with ${compiler}, writing ${String(done.reduce((sum, one) => sum + one.bytes, 0))} byte(s) of Lua`,
  ]
}

export async function temperAddonBuild(argv: readonly string[] = []): Promise<Answer> {
  const wrong = saidWrongIn(argv)
  if (wrong !== null) return refused(wrong, SAID_WRONG)

  const { names } = walked(argv)
  const all = said(argv, ALL)
  const watch = said(argv, WATCH)

  if (!watch && !said(argv, BUILD_ONLY)) {
    return refused(
      `installing an addon waits on ${INSTALLED_BY}, which still refuses every call, so nothing here reaches the game folder. Say ${BUILD_ONLY} to build to \`${DIST_UNDER}/\`.`,
      DATA
    )
  }

  const root = resolve(valuesOf(argv, "--code-root")[0] ?? codeRoot())
  const compiler = resolve(valuesOf(argv, "--compiler-root")[0] ?? compilerRoot())
  if (!existsSync(join(compiler, COMPILER_ENTRY))) {
    return refused(
      `${compiler} holds no ${COMPILER_ENTRY}, so nothing there is the compiler this builds with`,
      DATA
    )
  }

  const roster = listAllAddons({ repoRoot: root })
  if (roster.length === 0) {
    return refused(
      `${root} holds no addon carrying a manifest, so a clean run here would report nothing built`,
      DATA
    )
  }

  let taking: readonly { readonly dir: string; readonly canonicalName: string }[]
  if (all) {
    const named = inNameOrder(roster.map((one) => one.canonicalName))
    taking = named.map(
      (name) => roster.find((one) => one.canonicalName === name) as (typeof roster)[number]
    )
  } else {
    const asked = names[0] as string
    const found = resolveAddon(asked, { repoRoot: root })
    if (!roster.some((one) => one.dir === found.dir)) {
      return refused(
        `${asked} names no addon under ${root}, whose roster holds ${String(roster.length)} of them`,
        DATA
      )
    }
    taking = [found]
  }

  const addonsRoot = join(root, ADDONS_UNDER)
  const deadline = Date.now() + CEILING_MS
  const built: Built[] = []

  for (const target of taking) {
    const left = deadline - Date.now()
    if (left <= 0) {
      return refused(
        `the run passed its ceiling of ${String(CEILING_MS / A_MINUTE)} minutes before ${target.canonicalName} was compiled, so what it would have produced is not there`,
        FAILED
      )
    }

    let config: string | null
    try {
      config = await compilerConfigPathFor(root, target.dir, target.canonicalName)
    } catch (thrown) {
      return refused(
        `${target.canonicalName} states settings a build cannot read: ${messageOf(thrown)}`,
        DATA
      )
    }
    if (config === null) {
      return refused(
        `${target.canonicalName} holds no ${TSCONFIG_NAME} in ${target.dir} and its page names no bundle entry to write one from, so there is nothing to compile`,
        DATA
      )
    }

    if (watch) {
      try {
        shown(compilerCommand(compiler, config, [WATCH]), { cwd: root })
      } catch (thrown) {
        return refused(
          `the compiler left ${WATCH} over ${target.canonicalName}: ${messageOf(thrown)}`,
          FAILED
        )
      }
      return {
        report: [`watched ${target.canonicalName} against ${config}`],
        refusals: [],
        code: 0,
      }
    }

    const bundle = join(
      addonsRoot,
      DIST_UNDER,
      target.canonicalName,
      `${target.canonicalName}${BUNDLE_SUFFIX}`
    )
    for (const stale of [
      join(addonsRoot, DIST_UNDER, target.canonicalName),
      ...readSiblingAddonNames(target.dir).map((name) => siblingDistDir(addonsRoot, name)),
    ]) {
      rmSync(stale, { recursive: true, force: true })
    }

    const one = compiled(
      root,
      compiler,
      config,
      target.canonicalName,
      bundle,
      deadline - Date.now()
    )
    built.push(one)
    if (one.code !== 0) {
      return {
        report: [...one.errors, ...reportOf(built, root, compiler)],
        refusals: [
          `${one.name} did not compile (exit ${String(one.code)}), so the addons after it were left unbuilt`,
        ],
        code: FAILED,
      }
    }
    if (one.bytes === 0) {
      return {
        report: reportOf(built, root, compiler),
        refusals: [
          `${one.name} compiled clean and left no ${bundle}, so a build reported here is a build over nothing`,
        ],
        code: FAILED,
      }
    }

    try {
      await copyAddonMetadata(root, target.dir, target.canonicalName)
    } catch (thrown) {
      return {
        report: reportOf(built, root, compiler),
        refusals: [
          `${one.name} compiled, and what it ships beside its Lua did not copy: ${messageOf(thrown)}`,
        ],
        code: FAILED,
      }
    }
  }

  return { report: reportOf(built, root, compiler), refusals: [], code: 0 }
}
