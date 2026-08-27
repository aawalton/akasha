"use client"

import { camelizeKey } from "@shared/pages-access/file-rows"
import { isRecord } from "../../../utils-narrow/src/is-record"
import { useEffect, useState } from "react"

export const PAGE_TYPE_DEFINITIONS_PATH = "/api/pages/page-property-definition"

export interface FileStatedDefinition {
  readonly id: string
  readonly key: string
  readonly title: string
  readonly type: string
  readonly pageId: string
  readonly config?: { readonly returnType: string }
}

export type DefinitionsByOwner = ReadonlyMap<string, readonly FileStatedDefinition[]>

function textOf(from: Readonly<Record<string, unknown>>, key: string): string | null {
  const value = from[key]
  return typeof value === "string" && value !== "" ? value : null
}

function ownedDefinition(
  row: Readonly<Record<string, unknown>>
): { readonly owner: string; readonly definition: FileStatedDefinition } | null {
  const attributes = row.attributes
  if (!isRecord(attributes)) return null
  const key = textOf(attributes, "key")
  if (key === null) return null
  const owner = textOf(attributes, "definedOnSlug")
  if (owner === null) return null
  const type = textOf(attributes, "type") ?? "text"
  const returnType = textOf(attributes, "returntype") ?? textOf(attributes, "returnType")
  const definition: FileStatedDefinition = {
    id: camelizeKey(key),
    key,
    title: textOf(row, "title") ?? key,
    type,
    pageId: textOf(row, "id") ?? key,
    ...(type === "formula" && returnType !== null ? { config: { returnType } } : {}),
  }
  return { owner, definition }
}

export function readPageTypeDefinitions(body: unknown): DefinitionsByOwner | null {
  if (!isRecord(body)) return null
  const rows = body.rows
  if (!Array.isArray(rows)) return null
  const byOwner = new Map<string, FileStatedDefinition[]>()
  for (const row of rows) {
    if (!isRecord(row)) continue
    const owned = ownedDefinition(row)
    if (owned === null) continue
    const held = byOwner.get(owned.owner)
    if (held === undefined) byOwner.set(owned.owner, [owned.definition])
    else held.push(owned.definition)
  }
  return byOwner
}

export function definitionsAlong(
  byOwner: DefinitionsByOwner,
  extendsChain: readonly string[]
): readonly FileStatedDefinition[] {
  const nearest = new Map<string, FileStatedDefinition>()
  for (const slug of extendsChain) {
    for (const definition of byOwner.get(slug) ?? []) {
      if (nearest.has(definition.id)) continue
      nearest.set(definition.id, definition)
    }
  }
  return [...nearest.values()]
}

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>

let known: DefinitionsByOwner | null = null
let asking: Promise<DefinitionsByOwner | null> | null = null

export function forgetPageTypeDefinitions(): undefined {
  known = null
  asking = null
  return undefined
}

export async function askPageTypeDefinitions(
  fetchImpl: Fetcher = fetch
): Promise<DefinitionsByOwner | null> {
  if (known !== null) return known
  asking ??= (async () => {
    try {
      const response = await fetchImpl(PAGE_TYPE_DEFINITIONS_PATH, {
        headers: { accept: "application/json" },
      })
      if (!response.ok) {
        console.warn(
          `pages-ui: the property definitions answered ${response.status} at ${PAGE_TYPE_DEFINITIONS_PATH}, so a page type held only as a file states no properties`
        )
        return null
      }
      const read = readPageTypeDefinitions(await response.json())
      if (read === null) {
        console.warn(
          `pages-ui: the property definitions came in a shape this reader cannot read at ${PAGE_TYPE_DEFINITIONS_PATH}`
        )
        return null
      }
      known = read
      return read
    } catch (err: unknown) {
      console.warn(
        `pages-ui: the property definitions went unasked at ${PAGE_TYPE_DEFINITIONS_PATH}`,
        err
      )
      return null
    } finally {
      asking = null
    }
  })()
  return asking
}

export function usePageTypeDefinitions(): (
  extendsChain: readonly string[]
) => readonly FileStatedDefinition[] | undefined {
  const [byOwner, setByOwner] = useState<DefinitionsByOwner | null>(known)

  useEffect(() => {
    if (byOwner !== null) return
    let live = true
    void askPageTypeDefinitions().then((read) => {
      if (live && read !== null) setByOwner(read)
    })
    return () => {
      live = false
    }
  }, [byOwner])

  return (extendsChain: readonly string[]): readonly FileStatedDefinition[] | undefined =>
    byOwner === null ? undefined : definitionsAlong(byOwner, extendsChain)
}
