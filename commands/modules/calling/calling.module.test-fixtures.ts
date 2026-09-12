import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Kind } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Surface } from "akasha/commands/modules/help-writing/help-writing.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { noneOfTypeFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const MECHANICAL: Kind = {
  slug: "change-mechanical",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
}

export const SURFACED: Surface = {
  taking: [{ said: "--file-path <path>", takes: "a path it takes" }],
  holds: [],
  notYet: [],
}

export const COMMAND = "command"

export const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

const REPAIR_AT = "commands/pages/index/refresh/index-refresh.command.code.ts"

const BOOTSTRAP_AT = "commands/pages/index/refresh/index-refresh.command.ts"

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

export const OUTSIDE = { calledAs: "akasha", from: "/nowhere", writer: null, agentId: null }

export const TYPED = "Typed"

export type Ruled = readonly Record<string, unknown>[]

export function ruleNamed(name: string): Record<string, unknown> {
  return { directiveKind: "rule", name, act: `Act ${name}.`, warrant: `Because ${name}.`, aids: [] }
}

export function ruleWritten(name: string): string {
  return `${name}: Act ${name}.\nBecause ${name}.`
}

const scratch = scratchWorld()

export const sweep = scratch.sweep

export type Named = {
  readonly slug: string
  readonly body: string
  readonly also?: string
  readonly name?: string
  readonly definition?: string
  readonly parts?: readonly string[]
  readonly surface?: Surface
  readonly taking?: Surface["taking"]
  readonly directives?: Ruled
}

export function rootWith(
  named: readonly Named[],
  typeSlug: string = COMMAND,
  under: readonly string[] | null = null
): string {
  const root = scratch.rootFor("akasha-calling-")
  noneOfTypeFiled(root, typeSlug)
  const typeAt = `akasha/command-system/command/${typeSlug}.page-type.ts`
  idFiled(root, COMMAND_TYPE, [{ path: typeAt, id: COMMAND_TYPE }])
  mkdirSync(join(root, typeAt.slice(0, typeAt.lastIndexOf("/"))), { recursive: true })
  const rooted = under ?? named.map((one) => `${typeSlug}/${one.slug}`)
  writeFileSync(
    join(root, typeAt),
    `export const ${exportedAs(typeSlug)} = ` +
      `{ slug: "${typeSlug}", parts: ${JSON.stringify(rooted)}` +
      `, directives: ${JSON.stringify([ruleNamed(TYPED)])} }\n`
  )
  let minted = 0
  for (const one of named) {
    const at = `akasha/command-system/command/${one.slug}/${one.slug}.command.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    const stated =
      one.definition === undefined ? "" : `, definition: ${JSON.stringify(one.definition)}`
    const called = one.name === undefined ? "" : `, name: ${JSON.stringify(one.name)}`
    const taken = one.taking === undefined ? "" : `, taking: ${JSON.stringify(one.taking)}`
    const shown =
      one.surface === undefined ? taken : `, taking: ${JSON.stringify(one.surface.taking)}`
    const parted = one.parts === undefined ? "" : `, parts: ${JSON.stringify(one.parts)}`
    const ruled =
      one.directives === undefined ? "" : `, directives: ${JSON.stringify(one.directives)}`
    writeFileSync(
      join(root, at),
      `export const ${exportedAs(one.slug)} = ` +
        `{ slug: "${one.slug}"${called}${stated}${shown}${parted}${ruled} }\n`
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
        value: {
          id: line.id,
          pageTypeSlug: typeSlug,
          slug: one.slug,
          name: one.name,
          definition: one.definition,
          parts: one.parts,
          directives: one.directives,
        },
      }))
    )
  }
  return root
}

export const NAMESPACE = "namespace"

export const NAMESPACE_TYPE = "01a06c7c-54b5-712b-b4a2-9ada10279dff"

export type Under = {
  readonly slug: string
  readonly name?: string
  readonly definition?: string
  readonly parts: readonly string[]
  readonly directives?: Ruled
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
    const called = one.name === undefined ? "" : `, name: ${JSON.stringify(one.name)}`
    const ruled =
      one.directives === undefined ? "" : `, directives: ${JSON.stringify(one.directives)}`
    writeFileSync(
      join(root, at),
      `export const ${exportedAs(one.slug)} = { slug: "${one.slug}"${called}${stated}` +
        `, parts: ${JSON.stringify(one.parts)}${ruled} }\n`
    )
    minted = minted + 1
    const id = `01a06c7c-0000-7000-8000-00000000000${minted}`
    listedFiled(root, NAMESPACE, one.slug, [{ path: at, id }])
    valueAlsoFiled(root, NAMESPACE, [
      {
        path: at,
        value: {
          id,
          pageTypeSlug: NAMESPACE,
          slug: one.slug,
          name: one.name,
          definition: one.definition,
          parts: one.parts,
          directives: one.directives,
        },
      },
    ])
  }
}

export function ruledRoot(): string {
  const root = rootWith(
    [{ slug: "a-b-c", body: ANSWERS, name: "c", taking: [], directives: [ruleNamed("Own")] }],
    COMMAND,
    ["namespace/a"]
  )
  namespacesIn(root, [
    { slug: "a", name: "a", parts: ["namespace/a-b"], directives: [ruleNamed("Wide")] },
    { slug: "a-b", name: "b", parts: ["command/a-b-c"], directives: [ruleNamed("Near")] },
  ])
  return root
}

export function draftUnderChange(): string {
  const root = rootWith([{ slug: "change-draft", body: ANSWERS, name: "draft" }])
  namespacesIn(root, [
    {
      slug: "change",
      name: "change",
      definition: "what a landing carries",
      parts: ["command/change-draft"],
    },
  ])
  return root
}

export function bootstrapped(root: string): undefined {
  const at = join(root, BOOTSTRAP_AT)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, 'export const indexRefresh = { slug: "index-refresh" }\n')
  writeFileSync(
    join(root, REPAIR_AT),
    "export function indexRefresh(argv, given) {\n" +
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
