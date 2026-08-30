import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { loadedFrom, type Value } from "../../indexes/index-entries/index-entries.module.code.ts"
import { exportedAs } from "../page-export-name/page-export-name.module.code.ts"
import { namedIn, uncommittedAt } from "../page-file-name/page-file-name.module.code.ts"

const HOLDS = "uncommitted"

const PART = "part"

export function nameFor(page: string): string {
  const said = namedIn(page)
  if (said === null) return HOLDS
  return exportedAs(`${said.stem.replaceAll(".", "-")}-${said.tail}-${HOLDS}`)
}

export function bodyFor(page: string, values: Value): string {
  return `export const ${nameFor(page)} = ${JSON.stringify(values, null, 2)} as const\n`
}

export function uncommittedIn(root: string, page: string): Value | null {
  const at = uncommittedAt(page)
  if (at === null) return null
  const full = join(root, at)
  if (!existsSync(full)) return null
  const held = loadedFrom(readFileSync(full, "utf8"))
  if (held.failed !== null) {
    throw new Error(
      `'${at}' stands beside a page and could not be loaded, so what it holds is unknown rather than nothing: ${held.failed}`
    )
  }
  if (held.value === null) {
    throw new Error(
      `'${at}' stands beside a page and declares no values, so what it holds is unknown rather than nothing`
    )
  }
  return held.value
}

export function keepUncommitted(root: string, page: string, values: Value): undefined {
  const at = uncommittedAt(page)
  if (at === null) {
    throw new Error(`'${page}' is no TypeScript file, so nothing stands beside it to hold values`)
  }
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  const scratch = `${full}.${process.pid}.${PART}`
  writeFileSync(scratch, bodyFor(page, values), "utf8")
  renameSync(scratch, full)
}

export function dropUncommitted(root: string, page: string): undefined {
  const at = uncommittedAt(page)
  if (at === null) return
  rmSync(join(root, at), { force: true })
}
