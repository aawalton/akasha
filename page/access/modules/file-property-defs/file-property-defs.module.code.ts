import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import type { PropertyDefinition } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { camelizeKey } from "akasha/page/naming/folding/modules/camelize-key/camelize-key.module.code.ts"
import { streamOver } from "akasha/page/service/modules/events-reading/events-reading.module.code.ts"
import {
  eventsOpened,
  followSent,
  shapeFor,
  shapesFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type {
  Declared,
  Shape,
} from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"
import { createChangeFollowing } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { z } from "zod"

const PAGE_TYPE = "page-type"

const SHAPES = "shapes"

const asked = new Map<string, Promise<Shape | null>>()

let followed = false

const following = createChangeFollowing({
  open: () => streamOver((signal) => eventsOpened(signal)),
  send: async (body) => (await followSent(body)).ok,
  pushed: (one) => {
    if (one.slug === undefined) asked.clear()
    else asked.delete(one.slug)
    return undefined
  },
  caughtUp: () => {
    asked.clear()
    return undefined
  },
})

function followedOnce(): undefined {
  if ("document" in globalThis || followed) return undefined
  followed = true
  following.start()
  return following.follow(SHAPES, { pageTypeSlug: PAGE_TYPE })
}

function unshaped(pageTypeSlug: string, refused: string): Error {
  return new Error(
    `shapeAsked(${pageTypeSlug}): the pages answered no shape, so this reader holds no property definitions to report; an empty list would read as a page type that declares nothing (${refused})`
  )
}

async function readAlone(pageTypeSlug: string): Promise<Shape | null> {
  const got = await shapeFor(pageTypeSlug)
  if ("refused" in got) throw unshaped(pageTypeSlug, got.refused)
  return got.shape
}

type Waiting = {
  readonly settle: (shape: Shape | null) => void
  readonly fail: (why: unknown) => void
}

const waiting = new Map<string, Waiting>()

async function flushed(): Promise<void> {
  const taken = new Map(waiting)
  waiting.clear()
  const slugs = [...taken.keys()]
  const got = slugs.length === 1 ? null : await shapesFor(slugs)
  for (const [pageTypeSlug, one] of taken) {
    if (got !== null && "shapes" in got) {
      one.settle(got.shapes[pageTypeSlug] ?? null)
      continue
    }
    readAlone(pageTypeSlug).then(one.settle, one.fail)
  }
}

function read(pageTypeSlug: string): Promise<Shape | null> {
  return new Promise((settle, fail) => {
    if (waiting.size === 0) queueMicrotask(() => void flushed())
    waiting.set(pageTypeSlug, { settle, fail })
  })
}

export async function shapeAsked(pageTypeSlug: string): Promise<Shape | null> {
  followedOnce()
  const asking = asked.get(pageTypeSlug)
  if (asking !== undefined) return asking
  const started = read(pageTypeSlug)
  asked.set(pageTypeSlug, started)
  started.catch(() => {
    if (asked.get(pageTypeSlug) === started) asked.delete(pageTypeSlug)
  })
  return started
}

type SelectOption = { readonly id: string; readonly label: string; readonly color?: string }

function labelled(id: string, held: unknown): SelectOption {
  if (isRecord(held)) {
    const label = held.label
    if (typeof label === "string" && label !== "") return { id, label }
  }
  return { id, label: titledAs(id) }
}

function mapped(value: string): unknown {
  try {
    return z.unknown().parse(JSON.parse(value))
  } catch {
    return null
  }
}

function optionsFrom(value: unknown): readonly SelectOption[] | null {
  if (Array.isArray(value)) {
    const listed = value
      .filter((one): one is string => typeof one === "string" && one !== "")
      .map((one) => ({ id: one, label: titledAs(one) }))
    return listed.length === 0 ? null : listed
  }
  const held = typeof value === "string" ? mapped(value) : value
  if (!isRecord(held)) return null
  const named = Object.entries(held).map(([id, one]) => labelled(id, one))
  return named.length === 0 ? null : named
}

function coloredBy(value: unknown): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  if (!Array.isArray(value)) return held
  for (const one of value) {
    if (!isRecord(one)) continue
    const { value: named, color } = one
    if (typeof named === "string" && typeof color === "string") held.set(named, color)
  }
  return held
}

function coloredIn(options: readonly SelectOption[], colored: ReadonlyMap<string, string>): Json[] {
  return options.map((one) => {
    const color = colored.get(one.id)
    return color === undefined ? { ...one } : { ...one, color }
  })
}

const DECLARED_BY = "-property"

const RENDERED_PLAIN = "text"

const RENDERED_AS: Readonly<Record<string, string>> = {
  "boolean-property": "boolean",
  "calendar-date-property": "calendar-date",
  "calendar-time-property": "calendar-time",
  "computed-property": RENDERED_PLAIN,
  "email-address-property": RENDERED_PLAIN,
  "file-property": RENDERED_PLAIN,
  "grade-property": "select",
  "instant-property": "instant",
  "markdown-property": "markdown",
  "multi-relation-property": "multi-relation",
  "multi-select-property": "multi-select",
  "number-property": "number",
  "one-of-property": RENDERED_PLAIN,
  "page-property-entry": "json",
  "phone-number-property": RENDERED_PLAIN,
  "process-property": "json",
  "record-property": "json",
  "relation-property": "relation",
  "rich-document-property": "rich-document",
  "rrule-property": "rrule",
  "select-property": "select",
  "text-property": RENDERED_PLAIN,
  "url-property": "url",
  "action-button-property": "action-button",
}

export function renderedType(pageTypeSlug: string): string {
  const named = RENDERED_AS[pageTypeSlug]
  if (named !== undefined) return named
  return pageTypeSlug.endsWith(DECLARED_BY) ? RENDERED_PLAIN : pageTypeSlug
}

const COMPUTED = "computed-property"

const RELATION = "relation-property"

function drawnAs(one: Declared): readonly string[] {
  if (one.type !== COMPUTED || one.targetSlug === null) return one.drawnBy
  return [RELATION, ...one.drawnBy.filter((slug) => slug !== RELATION)]
}

function typeOf(one: Declared): string {
  if (one.type === COMPUTED && one.targetSlug !== null) return renderedType(RELATION)
  return renderedType(one.type)
}

export function definitionOf(one: Declared): PropertyDefinition {
  const config: Record<string, Json> = {}
  const options = optionsFrom(one.values)
  if (options !== null) config.options = coloredIn(options, coloredBy(one.optionColors))
  if (one.targetSlug !== null) config.targetPageTypeSlug = one.targetSlug
  if (one.verbId !== null) config.verbId = one.verbId
  const stated = Object.keys(config).length !== 0
  return {
    id: camelizeKey(one.key),
    key: one.key,
    title: one.title,
    type: typeOf(one),
    drawnBy: drawnAs(one),
    ...(one.memberDrawnBy.length === 0 ? {} : { memberDrawnBy: one.memberDrawnBy }),
    ...(one.fields.length === 0 ? {} : { fields: one.fields.map(definitionOf) }),
    pageId: one.pageId,
    ...(stated ? { config } : {}),
    ...(one.colorsTitle ? { colorsTitle: true } : {}),
    ...(one.icon === null ? {} : { icon: one.icon }),
    ...(one.askedByName === true ? { askedByName: true } : {}),
  }
}

export async function filePropertyDefinitions(
  pageTypeSlug: string
): Promise<readonly PropertyDefinition[]> {
  const shape = await shapeAsked(pageTypeSlug)
  if (shape === null) return []
  const taken = new Set<string>()
  const defs: PropertyDefinition[] = []
  for (const one of shape.declarations) {
    const canonical = camelizeKey(one.key)
    if (taken.has(canonical)) continue
    taken.add(canonical)
    defs.push(definitionOf(one))
  }
  return defs
}
