import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import { asConfigKeybindings } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-casts/keybinder-casts.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-keybinder/keybinder-declarations/keybinder-declarations.type-declaration.d.ts"

const BINDING_SLOTS = 4

const NO_BINDING: VkBind = { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

export function keybindingsIn(config: unknown): Record<string, ConfigKeybinding> | undefined {
  if (!isObjectRecord(config)) return undefined
  const version = config["version"]
  if (typeof version !== "number" || version <= 0) return undefined
  const held = config["keybindings"]
  return isObjectRecord(held) ? asConfigKeybindings(held) : undefined
}

function slotOf(bindings: VkBind[] | undefined, at: number): VkBind {
  return bindings?.[at] ?? NO_BINDING
}

export function sameBindings(one: VkBind[] | undefined, other: VkBind[] | undefined): boolean {
  for (let at = 0; at < BINDING_SLOTS; at++) {
    const mine = slotOf(one, at)
    const theirs = slotOf(other, at)
    if (
      mine.keyCode !== theirs.keyCode ||
      mine.mod1 !== theirs.mod1 ||
      mine.mod2 !== theirs.mod2 ||
      mine.mod3 !== theirs.mod3 ||
      mine.mod4 !== theirs.mod4
    ) {
      return false
    }
  }
  return true
}

export function copiedBindings(bindings: VkBind[] | undefined): VkBind[] {
  const copied: VkBind[] = []
  for (let at = 0; at < BINDING_SLOTS; at++) {
    const one = slotOf(bindings, at)
    copied.push({
      keyCode: one.keyCode,
      mod1: one.mod1,
      mod2: one.mod2,
      mod3: one.mod3,
      mod4: one.mod4,
    })
  }
  return copied
}

export function adoptConfig(
  config: Record<string, ConfigKeybinding | undefined>,
  shared: Record<string, VkBind[] | undefined>,
  changes: Record<string, KeybindingChange | undefined>
): number {
  let adopted = 0
  for (const action of Object.keys(config)) {
    const entry = config[action]
    if (entry === undefined) continue
    const change = changes[action]
    if (change !== undefined && change.at > entry.changedAt) continue
    if (!entry.shared) {
      if (shared[action] !== undefined) {
        shared[action] = undefined
        adopted++
      }
      continue
    }
    if (shared[action] === undefined || !sameBindings(shared[action], entry.bindings)) {
      shared[action] = copiedBindings(entry.bindings)
      adopted++
    }
  }
  return adopted
}
