import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitIn } from "@akasha/git/git-running"
import { admitting } from "@akasha/testing-system/minting"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { remove } from "./remove.command.code.ts"

export const scratch = scratchWorld()

export const git = gitIn

export function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-remove-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(join(root, ".git/info/exclude"), "akasha/admits.code-check*\n")
  admitting(root)
  return root
}

export function emptyIn(root: string, path: string): undefined {
  mkdirSync(join(root, path), { recursive: true })
}

export function looseIn(root: string, path: string): undefined {
  emptyIn(root, path)
  writeFileSync(join(root, path, "stray.txt"), BODY)
}

export function removing(root: string, argv: readonly string[]): Answer {
  return remove(argv, givenIn(root))
}

export function givenIn(root: string): Given {
  return { root, calledAs: "akasha remove", from: root, writer: null, agentId: null }
}

export function naming(...paths: readonly string[]): readonly string[] {
  return paths.flatMap((one) => ["--file-path", one])
}

export const head = baseOf

export const HELD = "akasha/one/held.module.ts"

export const BESIDE = "akasha/one/held.module.code.ts"

export const KEPT = "akasha/two/kept.module.ts"

export const DEEP = "akasha/one/deep/held.module.ts"

export const OUTSIDE = "temper/one/held.ts"

export const BODY = `export const held = 1\n`

export const MANIFEST = "package.json"

export const WORKSPACE = "temper/one"

export const ROOT_MANIFEST = `{
  "name": "held",
  "private": true,
  "workspaces": [
    "temper/one"
  ]
}
`

export function manifested(): string {
  return repoWith({
    [HELD]: BODY,
    [MANIFEST]: ROOT_MANIFEST,
    "temper/one/package.json": `{\n  "name": "@held/one",\n  "version": "0.0.0"\n}\n`,
  })
}

export const MOVED_MANIFEST = ROOT_MANIFEST.replace(
  `"${WORKSPACE}"`,
  `"${WORKSPACE}",\n    "temper/two"`
)

export const WAYS_IN = "temper/one/package.json"

export const KEPT_WAY = "temper/one/kept/kept.module.code.ts"

export const GONE_WAY = "temper/one/gone/gone.module.code.ts"

export const PACKAGE_WITH_WAYS = `{
  "name": "@held/one",
  "exports": {
    "./gone": "./gone/gone.module.code.ts",
    "./kept": "./kept/kept.module.code.ts"
  }
}
`

export const PACKAGE_WITHOUT_GONE = `{
  "name": "@held/one",
  "exports": {
    "./kept": "./kept/kept.module.code.ts"
  }
}
`

export function fileIn(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8")
}

export const AGENT = "01a04bed-1461-7364-8579-6799d5aa8ea0"

export const GONE = "akasha/one/nowhere.ts"

export const REFUSED_ENDS = "--file-path takes a path, and none follows it"

export const REFUSED_FLAGGED = "--file-path takes a path, and `--message` names another flag"

export const REFUSED_UNKNOWN =
  "`--force` is not a flag this takes — a removal names its paths as `--file-path <path>` and " +
  "takes `--message`, `--message-file`, `--break-the-glass`"

export function manifestIn(root: string): string {
  return readFileSync(join(root, MANIFEST), "utf8")
}

export function reportOf(said: Answer): string {
  return said.report.join("\n")
}

export function refusalOf(said: Answer): string {
  return said.refusals.join("\n")
}
