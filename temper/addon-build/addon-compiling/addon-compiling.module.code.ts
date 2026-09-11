import { existsSync, rmSync, statSync } from "node:fs"
import { join } from "node:path"
import {
  compilerConfigPathFor,
  TSCONFIG_NAME,
} from "akasha/temper/addon-build/addon-compiler-config/addon-compiler-config.module.code.ts"
import { copyAddonMetadata } from "akasha/temper/addon-build/addon-metadata-copy/addon-metadata-copy.module.code.ts"
import {
  compilerCommand,
  compilerEntry,
  compilerRoot,
} from "akasha/temper/addon-build/lua-build-command/lua-build-command.module.code.ts"
import {
  ADDONS_REL_ROOT,
  listAllAddons,
} from "akasha/temper/addons-resolve/addon-roster/addon-roster.module.code.ts"
import {
  readSiblingAddonNames,
  siblingDistDir,
} from "akasha/temper/addons-resolve/sibling-addons/sibling-addons.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const DIST_UNDER = "dist"
const BUNDLE_SUFFIX = ".lua"
const SAYS_ERROR = "error TS"
const CEILING_MS = 60 * 60 * 1000

export type Compiled = {
  readonly lines: readonly string[]
  readonly refusals: readonly string[]
}

function bytesAt(path: string): number {
  return existsSync(path) ? statSync(path).size : 0
}

function refusing(reason: string): Compiled {
  return { lines: [], refusals: [reason] }
}

export function bundlePathFor(root: string, canonicalName: string): string {
  return join(root, ADDONS_REL_ROOT, DIST_UNDER, canonicalName, `${canonicalName}${BUNDLE_SUFFIX}`)
}

function emptied(root: string, dir: string, canonicalName: string): undefined {
  const addonsRoot = join(root, ADDONS_REL_ROOT)
  for (const stale of [
    join(addonsRoot, DIST_UNDER, canonicalName),
    ...readSiblingAddonNames(root, dir).map((name) => siblingDistDir(addonsRoot, name)),
  ]) {
    rmSync(stale, { recursive: true, force: true })
  }
}

export async function compiledAddon(
  root: string,
  dir: string,
  canonicalName: string
): Promise<Compiled> {
  const compiler = compilerRoot()
  const entry = compilerEntry()
  if (!existsSync(join(compiler, entry))) {
    return refusing(
      `${compiler} holds no ${entry}, so nothing there is the compiler this builds with`
    )
  }

  let config: string | null
  try {
    config = await compilerConfigPathFor(root, dir, canonicalName)
  } catch (thrown) {
    return refusing(`${canonicalName} states settings a build cannot read: ${messageOf(thrown)}`)
  }
  if (config === null) {
    return refusing(
      `${canonicalName} holds no ${TSCONFIG_NAME} in ${dir} and its page names no bundle entry to write one from, so there is nothing to compile`
    )
  }

  emptied(root, dir, canonicalName)
  const bundle = bundlePathFor(root, canonicalName)
  const answered = ran(compilerCommand(compiler, config), { cwd: root, timeout: CEILING_MS })
  const said = `${answered.out}\n${answered.err}`
    .split("\n")
    .map((one) => one.trim())
    .filter((one) => one.length > 0)
  const errors = said.filter((one) => one.includes(SAYS_ERROR))

  if (answered.code !== 0) {
    return {
      lines: errors.length > 0 ? errors : said,
      refusals: [`${canonicalName} did not compile (exit ${String(answered.code)})`],
    }
  }
  const bytes = bytesAt(bundle)
  if (bytes === 0) {
    return refusing(
      `${canonicalName} compiled clean and left no ${bundle}, so a build reported here is a build over nothing`
    )
  }

  try {
    await copyAddonMetadata(root, dir, canonicalName)
  } catch (thrown) {
    return refusing(
      `${canonicalName} compiled, and what it ships beside its Lua did not copy: ${messageOf(thrown)}`
    )
  }

  return {
    lines: [`compiled ${canonicalName}, ${String(bytes)} byte(s) of Lua at ${bundle}`],
    refusals: [],
  }
}

export async function compiledEveryAddon(root: string): Promise<Compiled> {
  const roster = listAllAddons({ repoRoot: root })
  if (roster.length === 0) {
    return refusing(
      `${root} holds no addon carrying a manifest, so a run here would compile nothing`
    )
  }
  const named = [...roster].sort((left, right) =>
    left.canonicalName.localeCompare(right.canonicalName)
  )
  let bytes = 0
  for (const one of named) {
    const done = await compiledAddon(root, one.dir, one.canonicalName)
    if (done.refusals.length > 0) return done
    bytes += bytesAt(bundlePathFor(root, one.canonicalName))
  }
  return {
    lines: [`compiled ${String(named.length)} addon(s), ${String(bytes)} byte(s) of Lua`],
    refusals: [],
  }
}
