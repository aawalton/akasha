import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-03/eso-enums-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import type { CharacterTarget } from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"

type Quickslot = NonNullable<CharacterTarget["quickslots"]>[number]

type Kind = Quickslot["kind"]

interface QuickslotLine {
  readonly text: string
  readonly met: boolean
}

function kindOf(type: number): Kind | undefined {
  if (type === ACTION_TYPE_ITEM) return "item"
  if (type === ACTION_TYPE_COLLECTIBLE) return "collectible"
  if (type === ACTION_TYPE_EMOTE) return "emote"
  if (type === ACTION_TYPE_QUICK_CHAT) return "quick-chat"
  return undefined
}

function actionTypeOf(kind: Kind): number {
  if (kind === "item") return ACTION_TYPE_ITEM
  if (kind === "collectible") return ACTION_TYPE_COLLECTIBLE
  if (kind === "emote") return ACTION_TYPE_EMOTE
  return ACTION_TYPE_QUICK_CHAT
}

function slotNow(slot: number): Quickslot | undefined {
  const wheel = HOTBAR_CATEGORY_QUICKSLOT_WHEEL
  const kind = kindOf(GetSlotType(slot, wheel))
  if (kind === undefined) return undefined
  const id =
    kind === "item" ? GetItemLinkItemId(GetSlotItemLink(slot, wheel)) : GetSlotBoundId(slot, wheel)
  return { slot, kind, id, name: zo_strformat("<<1>>", GetSlotName(slot, wheel)) }
}

function bagSlotOf(itemId: number): number | undefined {
  const size = GetBagSize(BAG_BACKPACK)
  for (let at = 0; at < size; at++) if (GetItemId(BAG_BACKPACK, at) === itemId) return at
  return undefined
}

function runOut(wanted: Quickslot | undefined, now: Quickslot | undefined): boolean {
  return (
    wanted !== undefined &&
    now === undefined &&
    wanted.kind === "item" &&
    bagSlotOf(wanted.id) === undefined
  )
}

function held(wanted: Quickslot | undefined, now: Quickslot | undefined): boolean {
  if (wanted === undefined) return now === undefined
  if (runOut(wanted, now)) return true
  return now !== undefined && now.kind === wanted.kind && now.id === wanted.id
}

function slotNumbers(): number[] {
  const slots: number[] = []
  for (let slot = 1; slot <= ACTION_BAR_UTILITY_BAR_SIZE; slot++) slots.push(slot)
  return slots
}

export function quickslotsNow(base: CharacterTarget["quickslots"]): Quickslot[] {
  const slots: Quickslot[] = []
  for (const slot of slotNumbers()) {
    const now = slotNow(slot)
    const wanted = base?.find((one) => one.slot === slot)
    const kept = runOut(wanted, now) ? wanted : now
    if (kept !== undefined) slots.push(kept)
  }
  return slots
}

export function quickslotLines(target: CharacterTarget): QuickslotLine[] {
  const wheel = target.quickslots
  if (wheel === undefined) return []
  return slotNumbers().map((slot) => {
    const wanted = wheel.find((one) => one.slot === slot)
    return {
      text: `Quickslot ${slot}: ${wanted?.name ?? "empty"}`,
      met: held(wanted, slotNow(slot)),
    }
  })
}

function setSlot(slot: number, wanted: Quickslot | undefined): string | undefined {
  const wheel = HOTBAR_CATEGORY_QUICKSLOT_WHEEL
  if (wanted === undefined) {
    CallSecureProtected("ClearSlot", slot, wheel)
    return undefined
  }
  if (wanted.kind !== "item") {
    CallSecureProtected("SelectSlotSimpleAction", actionTypeOf(wanted.kind), wanted.id, slot, wheel)
    return undefined
  }
  const at = bagSlotOf(wanted.id)
  if (at === undefined) return wanted.name
  CallSecureProtected("SelectSlotItem", BAG_BACKPACK, at, slot, wheel)
  return undefined
}

export function applyQuickslotTarget(target: CharacterTarget): string {
  const wheel = target.quickslots
  if (wheel === undefined) return ""
  if (IsUnitInCombat("player")) return "Quickslots wait until you are out of combat."
  let set = 0
  const missing: string[] = []
  for (const slot of slotNumbers()) {
    const wanted = wheel.find((one) => one.slot === slot)
    if (held(wanted, slotNow(slot))) continue
    const unset = setSlot(slot, wanted)
    if (unset === undefined) set++
    else missing.push(unset)
  }
  const said = [`${set} ${set === 1 ? "quickslot" : "quickslots"} set.`]
  if (missing.length > 0) said.push(`Not in your bag: ${missing.join(", ")}.`)
  return said.join(" ")
}
