import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { changeGenerator } from "akasha/change/generator/change-generator.page-type.ts"
import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { valueMinting } from "akasha/command/modules/value-minting/value-minting.change-generator.ts"
import {
  type Scratch,
  scratchWorld,
} from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { generatorKind } from "akasha/page/generator-kind/generator-kind.page-type.ts"
import {
  idOf,
  indexedRepo,
  pageOf,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { relationProperty } from "akasha/page/relation-property/relation-property.page-type.ts"
import { aProperty } from "akasha/page/service/modules/page-incrementing/page-incrementing.module.test-fixtures.ts"
import {
  ASK_AT,
  ASKING_AGENT,
  answering,
  READ_AT,
  WRITE_AT,
} from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import {
  type Asked,
  type Wrote,
  writerFor,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import type {
  Fault,
  Faulted,
} from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const ROOT = rootOf(import.meta.dir)

export const TOLD: Asked[] = []

const NOTHING_LANDS: Faulted<Wrote> = { commit: null, wrote: [], took: [] }

export const GIVEN = {
  root: ROOT,
  writer: {
    writing: (asked: Asked) => {
      TOLD.push(asked)
      return Promise.resolve(NOTHING_LANDS)
    },
    alone: <T>(act: () => Promise<T>): Promise<T> => act(),
  },
}

export function asking(body: unknown, at: string = ASK_AT, method: string = "POST"): Request {
  return new Request(`http://workstation${at}`, {
    method,
    body: method === "POST" ? JSON.stringify(body) : undefined,
    headers: { "content-type": "application/json" },
  })
}

export async function bodyOf(answered: Response): Promise<Record<string, unknown>> {
  return (await answered.json()) as Record<string, unknown>
}

export async function refusalOf(answered: Response): Promise<string> {
  return String((await bodyOf(answered)).refused)
}

const A_TIGHT_CEILING = 40

const EVERY_DECISION_KIND = { pageTypeSlug: "decision-kind", keys: ["slug"] }

export function tightly(limit?: number): Promise<Response> {
  const query = limit === undefined ? EVERY_DECISION_KIND : { ...EVERY_DECISION_KIND, limit }
  return answering({ ...GIVEN, answeredAtMost: A_TIGHT_CEILING }, asking(query))
}

export const scratch = scratchWorld()

export const A_PAGE = "akasha/a-page.module.ts"

export function repoWith(body: string): string {
  return committedIn(scratch.rootFor("akasha-page-serving-"), { [A_PAGE]: body })
}

export function committedIn(root: string, named: Readonly<Record<string, string>>): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  return root
}

export const SEALED = "what the world builder keeps\n"

export function loreRepo(held: Scratch = scratch): string {
  return committedIn(loreWorld(held), { [A_PAGE]: "one", [LORE_AT]: SEALED })
}

function askedBy(agentId: string, body: unknown, at: string): Request {
  return new Request(`http://workstation${at}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", [ASKING_AGENT]: agentId },
  })
}

export function gameMasterReadsLore(): Promise<Response> {
  return answering(over(loreRepo()), askedBy(GAME_MASTER_SEAT, { paths: [LORE_AT] }, READ_AT))
}

export function over(root: string) {
  return { root, writer: GIVEN.writer }
}

export const AN_INSTANT = "2026-09-01T12:00:00.000Z"

export const A_DEVICE_TOKEN = {
  pageTypeSlug: "device-token",
  slug: "held-one",
  values: {
    id: "01a05dc7-421c-7000-b93a-ac4514adf294",
    type: "device-token",
    slug: "held-one",
    person: "alan",
    iosApp: "alanwalton",
    lastSeenAt: AN_INSTANT,
  },
}

const A_WRITE = { writer: "Amy <amy@alanwalton.com>", message: "a message" }

export function writing(body: Record<string, unknown>): Request {
  return asking({ ...A_WRITE, ...body }, WRITE_AT)
}

const seed = (one: string): string => `01a0a302-0000-7000-8000-0000000000${one}`

export const CRATE_AT = "akasha/crate/pages/one-crate.crate.ts"

const ADDING_AT = `akasha/changes/${addIfNotPresentFile.slug}.${changeMechanicalFile.slug}`

const ADDING_CODE = join(
  ROOT,
  "change/mechanical/file",
  addIfNotPresentFile.slug,
  `${addIfNotPresentFile.slug}.${changeMechanicalFile.slug}.code.ts`
)

const MINTING_AT = `akasha/changes/${valueMinting.slug}.${changeGenerator.slug}`

const MINTING_CODE = join(
  ROOT,
  "command/modules",
  valueMinting.slug,
  `${valueMinting.slug}.${changeGenerator.slug}.code.ts`
)

function declared(pageProperty: string): Record<string, unknown> {
  return { pageProperty, required: false, many: false }
}

export function cratesRoot(): string {
  return indexedRepo({
    ...Object.fromEntries([aProperty("10", "type"), aProperty("11", "title")]),
    "akasha/page.page-type.ts": pageOf({
      id: idOf("1"),
      type: "page-type",
      slug: "page",
      extends: [],
      properties: [declared("id"), declared("slug")],
    }),
    "akasha/crate/crate.page-type.ts": pageOf({
      id: seed("01"),
      type: "page-type",
      slug: "crate",
      extends: [`${pageType.slug}/${page.slug}`],
      types: "ts",
      properties: [declared("type"), declared("title")],
    }),
    "akasha/crate/crate.page-type.types.ts": "export type Crate = Record<string, unknown>\n",
    [`${ADDING_AT}.ts`]: pageOf({
      id: seed("02"),
      type: `${pageType.slug}/${changeMechanicalFile.slug}`,
      slug: addIfNotPresentFile.slug,
      definition: "the change a page written through the pages service lands",
      code: "ts",
    }),
    [`${ADDING_AT}.code.ts`]: `export { runChange } from "${ADDING_CODE}"\n`,
    [`akasha/${changeGenerator.slug}.page-type.ts`]: pageOf({
      id: seed("03"),
      type: "page-type",
      slug: changeGenerator.slug,
      extends: [`${pageType.slug}/${page.slug}`],
    }),
    [`${MINTING_AT}.ts`]: pageOf({
      id: seed("04"),
      type: `${pageType.slug}/${changeGenerator.slug}`,
      slug: valueMinting.slug,
      definition: "the id a page written as new is given",
      code: "ts",
    }),
    [`${MINTING_AT}.code.ts`]: `export { generateChange } from "${MINTING_CODE}"\n`,
    "akasha/generator.relation-property.ts": pageOf({
      id: seed("05"),
      type: `${pageType.slug}/${relationProperty.slug}`,
      slug: "generator",
      propertySlug: "generator",
      targetPageType: `${pageType.slug}/${generatorKind.slug}`,
    }),
  })
}

export function aFreshCrate(title: string): Record<string, unknown> {
  return { pageTypeSlug: "crate", slug: "one-crate", values: { title }, fresh: true }
}

export function refusingAs(fault: Fault) {
  const refusing = (): Promise<Faulted<Wrote>> => Promise.resolve({ refused: "held", fault })
  return { root: ROOT, writer: { ...GIVEN.writer, writing: refusing } }
}

function crateRetitled(title: string, read: unknown): Request {
  const crate = { pageTypeSlug: "crate", slug: "one-crate", values: { title }, merge: true }
  return writing({ pages: [crate], read: String(read) })
}

export async function writtenOverAMove(): Promise<Response> {
  const root = cratesRoot()
  const given = { root, writer: writerFor({ root }) }
  const first = await bodyOf(await answering(given, writing({ pages: [aFreshCrate("first")] })))
  await answering(given, crateRetitled("moved", first.commit))
  return answering(given, crateRetitled("late", first.commit))
}
