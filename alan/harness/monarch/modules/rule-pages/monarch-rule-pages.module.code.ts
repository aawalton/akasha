#!/usr/bin/env bun

import {
  categoryPages,
  keyOf,
} from "akasha/alan/harness/monarch/modules/files/monarch-files.module.code.ts"

export async function categoryTitles(): Promise<ReadonlyMap<string, string>> {
  const titles = new Map<string, string>()
  for (const page of await categoryPages()) titles.set(page.slug, page.title)
  return titles
}

export async function categoryMonarchId(slug: string): Promise<string> {
  const page = (await categoryPages()).find((one) => one.slug === slug)
  if (page === undefined) throw new Error(`no category exists at \`${slug}\``)
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
