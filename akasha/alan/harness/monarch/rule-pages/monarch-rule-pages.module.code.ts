#!/usr/bin/env bun

import { categoryPages, keyOf } from "../files/monarch-files.module.code.ts"
import type { Rule } from "../rules/monarch-rules.module.code.ts"

export function signFrom(value: unknown, path: string): Rule["amountSign"] {
  if (value === undefined || value === null || value === "") return null
  if (typeof value !== "string") throw new Error(`${path}: an amount sign is a word`)
  if (value === "positive" || value === "negative") return value
  throw new Error(`${path}: an amount sign is "positive", "negative" or nothing — not "${value}"`)
}

export async function categoryTitles(): Promise<ReadonlyMap<string, string>> {
  const titles = new Map<string, string>()
  for (const page of await categoryPages()) titles.set(page.slug, page.title)
  return titles
}

export async function categoryMonarchId(slug: string): Promise<string> {
  const page = (await categoryPages()).find((one) => one.slug === slug)
  if (page === undefined) throw new Error(`no category stands at \`${slug}\``)
  const held = keyOf(page, "monarchId")
  if (held === null) {
    throw new Error(`${page.path} names no \`monarch-id\`, so nothing can be posted back for it`)
  }
  return held
}

export async function categoryIdByName(name: string): Promise<string> {
  const found = (await categoryPages()).filter(
    (one) => one.title.toLowerCase() === name.toLowerCase()
  )
  if (found.length !== 1) {
    throw new Error(`category "${name}" resolved ${found.length} pages, expected exactly 1`)
  }
  const page = found[0]
  if (page === undefined) throw new Error(`category "${name}" came back empty`)
  return page.slug
}

export function readFlags(argv: readonly string[]): ReadonlyMap<string, readonly string[]> {
  const flags = new Map<string, string[]>()
  let key: string | null = null
  for (const token of argv) {
    if (token.startsWith("--")) {
      key = token.slice(2)
      if (!flags.has(key)) flags.set(key, [])
    } else if (key === null) {
      throw new Error(`"${token}" stands before any --flag it could belong to`)
    } else {
      flags.get(key)?.push(token)
    }
  }
  return flags
}
