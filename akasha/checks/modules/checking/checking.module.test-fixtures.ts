import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { rootOf } from "@akasha/command-system/rooting"
import { scratchWorld } from "@akasha/command-system/scratching"
import { idFiled, listedFiled, noneOfTypeFiled, pathFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { onDisk } from "../change-walking/change-walking.module.code.ts"

export const CHECK = "code-check"

const PAGE_TYPE = "page-type"

const MODULE = "module"

export const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const MODULE_AT = "akasha/code-system/modules/module.page-type.ts"

const MODULE_ID = "01a04bc4-0000-7000-8000-0000000000ff"

export const HELD_PAGE_AT = "akasha/held/held.module.ts"

export const HELD_CODE_AT = "akasha/held/held.module.code.ts"

const WALKING_AT = new URL("../change-walking/change-walking.module.code.ts", import.meta.url)
  .pathname

export const ROOT = rootOf(WALKING_AT)

const HELD = "akasha/checks-system/checking/checking.module"

export const SAMPLED: readonly string[] = [
  `${HELD}.code.ts`,
  `${HELD}.ts`,
  "akasha/persona-system/personas/ali/ali.persona.portrait.md",
]

export const scratch = scratchWorld()

type PageType = {
  readonly slug: string
  readonly at: string
}

const CHECK_PAGE_TYPE: PageType = {
  slug: CHECK,
  at: "akasha/checks/code-checks/code-check.page-type.ts",
}

export function rootWith(
  named: readonly {
    readonly slug: string
    readonly runsOn: readonly string[]
    readonly raw?: string
    readonly body: string
  }[],
  stands: PageType = CHECK_PAGE_TYPE
): string {
  const root = scratch.rootFor("akasha-checking-")
  noneOfTypeFiled(root, stands.slug)
  idFiled(root, CHECK_TYPE, [{ path: stands.at, id: CHECK_TYPE }])
  let minted = 0
  for (const one of named) {
    const at = `akasha/checks-system/code-check/${one.slug}/${one.slug}.${stands.slug}.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    writeFileSync(
      join(root, at),
      `export const ${exportedAs(one.slug)} = {\n` +
        `  slug: "${one.slug}",\n` +
        `  code: "ts",\n` +
        (one.raw ??
          `  runsOnPatch: ${one.runsOn.includes("patch")},\n` +
            `  runsOnWorktree: ${one.runsOn.includes("worktree")},\n` +
            `  runsOnDeploy: ${one.runsOn.includes("deploy")},\n` +
            `  runsOnAudit: ${one.runsOn.includes("audit")},\n`) +
        `}\n`
    )
    writeFileSync(join(root, `${at.slice(0, -".ts".length)}.code.ts`), one.body)
    minted = minted + 1
    const id = `01a04bc4-0000-7000-8000-00000000000${minted}`
    const held = [{ path: at, id }]
    listedFiled(root, stands.slug, one.slug, held)
    idFiled(root, id, held)
    pathFiled(root, at, held)
    pathFiled(root, `${at.slice(0, -".ts".length)}.code.ts`, held)
  }
  return root
}

export const REFUSES_ALL =
  "export function refusesAll(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "refused" }))\n' +
  "}\n"

export const ADMITS_ALL = `export function admitsAll() {\n  return []\n}\n`

export const THROWS = `export function throws() {\n  throw new Error("could not look")\n}\n`

export const THROWS_UNDER =
  "function reaching() {\n" +
  '  throw new Error("the world at /var/tmp/held could not be made")\n' +
  "}\n" +
  "function worldMade() {\n" +
  "  reaching()\n" +
  "}\n" +
  "export function throwsUnder() {\n" +
  "  worldMade()\n" +
  "}\n"

export const NAMES_SHADOW =
  "export function namesShadow(change, shadow) {\n" +
  '  const held = shadow !== undefined && typeof shadow.pageOf === "function"\n' +
  "  return held && shadow.index !== undefined\n" +
  "    ? []\n" +
  '    : [{ path: "shadow", reason: "no shadow was handed over" }]\n' +
  "}\n"

export const REFUSES_TAKING =
  "export function refusesTaking(change) {\n" +
  "  return change.changed\n" +
  "    .filter((path) => change.after(path) === null)\n" +
  '    .map((path) => ({ path, reason: "`" + path + "` may not be taken away" }))\n' +
  "}\n"

const INPUT_TS =
  "export function inputTs(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "ts woke" }))\n' +
  "}\n" +
  'inputTs.isInput = (path) => path.endsWith(".ts")\n'

const INPUT_PAGES =
  `import { PAGES } from "${WALKING_AT}"\n` +
  "export function inputPages(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "a page woke" }))\n' +
  "}\n" +
  "inputPages.isInput = PAGES.isInput\n"

const INPUT_THROWS =
  "export function inputThrows(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "woke anyway" }))\n' +
  "}\n" +
  "inputThrows.isInput = () => {\n" +
  '  throw new Error("the input could not be answered")\n' +
  "}\n"

export const TWO_CHECKS = [
  { slug: "input-ts", runsOn: ["patch"], body: INPUT_TS },
  { slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL },
]

export const ADMITS = "admits-all"

export const REFUSES = "refuses-all"

export const BOTH_CHECKS = [
  { slug: ADMITS, runsOn: ["patch"], body: ADMITS_ALL },
  { slug: REFUSES, runsOn: ["patch"], body: REFUSES_ALL },
]

export function checkAt(slug: string): string {
  return `akasha/checks-system/code-check/${slug}/${slug}.${CHECK}.ts`
}

export function checkCodeAt(slug: string): string {
  return `${checkAt(slug).slice(0, -".ts".length)}.code.ts`
}

export function taking(root: string, gone: readonly string[]): Change {
  const disk = onDisk(root)
  return {
    root,
    changed: [...gone],
    before: disk,
    after: (path) => (gone.includes(path) ? null : disk(path)),
  }
}

export const INPUT_THROWS_CHECKS = [
  { slug: "input-throws", runsOn: ["patch"], body: INPUT_THROWS },
  { slug: "input-ts", runsOn: ["patch"], body: INPUT_TS },
]

const PAGE_CHECKS = [
  { slug: "input-pages", runsOn: ["patch"], body: INPUT_PAGES },
  { slug: "refuses-all", runsOn: ["patch"], body: REFUSES_ALL },
]

export function pagedRoot(): string {
  const root = rootWith(PAGE_CHECKS)
  listedFiled(root, PAGE_TYPE, MODULE, [{ path: MODULE_AT, id: MODULE_ID }])
  mkdirSync(join(root, HELD_PAGE_AT.slice(0, HELD_PAGE_AT.lastIndexOf("/"))), { recursive: true })
  writeFileSync(join(root, HELD_PAGE_AT), `export const held = { slug: "held" }\n`)
  writeFileSync(join(root, HELD_CODE_AT), `export const HELD = "held"\n`)
  return root
}
