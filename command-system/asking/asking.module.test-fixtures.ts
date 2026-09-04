import { mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Phase } from "@akasha/checks/checking"
import { warrantsSeeded } from "@akasha/context/warranting/testing"
import { said as gitIn } from "@akasha/git/git-running"
import { pageFiled } from "@akasha/indexes/testing"
import { bytesOf as bytes } from "@akasha/testing-system/bodying"
import { ADMITS_CODE, MINTED, mintedId, minting } from "@akasha/testing-system/minting"
import { put } from "@akasha/testing-system/putting"
import { patch } from "../../commands/patch/patch.command.code.ts"
import type { Answer, Given } from "../calling/calling.module.code.ts"
import { write } from "../commands/write/write.command.code.ts"
import { blobIdOf, recordRead } from "../reading/reading.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import type { Asked } from "./asking.module.code.ts"

const ADMITS_AT = "akasha/admits.code-check*"

const REPO_AT = rootOf(import.meta.dir)

const MODULES = "node_modules"

const CONFIG = "biome.json"

const TWO_AT = "akasha/two.ts"

export const UNLOADABLE_AT = "akasha/admits.code-check.code.ts"

export const PROPOSED = "proposed\n"

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

export const SEAT_AT = "akasha/seat-system/seats/pages/tester.seat.ts"

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
  warrantsSeeded(root)
  pageFiled(root, AGENT, SEAT_AT)
  return root
}

export function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  return repoAt(scratch.rootFor("akasha-asking-"), named)
}

export function repoNoCheckLoads(): string {
  const root = repoWith()
  rmSync(join(root, UNLOADABLE_AT))
  return root
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

export const bodyIn = (root: string): string => put(root, "body.txt", PROPOSED)

export function heldIn(root: string, path: string): string {
  return git(root, ["show", `HEAD:${path}`])
}

export function treeHolds(root: string, path: string): boolean {
  return git(root, ["ls-tree", "--name-only", "HEAD", path]).trim() === path
}

const APPLYING = ["--message", "--message-file", "--break-the-glass"]

const COMMITTED = "committed as "

function applyingIn(argv: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const [at, one] of argv.entries()) {
    if (APPLYING.includes(one)) said.push(one, argv[at + 1] ?? "")
  }
  return said
}

export async function applied(
  root: string,
  said: Answer,
  argv: readonly string[] = [],
  given: Given = givenIn(root)
): Promise<Answer> {
  if (said.code !== 0) return said
  const then = await patch(["apply", ...applyingIn(argv)], given)
  return { report: [...said.report, ...then.report], refusals: then.refusals, code: then.code }
}

export async function wroteWith(
  root: string,
  argv: readonly string[],
  given: Given = givenIn(root)
): Promise<Answer> {
  return await applied(root, await write(argv, given), argv, given)
}

export function commitIn(root: string, said: Answer, pretty = "%B"): string {
  const line = said.report.find((one) => one.startsWith(COMMITTED))
  if (line === undefined) return ""
  return git(root, ["log", "-1", `--pretty=${pretty}`, line.slice(COMMITTED.length)])
}

export async function drafting(
  root: string,
  said: readonly string[],
  body: string = PROPOSED,
  given: Given = givenIn(root)
): Promise<Answer> {
  const from = put(root, "body.txt", body)
  return await write(["--file-path", TWO_AT, "--content-file", from, ...said], given)
}

export async function wrote(
  root: string,
  said: readonly string[],
  body: string = PROPOSED,
  given: Given = givenIn(root)
): Promise<Answer> {
  return await applied(root, await drafting(root, said, body, given), said, given)
}

export function asking(over: Partial<Asked>): Asked {
  return {
    changes: [{ path: TWO_AT, body: bytes(PROPOSED) }],
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
      { path: TWO_AT, body: bytes(PROPOSED) },
      { path: "akasha/three.ts", body: bytes(PROPOSED) },
    ],
    saying: () => [],
  })
}
