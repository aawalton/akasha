import type { AddonItemAction } from "akasha/temper/addon/pages/items/modules/inventory-rules-types/inventory-rules-types.module.code.ts"
import { isBackpackRequiredAction } from "akasha/temper/items/rules/core/modules/action-storage-capability/action-storage-capability.module.code.ts"
import {
  houseStorageTarget,
  matchStorageChest,
  type StorageChest,
} from "akasha/temper/items/rules/core/modules/house-storage-chest/house-storage-chest.module.code.ts"
import {
  ITEM_ACTION_VALUES,
  type ItemAction,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

interface PlanVenueSlot {
  readonly venue: string
  readonly verb: string
  readonly held?: string
}

const CHARACTER_PREFIX = "character:"

function isVendorAction(action: AddonItemAction): boolean {
  return (
    action === "sell" || action === "fence-sell" || action === "fence-launder" || action === "list"
  )
}

function isForAnotherCharacter(destination: string | undefined, currentCharId: string): boolean {
  if (currentCharId === "") return false
  if (destination === undefined || !destination.startsWith(CHARACTER_PREFIX)) return false
  return destination.substring(CHARACTER_PREFIX.length) !== currentCharId
}

export function listingHold(sellable: boolean, price: number | undefined): string | undefined {
  if (!sellable) return "can't be listed"
  if (price === undefined) return "no price"
  return undefined
}

function destinationToVenue(destination: string): string | undefined {
  if (
    destination === "bank" ||
    destination === "craft-bag" ||
    destination.startsWith("character:")
  ) {
    return "bank"
  }
  if (destination === "furniture-vault") {
    return "furniture-vault"
  }
  if (destination === "house-storage") {
    return "house-storage"
  }
  if (destination.startsWith("house-storage:")) {
    return destination
  }
  if (destination === "guild-bank" || destination.startsWith("guild-bank:")) {
    return "guild-bank"
  }
  return undefined
}

function moveVerb(destination: string): string {
  if (destination.startsWith("character:")) return "withdraw"
  return "deposit"
}

function fillVenue(elsewhere: boolean, inBackpack: boolean): PlanVenueSlot | undefined {
  if (inBackpack) {
    return elsewhere ? { venue: "bank", verb: "deposit" } : { venue: "backpack", verb: "fill" }
  }
  return elsewhere ? undefined : { venue: "bank", verb: "withdraw" }
}

const CHEST_KEEPS: ReadonlySet<string> = new Set(["nothing", "lock", "unlock", "bind"])

function itemActionOf(one: string): ItemAction | undefined {
  return ITEM_ACTION_VALUES.find((action) => action === one)
}

export function chestGivesUp(
  action: string | undefined,
  destination: string | undefined,
  chest: StorageChest,
  carriesStorage: boolean
): boolean {
  if (action === undefined) return false
  if (action === "move-to") {
    const dest = destination ?? "bank"
    if (dest === "house-storage") return false
    const target = houseStorageTarget(dest)
    if (target !== undefined && matchStorageChest(target, [chest]).kind === "one") return false
    return carriesStorage || dest.startsWith(CHARACTER_PREFIX)
  }
  if (CHEST_KEEPS.has(action)) return false
  const known = itemActionOf(action)
  return carriesStorage && known !== undefined && isBackpackRequiredAction(known, destination)
}

export function classifyPendingVenue(
  action: AddonItemAction,
  destination: string | undefined,
  isStolen: boolean,
  craftBagTakes: (this: void) => boolean,
  currentCharId = "",
  listingHeld: (this: void) => string | undefined = () => undefined,
  inBackpack = true
): PlanVenueSlot | undefined {
  if (action === "fill") {
    return fillVenue(isForAnotherCharacter(destination, currentCharId), inBackpack)
  }
  if (isVendorAction(action) && isForAnotherCharacter(destination, currentCharId)) {
    return { venue: "bank", verb: "deposit" }
  }
  if (action === "sell") return { venue: "vendor", verb: "sell" }
  if (action === "destroy") {
    return isStolen ? { venue: "fence", verb: "destroy" } : { venue: "vendor", verb: "destroy" }
  }
  if (action === "fence-sell") return { venue: "fence", verb: "sell" }
  if (action === "fence-launder") return { venue: "fence", verb: "launder" }
  if (action === "list") {
    const held = listingHeld()
    return held === undefined
      ? { venue: "guild-store", verb: "list" }
      : { venue: "guild-store", verb: "list", held }
  }
  if (action === "mail") return { venue: "mailbox", verb: "mail" }
  if (action === "deconstruct") return { venue: "crafting-station", verb: "deconstruct" }
  if (action === "refine") return { venue: "crafting-station", verb: "refine" }
  if (action === "fillet") return { venue: "crafting-station", verb: "fillet" }
  if (action === "research") return { venue: "crafting-station", verb: "research" }
  if (action === "character-equip" || action === "companion-equip") {
    return { venue: "companion-menu", verb: "equip" }
  }
  if (action === "move-to" || action === "stock") {
    const dest = destination ?? "bank"
    if (dest === "craft-bag" && !craftBagTakes()) return undefined
    const venue = destinationToVenue(dest)
    if (venue === undefined) return undefined
    return { venue, verb: action === "stock" ? "stock" : moveVerb(dest) }
  }
  return undefined
}
