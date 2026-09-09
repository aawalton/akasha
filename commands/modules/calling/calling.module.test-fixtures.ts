import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { idFiled, listedFiled, noneOfTypeFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { exportedAs } from "@akasha/pages/page-export-name"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import type { Surface } from "./calling.module.code.ts"

export const COMMAND = "command"

export const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

export const REPAIR_AT = "commands/pages/index/index.command.code.ts"

const BOOTSTRAP_AT = "commands/pages/index/index.command.ts"

export const ANSWERS = `export function held(argv, given) {
  return { report: [argv.join(" "), given.calledAs], refusals: [], code: 0 }
}
`

export const ANSWERS_NOTHING = `export const held = 1\n`

export const WILL_NOT_LOAD = `export function held( {\n`

export const THROWS_NO_ERROR = `throw "the value was never set"\n`

export const ANSWERS_LATER = `export async function held(argv, given) {
  await new Promise((keep) => setTimeout(keep, 1))
  return { report: [argv.join(" "), given.calledAs], refusals: [], code: 0 }
}
`

export const SAYS_KIND = `export function held(argv, given) {
  return { report: [JSON.stringify(given.changeKind ?? null)], refusals: [], code: 0 }
}
`

export const OUTSIDE = { calledAs: "akasha", from: "/nowhere", writer: null, agentId: null }

const scratch = scratchWorld()

export const sweep = scratch.sweep

export type Named = {
  readonly slug: string
  readonly body: string
  readonly also?: string
  readonly definition?: string
  readonly surface?: Surface
  readonly notes?: readonly string[]
}

export function rootWith(named: readonly Named[], typeSlug: string = COMMAND): string {
  const root = scratch.rootFor("akasha-calling-")
  noneOfTypeFiled(root, typeSlug)
  idFiled(root, COMMAND_TYPE, [
    { path: `akasha/command-system/command/${typeSlug}.page-type.ts`, id: COMMAND_TYPE },
  ])
  let minted = 0
  for (const one of named) {
    const at = `akasha/command-system/command/${one.slug}/${one.slug}.command.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    const stated =
      one.definition === undefined ? "" : `, definition: ${JSON.stringify(one.definition)}`
    const noted = one.notes === undefined ? "" : `, helpNotes: ${JSON.stringify(one.notes)}`
    const shown =
      one.surface === undefined
        ? noted
        : `, taking: ${JSON.stringify(one.surface.taking)}, helpNotes: ${JSON.stringify(one.surface.helpNotes)}`
    writeFileSync(
      join(root, at),
      `export const ${exportedAs(one.slug)} = { slug: "${one.slug}"${stated}${shown} }\n`
    )
    writeFileSync(join(root, `${at.slice(0, -".ts".length)}.code.ts`), one.body)
    minted = minted + 1
    const lines = [{ path: at, id: `01a04bdd-0000-7000-8000-00000000000${minted}` }]
    if (one.also !== undefined) {
      lines.push({ path: one.also, id: "01a04bdd-0000-7000-8000-000000000099" })
    }
    listedFiled(root, typeSlug, one.slug, lines)
    valueAlsoFiled(
      root,
      typeSlug,
      lines.map((line) => ({
        path: line.path,
        value: { id: line.id, pageTypeSlug: typeSlug, slug: one.slug },
      }))
    )
  }
  return root
}

export const NAMESPACE = "namespace"

export const NAMESPACE_TYPE = "01a06c7c-54b5-712b-b4a2-9ada10279dff"

export type Under = {
  readonly slug: string
  readonly definition?: string
  readonly parts: readonly string[]
}

export function namespacesIn(root: string, named: readonly Under[]): undefined {
  noneOfTypeFiled(root, NAMESPACE)
  idFiled(root, NAMESPACE_TYPE, [
    { path: `akasha/command-system/namespace/${NAMESPACE}.page-type.ts`, id: NAMESPACE_TYPE },
  ])
  let minted = 0
  for (const one of named) {
    const at = `akasha/command-system/namespace/${one.slug}/${one.slug}.namespace.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    const stated =
      one.definition === undefined ? "" : `, definition: ${JSON.stringify(one.definition)}`
    writeFileSync(
      join(root, at),
      `export const ${exportedAs(one.slug)} = { slug: "${one.slug}"${stated}` +
        `, parts: ${JSON.stringify(one.parts)} }\n`
    )
    minted = minted + 1
    const id = `01a06c7c-0000-7000-8000-00000000000${minted}`
    listedFiled(root, NAMESPACE, one.slug, [{ path: at, id }])
    valueAlsoFiled(root, NAMESPACE, [
      { path: at, value: { id, pageTypeSlug: NAMESPACE, slug: one.slug } },
    ])
  }
}

export function bootstrapped(root: string): undefined {
  const at = join(root, BOOTSTRAP_AT)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, 'export const index = { slug: "index" }\n')
  writeFileSync(
    join(root, REPAIR_AT),
    "export function index(argv, given) {\n" +
      '  return { report: [argv.join(" "), given.calledAs], refusals: [], code: 0 }\n' +
      "}\n"
  )
}

export function refusingWith<T extends object, R>(
  taken: (argv: readonly string[]) => T | { readonly refused: R }
): (argv: readonly string[]) => R {
  return (argv) => {
    const held = taken(argv)
    if (!("refused" in held)) throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
    return held.refused
  }
}
