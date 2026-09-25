import { existsSync } from "node:fs"
import { join } from "node:path"
import { filePropertiesAt } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { pathsOf } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  listedAt,
  type Valued,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  slugOf,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "page-type"

const APP = "ios-app"

const SCRIPT = "shell-script"

const COMPILED: readonly string[] = ["ios-component", "ios-program"]

type Shared = { readonly files: readonly string[] } | { readonly why: string }

function namedIn(value: Value, pageTypeSlug: string): readonly string[] {
  const held = value["parts"]
  if (!Array.isArray(held)) return []
  const lead = `${pageTypeSlug}/`
  const found: string[] = []
  for (const one of held) {
    if (typeof one === "string" && one.startsWith(lead)) found.push(slugOf(one))
  }
  return found
}

type Pages = string | Reading

function typeValueOf(pages: Pages, pageTypeSlug: string): Value | null {
  const listed = listedAt(pages, PAGE_TYPE, pageTypeSlug)
  const path = listed.length === 1 ? (listed[0]?.path ?? null) : null
  return path === null ? null : valueByPath(pages, path)
}

type Gathered = { readonly pages: readonly Valued[] } | { readonly why: string }

function scriptsOf(pages: Pages, named: readonly string[]): Gathered {
  const found: Valued[] = []
  const missing: string[] = []
  for (const slug of named) {
    const listed = listedAt(pages, SCRIPT, slug)[0]
    const value = listed === undefined ? null : valueByPath(pages, listed.path)
    if (listed === undefined || value === null) missing.push(slug)
    else found.push({ path: listed.path, value })
  }
  if (missing.length > 0) {
    return {
      why: `the ${APP} page type names ${missing.sort().join(", ")}, and no ${SCRIPT} page carries that slug`,
    }
  }
  return { pages: found }
}

function sharedPages(pages: Pages): Gathered {
  const type = typeValueOf(pages, APP)
  if (type === null) {
    return {
      why: `no page type in akasha is slugged ${APP}, so nothing names the scripts every build shares`,
    }
  }
  const scripts = scriptsOf(pages, namedIn(type, SCRIPT))
  if ("why" in scripts) return scripts
  const found: Valued[] = [...scripts.pages]
  for (const pageTypeSlug of COMPILED) found.push(...valuesOfType(pages, pageTypeSlug))
  return { pages: found }
}

function thereIn(pages: Pages): (at: string) => boolean {
  if (typeof pages === "string") return (at) => existsSync(join(pages, at))
  return (at) => pages.read(at) !== null
}

export function sharedBuildFiles(pages: Pages): Shared {
  const gathered = sharedPages(pages)
  if ("why" in gathered) return gathered
  const filed = filePropertiesAt(pages)
  const there = thereIn(pages)
  const repo = typeof pages === "string" ? pages : ""
  const found = new Set<string>()
  for (const one of gathered.pages) {
    for (const at of pathsOf(one.value, one.path, repo, filed, there)) {
      if (at !== one.path) found.add(at)
    }
  }
  return { files: [...found].sort() }
}
