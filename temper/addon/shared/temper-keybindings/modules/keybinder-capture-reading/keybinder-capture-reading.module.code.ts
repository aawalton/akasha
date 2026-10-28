import {
  BINDING_SLOTS,
  type GameBinding,
  type Keybinding,
  pageBindingsOf,
  plainlyNamed,
  secondsOfInstant,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-pages/keybinding-pages.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import { instantOf } from "akasha/temper/items/core/modules/capture-instant/capture-instant.module.code.ts"
import { z } from "zod"

export const KEYBINDER_SAVED_VARIABLES = "TemperKeybinder_SavedVariables"

const GAME_BINDING = z.object({
  keyCode: z.number(),
  mod1: z.number(),
  mod2: z.number(),
  mod3: z.number(),
  mod4: z.number(),
})

const SLOTS = z
  .union([z.array(GAME_BINDING.nullable().optional()), z.record(z.string(), GAME_BINDING)])
  .transform((held): GameBinding[] => {
    const slots: GameBinding[] = []
    for (let slot = 1; slot <= BINDING_SLOTS; slot++) {
      const one = Array.isArray(held) ? held[slot - 1] : held[String(slot)]
      slots.push(one ?? { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 })
    }
    return slots
  })

const NAMING = {
  title: z.string().optional(),
  layer: z.string().optional(),
  category: z.string().optional(),
}

const CHANGE = z.object({ at: z.number(), shared: z.boolean(), bindings: SLOTS, ...NAMING })

const CAPTURED_ACTION = z.object({ bindings: SLOTS, ...NAMING })

const PROFILE = z.object({
  Keybindings: z.record(z.string(), SLOTS).optional(),
  Changes: z.record(z.string(), CHANGE).optional(),
  Captured: z
    .object({ at: z.number(), actions: z.record(z.string(), CAPTURED_ACTION).optional() })
    .optional(),
})

type Change = z.infer<typeof CHANGE>

type CapturedAction = z.infer<typeof CAPTURED_ACTION>

export interface KeybinderCapture {
  readonly shared: Readonly<Record<string, readonly GameBinding[]>>
  readonly changes: Readonly<Record<string, Change>>
  readonly capturedAt: number | null
  readonly actions: Readonly<Record<string, CapturedAction>>
}

export function keybinderCaptureOf(profile: unknown): KeybinderCapture {
  const read = PROFILE.safeParse(profile ?? {})
  if (!read.success) throw new Error(`the keybinder's capture is unreadable: ${read.error.message}`)
  return {
    shared: read.data.Keybindings ?? {},
    changes: read.data.Changes ?? {},
    capturedAt: read.data.Captured?.at ?? null,
    actions: read.data.Captured?.actions ?? {},
  }
}

const ROOT = z.object({
  Default: z.object({ $Machine: z.object({ $UserProfileWide: z.unknown() }) }),
})

export function keybinderCaptureIn(content: string): KeybinderCapture | null {
  if (!content.includes(KEYBINDER_SAVED_VARIABLES)) return null
  const root = ROOT.safeParse(parseLuaSavedVariablesFile(content, KEYBINDER_SAVED_VARIABLES))
  if (!root.success) return null
  return keybinderCaptureOf(root.data.Default.$Machine.$UserProfileWide)
}

type Naming = { readonly title?: string; readonly layer?: string; readonly category?: string }

function namedFrom(page: Naming | undefined, seen: Naming | undefined): Naming {
  const title = page?.title ?? seen?.title
  const layer = page?.layer ?? plainlyNamed(seen?.layer)
  const category = page?.category ?? plainlyNamed(seen?.category)
  return {
    ...(title === undefined || title === "" ? {} : { title }),
    ...(layer === undefined ? {} : { layer }),
    ...(category === undefined ? {} : { category }),
  }
}

function fillsNaming(page: Keybinding, seen: Naming): boolean {
  const named = namedFrom(page, seen)
  return (
    named.title !== page.title || named.layer !== page.layer || named.category !== page.category
  )
}

function changedLater(change: Change, page: Keybinding | undefined): boolean {
  return page === undefined || change.at > secondsOfInstant(page.changedAt)
}

export function landedKeybindings(
  capture: KeybinderCapture,
  held: ReadonlyMap<string, Keybinding>,
  seededAt: string
): Keybinding[] {
  const landed = new Map<string, Keybinding>()
  for (const [key, change] of Object.entries(capture.changes)) {
    const page = held.get(key)
    if (!changedLater(change, page)) continue
    landed.set(key, {
      key,
      ...namedFrom(page, { ...capture.actions[key], ...change }),
      bindings: pageBindingsOf(change.bindings),
      shared: change.shared,
      changedAt: instantOf(change.at),
    })
  }
  for (const [key, seen] of Object.entries(capture.actions)) {
    if (landed.has(key)) continue
    const page = held.get(key)
    if (page !== undefined) {
      if (fillsNaming(page, seen)) landed.set(key, { ...page, ...namedFrom(page, seen) })
      continue
    }
    landed.set(key, {
      key,
      ...namedFrom(undefined, seen),
      bindings: pageBindingsOf(seen.bindings),
      shared: capture.shared[key] !== undefined,
      changedAt: capture.capturedAt === null ? seededAt : instantOf(capture.capturedAt),
    })
  }
  for (const [key, slots] of Object.entries(capture.shared)) {
    if (landed.has(key) || held.has(key)) continue
    landed.set(key, { key, bindings: pageBindingsOf(slots), shared: true, changedAt: seededAt })
  }
  return [...landed.values()].sort((one, other) => (one.key < other.key ? -1 : 1))
}
