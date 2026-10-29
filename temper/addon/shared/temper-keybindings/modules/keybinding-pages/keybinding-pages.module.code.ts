import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import {
  keyCodeOf,
  keyNameOf,
  MODIFIER_KEYS,
  type ModifierKey,
  modifierCodeOf,
  NO_KEY,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-key-codes/keybinding-key-codes.module.code.ts"
import { z } from "zod"

export const KEYBINDING_PAGE_TYPE_SLUG = "temper-keybinding"

export const KEYBINDING_PAGES = "temper/addon/shared/temper-keybindings/temper-keybinding/pages"

const TYPES =
  "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const BINDING_SLOTS = 4

const MS_PER_SECOND = 1000

export interface GameBinding {
  readonly keyCode: number
  readonly mod1: number
  readonly mod2: number
  readonly mod3: number
  readonly mod4: number
}

interface PageBinding {
  readonly slot: number
  readonly key: string
  readonly modifiers?: readonly ModifierKey[]
}

export interface Keybinding {
  readonly key: string
  readonly title?: string
  readonly layer?: string
  readonly category?: string
  readonly bindings: readonly PageBinding[]
  readonly shared: boolean
  readonly changedAt: string
}

export interface KeybindingConfigEntry {
  readonly shared: boolean
  readonly changedAt: number
  readonly bindings: readonly GameBinding[]
}

export interface Held {
  readonly id?: string
  readonly createdAt?: string
  readonly updatedAt?: string
}

export function keybindingPagePath(action: string): string {
  return `${KEYBINDING_PAGES}/${slugOf(action)}.${KEYBINDING_PAGE_TYPE_SLUG}.ts`
}

const MARKUP = /\|c[0-9a-fA-F]{6}|\|r|\|t[^|]*\|t/g

export function plainlyNamed(text: string | undefined): string | undefined {
  if (text === undefined) return undefined
  const named = slugOf(text.replace(MARKUP, ""))
  return named === "" ? undefined : named
}

export function secondsOfInstant(instant: string): number {
  return Math.floor(Date.parse(instant) / MS_PER_SECOND)
}

function modifiersHeld(one: GameBinding): readonly ModifierKey[] {
  const held = [one.mod1, one.mod2, one.mod3, one.mod4]
  return MODIFIER_KEYS.filter((modifier) => held.includes(modifierCodeOf(modifier)))
}

export function pageBindingsOf(slots: readonly (GameBinding | undefined)[]): PageBinding[] {
  const bindings: PageBinding[] = []
  for (let at = 0; at < BINDING_SLOTS; at++) {
    const one = slots[at]
    if (one === undefined || one.keyCode === NO_KEY) continue
    const modifiers = modifiersHeld(one)
    const key = keyNameOf(one.keyCode)
    bindings.push(modifiers.length === 0 ? { slot: at + 1, key } : { slot: at + 1, key, modifiers })
  }
  return bindings
}

export function gameBindingsOf(bindings: readonly PageBinding[]): GameBinding[] {
  const slots: GameBinding[] = []
  for (let slot = 1; slot <= BINDING_SLOTS; slot++) {
    const one = bindings.find((binding) => binding.slot === slot)
    const held = one?.modifiers ?? []
    const mod = (modifier: ModifierKey): number =>
      held.includes(modifier) ? modifierCodeOf(modifier) : NO_KEY
    slots.push({
      keyCode: one === undefined ? NO_KEY : keyCodeOf(one.key),
      mod1: mod("KEY_CTRL"),
      mod2: mod("KEY_ALT"),
      mod3: mod("KEY_SHIFT"),
      mod4: mod("KEY_COMMAND"),
    })
  }
  return slots
}

function absent<T extends z.ZodType>(held: T) {
  return held.nullish().transform((value) => value ?? undefined)
}

const PAGE_BINDING = z.object({
  slot: z.number().int().min(1).max(BINDING_SLOTS),
  key: z.string(),
  modifiers: absent(z.array(z.enum(MODIFIER_KEYS))),
})

const KEYBINDING_PAGE = z.object({
  key: z.string(),
  title: absent(z.string()),
  layer: absent(z.string()),
  category: absent(z.string()),
  bindings: absent(z.array(PAGE_BINDING)),
  shared: z.boolean(),
  changedAt: z.string(),
})

export function keybindingOf(page: unknown): Keybinding {
  const read = KEYBINDING_PAGE.safeParse(page)
  if (!read.success) {
    throw new Error(`a ${KEYBINDING_PAGE_TYPE_SLUG} page is not one: ${read.error.message}`)
  }
  const { bindings, ...rest } = read.data
  return { ...rest, bindings: bindings ?? [] }
}

export function heldOf(page: unknown): Held {
  const read = z
    .object({ id: z.string(), createdAt: absent(z.string()), updatedAt: absent(z.string()) })
    .safeParse(page)
  return read.success ? read.data : {}
}

function ordered(one: Keybinding): Record<string, unknown> {
  return {
    title: one.title,
    key: one.key,
    layer: one.layer,
    category: one.category,
    bindings: one.bindings.length === 0 ? undefined : one.bindings,
    shared: one.shared,
    changedAt: one.changedAt,
  }
}

function literalOf(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(literalOf).join(", ")}]`
  if (typeof value !== "object" || value === null) return JSON.stringify(value)
  const fields = Object.entries(value).filter(([, under]) => under !== undefined)
  return `{ ${fields.map(([key, under]) => `${key}: ${literalOf(under)}`).join(", ")} }`
}

export function keybindingPageText(one: Keybinding, held: Held = {}): string {
  const slug = slugOf(one.key)
  const fields: Record<string, unknown> = {
    id: held.id,
    type: `page-type/${KEYBINDING_PAGE_TYPE_SLUG}`,
    slug,
    ...ordered(one),
    createdAt: held.createdAt,
    updatedAt: held.updatedAt ?? one.changedAt,
  }
  const lines = Object.entries(fields)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `  ${key}: ${literalOf(value)},`)
  return [
    `import type { TemperKeybinding } from "${TYPES}"`,
    "",
    `export const ${exportedAs(slug)} = {`,
    ...lines,
    "} as const satisfies TemperKeybinding",
    "",
  ].join("\n")
}

export function keybindingsConfigOf(
  keybindings: readonly Keybinding[]
): Record<string, KeybindingConfigEntry> {
  const config: Record<string, KeybindingConfigEntry> = {}
  const sorted = [...keybindings].sort((one, other) => (one.key < other.key ? -1 : 1))
  for (const one of sorted) {
    config[one.key] = {
      shared: one.shared,
      changedAt: secondsOfInstant(one.changedAt),
      bindings: gameBindingsOf(one.bindings),
    }
  }
  return config
}
