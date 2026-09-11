export const NAMING: ReadonlyMap<string, string> = new Map([
  ["@held/one", "held/one/one.workspace-package.ts"],
  ["@held/one/deep", "held/one/deep/deep.module.code.ts"],
])

export const BY_NAMING = [
  'import { one } from "held/one/one.workspace-package.ts"',
  'import { two } from "held/one/deep/deep.module.code.ts"',
  'import { three } from "@held/oner"',
  'const said = "@held/one"',
  "",
].join("\n")
