import { existsSync } from "node:fs"
import { join } from "node:path"
import { filePropertiesAt } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { pathsOf } from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import {
  listedAt,
  type Valued,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { slugOf, textAt, type Value, valueAt } from "akasha/pages/value/page-value.module.code.ts"

const PAGE_TYPE = "page-type"

const APP = "ios-app"

const SCRIPT = "shell-script"

const COMPILED: readonly string[] = ["ios-component", "ios-program"]

export type Shared = { readonly files: readonly string[] } | { readonly why: string }

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

function typeValueOf(root: string, pageTypeSlug: string): Value | null {
  const listed = listedAt(root, PAGE_TYPE, pageTypeSlug)
  const path = listed.length === 1 ? (listed[0]?.path ?? null) : null
  return path === null ? null : valueAt(path, root)
}

type Gathered = { readonly pages: readonly Valued[] } | { readonly why: string }

function scriptsOf(root: string, named: readonly string[]): Gathered {
  const wanted = new Set(named)
  const found = new Map<string, Valued>()
  for (const one of valuesOfType(root, SCRIPT)) {
    const slug = textAt(one.value, "slug")
    if (slug !== null && wanted.has(slug)) found.set(slug, one)
  }
  const missing = named.filter((slug) => !found.has(slug))
  if (missing.length > 0) {
    return {
      why: `the ${APP} page type names ${missing.join(", ")}, and no ${SCRIPT} page carries that slug`,
    }
  }
  return { pages: [...found.values()] }
}

function sharedPages(root: string): Gathered {
  const type = typeValueOf(root, APP)
  if (type === null) {
    return {
      why: `no page type in akasha is slugged ${APP}, so nothing names the scripts every build shares`,
    }
  }
  const scripts = scriptsOf(root, namedIn(type, SCRIPT))
  if ("why" in scripts) return scripts
  const pages: Valued[] = [...scripts.pages]
  for (const pageTypeSlug of COMPILED) pages.push(...valuesOfType(root, pageTypeSlug))
  return { pages }
}

export function sharedBuildFiles(root: string): Shared {
  const gathered = sharedPages(root)
  if ("why" in gathered) return gathered
  const filed = filePropertiesAt(root)
  const there = (at: string): boolean => existsSync(join(root, at))
  const found = new Set<string>()
  for (const one of gathered.pages) {
    for (const at of pathsOf(one.value, one.path, root, filed, there)) {
      if (at !== one.path) found.add(at)
    }
  }
  return { files: [...found].sort() }
}
