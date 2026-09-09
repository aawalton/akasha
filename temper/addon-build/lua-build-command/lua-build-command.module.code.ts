import { join } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"

const COMPILER_PACKAGE = "language-design/lua-compiler"

export const COMPILER_ENTRY = "cli-run/cli-run.module.code.ts"

const PLUGIN_FILES = [
  "plugin-no-truthy-numbers/plugin-no-truthy-numbers.module.code.ts",
  "plugin-no-multi-store/plugin-no-multi-store.module.code.ts",
] as const

export function compilerRoot(stated?: string): string {
  return stated ?? join(rootFor(resolveRoots(), AKASHA), COMPILER_PACKAGE)
}

export function luaPluginsArgument(root: string): string {
  return JSON.stringify(PLUGIN_FILES.map((one) => ({ name: join(root, one) })))
}

export function compilerCommand(
  root: string,
  tsconfigPath: string,
  extra: readonly string[] = []
): readonly string[] {
  return [
    "bun",
    join(root, COMPILER_ENTRY),
    "--project",
    tsconfigPath,
    "--luaPlugins",
    luaPluginsArgument(root),
    ...extra,
  ]
}
