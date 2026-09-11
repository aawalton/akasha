import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { answeringOver } from "akasha/pages/indexes/answering/index-answering.module.code.ts"
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  listedFiled,
  pathFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { said } from "akasha/utils/run/running/running.module.code.ts"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"
import { onDisk } from "./change-walking.module.code.ts"

export const PAGE_AT = "akasha/checks-system/change-walking/held/held.module.ts"

export const CODE_AT = "akasha/checks-system/change-walking/held/held.module.code.ts"

export const NOTE_AT = "akasha/checks-system/change-walking/held/held.module.note.md"

export const GONE_AT = "akasha/checks-system/change-walking/held/gone.module.ts"

export const TYPE_AT = "akasha/checks-system/change-walking/held/held.page-type.ts"

export const STRAY_AT = "akasha/checks-system/change-walking/held/stray.ts"

export const KEPT_AT =
  "akasha/checks-system/change-walking/held/held.module.entries.uncommitted.jsonl"

export const BUILT_AT = "akasha/checks-system/change-walking/held/held.module.code.d.ts"

export const VENDORED_AT = "node_modules/held/held.module.uncommitted.ts"

const IGNORING = "*.uncommitted.*\n*.d.ts\nnode_modules/\n"

export const HELD_ID = "01a04bc4-0000-7000-8000-00000000000a"

export const PAGE_TYPE = "page-type"

export const MODULE = "module"

export const scratch = scratchWorld()

function bodyAt(root: string, path: string, body: string): undefined {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return undefined
}

export function worldOf(paths: readonly string[]): string {
  const root = scratch.rootFor("akasha-change-walking-")
  for (const path of paths) {
    bodyAt(root, path, `export const held = "${path}"\n`)
    pathFiled(root, path, [{ path: PAGE_AT, id: HELD_ID }])
  }
  return root
}

export function treeWorld(): string {
  const root = worldOf([PAGE_AT, CODE_AT])
  bodyAt(root, ".gitignore", IGNORING)
  for (const path of [STRAY_AT, KEPT_AT, BUILT_AT, VENDORED_AT]) bodyAt(root, path, "held\n")
  said(["git", "-C", root, "init", "-q"])
  said(["git", "-C", root, "add", "-A"])
  return root
}

export function mixedWorld(): Change {
  const root = scratch.rootFor("akasha-selecting-")
  writeFileSync(join(root, "here.ts"), "here")
  writeFileSync(join(root, "note.md"), "note")
  const held = onDisk(root)
  return { root, changed: ["gone.ts", "here.ts", "note.md"], after: held, before: held }
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
  }
  return {
    index: answeringOver(reading, (path) => held.pageOf(path)),
    filed: () => held.filed(),
    refusals: () => held.refusals(),
    pageOf: (path) => held.pageOf(path),
    codeAt: (path) => held.codeAt(path),
  }
}
