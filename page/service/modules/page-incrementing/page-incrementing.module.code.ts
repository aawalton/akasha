import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  changeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { objectIn } from "akasha/page/service/modules/call-reading/call-reading.module.code.ts"
import {
  composedFor,
  sourceFor,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  type Asked,
  landedIn,
  refusalIn,
  type Writer,
  type Wrote,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import type {
  Faulted,
  Refusal,
} from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"
import { propertiesFrom } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export type Incrementing = {
  readonly writer: string
  readonly message: string
  readonly pageTypeSlug: string
  readonly slug: string
  readonly key: string
  readonly by: number
  readonly set: Value
}

export type Incremented = { readonly value: number | null } | { readonly refused: string }

export type Taking = { readonly incrementing: Incrementing } | { readonly refused: string }

function textIn(held: Value, key: string): string | null {
  const said = held[key]
  return typeof said === "string" && said !== "" ? said : null
}

export function incrementIn(given: unknown): Taking {
  const held = objectIn(given)
  if (held === null) return { refused: "an increment is a JSON object" }
  const writer = textIn(held, "writer")
  if (writer === null) return { refused: "an increment names its writer as `writer`" }
  const message = textIn(held, "message")
  if (message === null) return { refused: "an increment says what it is for as `message`" }
  const pageTypeSlug = textIn(held, "pageTypeSlug")
  if (pageTypeSlug === null) return { refused: "an increment names a page type as `pageTypeSlug`" }
  const slug = textIn(held, "slug")
  if (slug === null) return { refused: "an increment names its page as `slug`" }
  const key = textIn(held, "key")
  if (key === null) return { refused: "an increment names the key it adds to as `key`" }
  const by = held.by
  if (typeof by !== "number" || !Number.isFinite(by)) {
    return { refused: "an increment states what it adds as a finite number, `by`" }
  }
  const set = held.set === undefined ? {} : objectIn(held.set)
  if (set === null)
    return { refused: "`set` is a JSON object of the values written with the count" }
  if (key in set)
    return { refused: `\`${key}\` is the key the count is added to, so it is not set as well` }
  return { incrementing: { writer, message, pageTypeSlug, slug, key, by, set } }
}

function summed(asked: Incrementing, held: unknown): number {
  if (held === undefined || held === null) return asked.by
  if (typeof held !== "number") {
    throw new Error(
      `\`${asked.key}\` on \`${asked.slug}\` holds a ${typeof held} rather than a number, so nothing was added to it`
    )
  }
  return held + asked.by
}

export type Landing = (root: string, batch: readonly Asked[]) => Promise<Faulted<Wrote>>

async function committed(
  root: string,
  asked: Incrementing,
  values: Value,
  land: Landing
): Promise<Refusal | null> {
  if (Object.keys(values).length === 0) return null
  const composed = composedFor(root, {
    pageTypeSlug: asked.pageTypeSlug,
    slug: asked.slug,
    values,
    merge: true,
  })
  if ("refused" in composed) return { refused: composed.refused, fault: "caller" }
  const handed: Asked = {
    writer: asked.writer,
    message: asked.message,
    puts: [composed.put, ...composed.parts],
    removes: composed.removes,
    kept: composed.kept === null ? [] : [composed.kept],
  }
  const refused = refusalIn(handed)
  if (refused !== null) return { refused, fault: "caller" }
  const wrote = await land(root, [handed])
  return "refused" in wrote ? wrote : null
}

async function landing(
  root: string,
  asked: Incrementing,
  land: Landing
): Promise<Faulted<Incremented>> {
  const listed = listedAt(root, asked.pageTypeSlug, asked.slug)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  if (at === undefined) return { value: null }
  const carried = propertiesFrom(asked.pageTypeSlug, sourceFor(root))
  const counted = carried.find((one) => one.key === asked.key)
  if (counted === undefined) {
    return {
      refused: `\`${asked.pageTypeSlug}\` declares no property carried as \`${asked.key}\``,
      fault: "caller",
    }
  }
  const outside = new Set(carried.filter((one) => one.uncommitted).map((one) => one.key))
  const inside: Value = {}
  const kept: Value = {}
  for (const [key, value] of Object.entries(asked.set)) {
    if (outside.has(key)) kept[key] = value
    else inside[key] = value
  }
  if (!counted.uncommitted) {
    const value = summed(asked, valueAt(at, root)?.[asked.key])
    const refused = await committed(root, asked, { ...inside, [asked.key]: value }, land)
    if (refused !== null) return refused
    if (Object.keys(kept).length > 0) changeUncommitted(root, at, (held) => ({ ...held, ...kept }))
    return { value }
  }
  summed(asked, uncommittedIn(root, at)?.[asked.key])
  const refused = await committed(root, asked, inside, land)
  if (refused !== null) return refused
  let value = 0
  changeUncommitted(root, at, (held) => {
    value = summed(asked, held?.[asked.key])
    return { ...held, ...kept, [asked.key]: value }
  })
  return { value }
}

export function incrementing(
  root: string,
  writer: Writer,
  asked: Incrementing,
  land: Landing = landedIn
): Promise<Faulted<Incremented>> {
  return writer.alone(async (): Promise<Faulted<Incremented>> => {
    try {
      return await landing(root, asked, land)
    } catch (thrown) {
      return { refused: saidBy(thrown), fault: "service" }
    }
  })
}
