export const NAMING: ReadonlyMap<string, string> = new Map([
  ["@akasha/code", "akasha/code-system/code-system.workspace-package.ts"],
  ["@akasha/code/code-source", "akasha/code-system/code-source/code-source.module.code.ts"],
])

export const BY_NAMING = [
  'import { one } from "akasha/code-system/code-system.workspace-package.ts"',
  'import { two } from "akasha/code-system/code-source/code-source.module.code.ts"',
  'import { three } from "@akasha/codex"',
  'const said = "@akasha/code"',
  "",
].join("\n")
