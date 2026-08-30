import { mkdirSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Phase } from "../../checks-system/checking/checking.module.code.ts"
import { warrantsStanding } from "../../context-system/warranting/warranting.module.test-fixtures.ts"
import { bytesOf as bytes } from "../../testing-system/bodying/bodying.module.code.ts"
import { gitIn } from "../../testing-system/gitting/gitting.module.code.ts"
import {
  ADMITS_CODE,
  MINTED,
  mintedId,
  minting,
} from "../../testing-system/minting/minting.module.code.ts"
import { put } from "../../testing-system/putting/putting.module.code.ts"
import { blobIdOf, recordRead } from "../reading/reading.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import type { Asked } from "./asking.module.code.ts"

const ADMITS_AT = "akasha/admits.check*"

const REPO_AT = rootOf(import.meta.dir)

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

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const scratch = scratchWorld()

export const git = gitIn

export function repoAt(root: string, named: Readonly<Record<string, string>>): string {
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    put(root, path, body)
    recordRead(root, AGENT, { path, oid: blobIdOf(bytes(body)), seenAt: 1, mechanicalOid: null })
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  put(root, ".git/info/exclude", `${ADMITS_AT}\n`)
  checking(root, "admits", ADMITS_CODE)
  warrantsStanding(root)
  return root
}

export function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  return repoAt(scratch.rootFor("akasha-asking-"), named)
}

export function repoWithTheFormatter(named?: Readonly<Record<string, string>>): string {
  const root = named === undefined ? repoWith() : repoWith(named)
  symlinkSync(join(REPO_AT, MODULES), join(root, MODULES))
  writeFileSync(join(root, CONFIG), BIOME)
  put(root, ".git/info/exclude", `${ADMITS_AT}\n${MODULES}\n${CONFIG}\n`)
  return root
}

export function checking(
  root: string,
  slug: string,
  body: string,
  phase: Phase = "patch"
): undefined {
  minting(root, slug, mintedId(slug), MINTED, body, phase)
}

export const REFUSES_TAKING =
  "export function refusesTaking(change) {\n" +
  "  return change.changed\n" +
  "    .filter((path) => change.after(path) === null)\n" +
  '    .map((path) => ({ path, reason: "a check judged this going away" }))\n' +
  "}\n"

export const REFUSES_LOOSE =
  "export function refusesLoose(change) {\n" +
  "  return change.changed\n" +
  '    .filter((path) => new TextDecoder().decode(change.after(path)).includes("   "))\n' +
  '    .map((path) => ({ path, reason: "a check was handed a body nobody formatted" }))\n' +
  "}\n"

export const givenIn = (root: string) => ({
  root,
  calledAs: "akasha write",
  from: root,
  writer: null,
  agentId: AGENT,
})

export const bodyIn = (root: string): string => put(root, "body.txt", "proposed\n")

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
