import { execFileSync } from "node:child_process"
import { mkdirSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Phase } from "../checks-system/checking.module.code.ts"
import { ADMITS_CODE, MINTED, minting } from "../testing-system/minting.module.code.ts"
import type { Asked } from "./asking.module.code.ts"
import { scratchWorld } from "./scratching.module.code.ts"

export const CHECKS_AT = ".git/data/index/identity/check/slug"

const ADMITS_AT = "akasha/admits.check*"

const REPO_AT = join(import.meta.dir, "..", "..")

const MODULES = "node_modules"

const CONFIG = "biome.json"

const BIOME = JSON.stringify({
  formatter: { indentStyle: "space", indentWidth: 2, lineWidth: 100 },
  assist: { actions: { source: { organizeImports: "on" } } },
  javascript: { formatter: { quoteStyle: "double", semicolons: "asNeeded" } },
})

export const LOOSE =
  'import {b} from "./b.ts"\nimport {a} from "./a.ts"\nconst   x   =   1\nexport {a,b,x}\n'

export const TIDY =
  'import { a } from "./a.ts"\nimport { b } from "./b.ts"\n\nconst x = 1\n\nexport { a, b, x }\n'

export const BROKEN = 'import {a} from "./a.ts"\nexport const held = (\n'

export const REFORMATTED =
  "formatted akasha/two.ts as it landed — what stands there is not what was handed in"

export const scratch = scratchWorld()

export function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

export function put(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, body)
  return at
}

export function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  const root = scratch.rootFor("akasha-asking-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) put(root, path, body)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  put(root, ".git/info/exclude", `${ADMITS_AT}\n`)
  checking(root, "admits", ADMITS_CODE)
  return root
}

export function repoWithTheFormatter(named?: Readonly<Record<string, string>>): string {
  const root = named === undefined ? repoWith() : repoWith(named)
  symlinkSync(join(REPO_AT, MODULES), join(root, MODULES))
  writeFileSync(join(root, CONFIG), BIOME)
  put(root, ".git/info/exclude", `${ADMITS_AT}\n${MODULES}\n${CONFIG}\n`)
  return root
}

let minted = 0

export function checking(root: string, slug: string, body: string, phase: Phase = "patch"): void {
  minted = minted + 1
  const id = `01a04bc4-0000-7000-8000-${String(minted).padStart(12, "0")}`
  minting(root, slug, id, MINTED, body, phase)
}

export const REFUSES_TAKING =
  "export function refusesTaking(leaving) {\n" +
  "  return leaving.changed\n" +
  "    .filter((path) => leaving.at(path) === null)\n" +
  '    .map((path) => ({ path, reason: "a check judged this going away" }))\n' +
  "}\n"

export const REFUSES_LOOSE =
  "export function refusesLoose(leaving) {\n" +
  "  return leaving.changed\n" +
  '    .filter((path) => new TextDecoder().decode(leaving.at(path)).includes("   "))\n' +
  '    .map((path) => ({ path, reason: "a check was handed a body nobody formatted" }))\n' +
  "}\n"

export const headOf = (root: string): string => git(root, ["rev-parse", "HEAD"]).trim()

export const givenIn = (root: string) => ({
  root,
  calledAs: "akasha write",
  from: root,
  writer: null,
  agentId: null,
})

export const bodyIn = (root: string): string => put(root, "body.txt", "proposed\n")

const bytes = (said: string): Uint8Array => new TextEncoder().encode(said)

export function asking(over: Partial<Asked>): Asked {
  return {
    changes: [{ path: "akasha/two.ts", body: bytes("proposed\n") }],
    message: "held",
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: () => {
      throw new Error("a report that could not be built")
    },
    ...over,
  }
}

export function blocked(root: string): Asked {
  mkdirSync(join(root, "akasha/three.ts"), { recursive: true })
  return asking({
    changes: [
      { path: "akasha/two.ts", body: bytes("proposed\n") },
      { path: "akasha/three.ts", body: bytes("proposed\n") },
    ],
    saying: () => [],
  })
}
