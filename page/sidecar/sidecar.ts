import { readdirSync } from "node:fs"
import { basename, dirname, join } from "node:path"

const PAGE_SUFFIX = ".md"

const UNCOMMITTED_ATTACHMENT = /^(.*)\.[a-z0-9-]+\.uncommitted\.attachment\.[a-z0-9]+$/
const ATTACHMENT = /^(.*)\.[a-z0-9-]+\.attachment\.[a-z0-9]+$/
const UNCOMMITTED_ROWS_PART = /^(.*)\.[a-z0-9-]+\.part\d+\.uncommitted\.jsonl$/
const UNCOMMITTED_ROWS = /^(.*)\.[a-z0-9-]+\.uncommitted\.jsonl$/
const ROWS_PART = /^(.*)\.[a-z0-9-]+\.part\d+\.jsonl$/
const ROWS = /^(.*)\.[a-z0-9-]+\.jsonl$/
const UNCOMMITTED = /^(.*)\.uncommitted\.yaml$/
const SECRET = /^(.*)\.sops\.yaml$/

export function pageOfSidecar(relPath: string): string | null {
  for (const shape of [
    UNCOMMITTED_ATTACHMENT,
    ATTACHMENT,
    UNCOMMITTED_ROWS_PART,
    UNCOMMITTED_ROWS,
    ROWS_PART,
    ROWS,
    UNCOMMITTED,
    SECRET,
  ]) {
    const found = shape.exec(relPath)
    if (found !== null && found[1] !== "") return `${found[1]}${PAGE_SUFFIX}`
  }
  return null
}

export function sidecarsOf(root: string, pagePath: string): readonly string[] {
  if (!pagePath.endsWith(PAGE_SUFFIX)) return []
  const dir = dirname(pagePath)
  let names: readonly string[]
  try {
    names = readdirSync(dir === "." ? root : `${root}/${dir}`)
  } catch {
    return []
  }
  const beside: string[] = []
  for (const name of names) {
    const relPath = dir === "." ? name : join(dir, name)
    if (pageOfSidecar(relPath) === pagePath) beside.push(relPath)
  }
  return beside.sort()
}

export function sidecarCarriedTo(sidecarPath: string, from: string, to: string): string {
  const suffix = basename(sidecarPath).slice(basename(from, PAGE_SUFFIX).length)
  return `${to.slice(0, -PAGE_SUFFIX.length)}${suffix}`
}

export function sidecarsBeside(root: string, paths: readonly string[]): readonly string[] {
  const named = new Set(paths)
  const beside = new Set<string>()
  for (const one of paths) {
    for (const each of sidecarsOf(root, one)) if (!named.has(each)) beside.add(each)
  }
  return [...beside].sort()
}
