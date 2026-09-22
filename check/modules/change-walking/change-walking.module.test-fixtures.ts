import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { onDisk } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  type Answering,
  answeringOver,
} from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  relationFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  idFiled,
  listedFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const PAGE_AT = "akasha/checks-system/change-walking/held/held.module.ts"

export const CODE_AT = "akasha/checks-system/change-walking/held/held.module.code.ts"

const GONE_AT = "akasha/checks-system/change-walking/held/gone.module.ts"

export const TYPE_AT = "akasha/checks-system/change-walking/held/held.page-type.ts"

const HELD_ID = "01a04bc4-0000-7000-8000-00000000000a"

export const PAGE_TYPE = "page-type"

export const MODULE = "module"

export const AGENT = "change-agent"

const TEXT_PROPERTY = "text-property"

const PAGE_PROPERTY = "page-property"

const LOADED_EXPORT_SLUG = "loaded-export"

const LOADED_EXPORT_KEY = "loadedExport"

const TYPE_PAGE_AT = "akasha/page-type.page-type.ts"

const PROPERTY_PAGE_AT = "akasha/loaded-export.text-property.ts"

const AGENT_PAGE_AT = "akasha/change-agent.page-type.ts"

export const scratch = scratchWorld()

export function loadedWorld(loaded: readonly string[] | null): Answering {
  const root = scratch.rootFor("akasha-loaded-export-")
  const values = new Map<string, Value>()
  const filed = (kind: string, slug: string, path: string, value: Value): string => {
    const id = `id-${slug}`
    listedFiled(root, kind, slug, [{ path, id }])
    idFiled(root, id, [{ path, id }])
    values.set(path, { id, ...value })
    return id
  }
  shapeAdded(root, TEXT_PROPERTY, LOADED_EXPORT_SLUG, [
    { pageTypeSlug: TEXT_PROPERTY, slug: LOADED_EXPORT_SLUG, propertySlug: LOADED_EXPORT_SLUG },
  ])
  const type = filed(PAGE_TYPE, PAGE_TYPE, TYPE_PAGE_AT, { slug: PAGE_TYPE })
  const property = filed(TEXT_PROPERTY, LOADED_EXPORT_SLUG, PROPERTY_PAGE_AT, {
    slug: LOADED_EXPORT_SLUG,
  })
  relationFiled(root, property, PAGE_PROPERTY, type, [{ path: TYPE_PAGE_AT, id: type }])
  filed(PAGE_TYPE, AGENT, AGENT_PAGE_AT, {
    slug: AGENT,
    ...(loaded === null ? {} : { [LOADED_EXPORT_KEY]: loaded }),
  })
  return answeringOver(readingIn(root), (path) => values.get(path) ?? null)
}

export function mixedWorld(): Change {
  const root = scratch.rootFor("akasha-selecting-")
  writeFileSync(join(root, "here.ts"), "here")
  writeFileSync(join(root, "note.md"), "note")
  const held = onDisk(root)
  return { root, changed: ["gone.ts", "here.ts", "note.md"], after: held, before: held }
}

export function watchedWorld(opened: string[]): Change {
  const root = scratch.rootFor("akasha-each-taken-")
  writeFileSync(join(root, "here.ts"), "here")
  writeFileSync(join(root, "note.md"), "note")
  const held = onDisk(root)
  return {
    root,
    changed: ["here.ts", "note.md"],
    after: (path) => {
      opened.push(path)
      return held(path)
    },
    before: held,
  }
}

export function pagedWorld(): Change {
  const root = scratch.rootFor("akasha-paging-")
  mkdirSync(join(root, PAGE_AT.slice(0, PAGE_AT.lastIndexOf("/"))), { recursive: true })
  writeFileSync(join(root, PAGE_AT), `export const held = { slug: "held" }\n`)
  writeFileSync(join(root, CODE_AT), `export const HELD = "held"\n`)
  listedFiled(root, PAGE_TYPE, MODULE, [{ path: PAGE_AT, id: HELD_ID }])
  const held = onDisk(root)
  return { root, changed: [CODE_AT, GONE_AT, PAGE_AT], after: held, before: held }
}

export function tailedWorld(): Change {
  const held = pagedWorld()
  writeFileSync(join(held.root, TYPE_AT), `export const held = { slug: "held" }\n`)
  return { ...held, changed: [...held.changed, TYPE_AT] }
}

export function counting(root: string, held: Shadow, asked: () => undefined): Shadow {
  const base = readingIn(root)
  const reading: Reading = {
    holds: (at) => base.holds(at),
    listing: (at) => {
      asked()
      return base.listing(at)
    },
    lines: (at) => base.lines(at),
    read: (path) => base.read(path),
  }
  return {
    root,
    index: answeringOver(reading, (path) => held.pageOf(path)),
    before: () => held.before(),
    filed: () => held.filed(),
    holds: (path) => held.holds(path),
    listed: (folder) => held.listed(folder),
    refusals: () => held.refusals(),
    pageOf: (path) => held.pageOf(path),
    codeAt: (path) => held.codeAt(path),
  }
}
