import { dirname, join, relative } from "node:path"
import { cliRun } from "akasha/design/language/lua-compiler/cli-run/cli-run.module.ts"
import { luaCompiler } from "akasha/design/language/lua-compiler/lua-compiler.domain.ts"
import { pluginNoMultiStore } from "akasha/design/language/lua-compiler/plugin-no-multi-store/plugin-no-multi-store.module.ts"
import { pluginNoTruthyNumbers } from "akasha/design/language/lua-compiler/plugin-no-truthy-numbers/plugin-no-truthy-numbers.module.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedById } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const CODE = "code"

const TS = "ts"

const PLUGINS = [pluginNoTruthyNumbers, pluginNoMultiStore] as const

function akashaAt(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function pageAt(id: string): string {
  const listed = listedById(akashaAt(), id)
  if (listed === null) {
    throw new Error(`no page carries the id \`${id}\`, so nothing says where the compiler sits`)
  }
  return listed.path
}

function compilerPackage(): string {
  return dirname(pageAt(luaCompiler.id))
}

function underCompiler(id: string): string {
  const at = besideAt(pageAt(id), CODE, TS)
  if (at === null) {
    throw new Error(`the page carrying \`${id}\` has no code file beside it`)
  }
  return relative(compilerPackage(), at)
}

export function compilerEntry(): string {
  return underCompiler(cliRun.id)
}

export function compilerRoot(stated?: string): string {
  return stated ?? join(akashaAt(), compilerPackage())
}

function luaPluginsArgument(root: string): string {
  return JSON.stringify(PLUGINS.map((one) => ({ name: join(root, underCompiler(one.id)) })))
}

export function compilerCommand(
  root: string,
  tsconfigPath: string,
  extra: readonly string[] = []
): readonly string[] {
  return [
    "bun",
    join(root, compilerEntry()),
    "--project",
    tsconfigPath,
    "--luaPlugins",
    luaPluginsArgument(root),
    ...extra,
  ]
}
