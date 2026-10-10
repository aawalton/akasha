import type { AddonItemAction } from "akasha/temper/addon/pages/items/modules/inventory-rules-types/inventory-rules-types.module.code.ts"

interface PlanVenueSlot {
  readonly venue: string
  readonly verb: string
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

export function classifyPendingVenue(
  action: AddonItemAction,
  destination: string | undefined,
  isStolen: boolean,
  craftBagTakes: (this: void) => boolean
): PlanVenueSlot | undefined {
  if (action === "sell") return { venue: "vendor", verb: "sell" }
  if (action === "destroy") {
    return isStolen ? { venue: "fence", verb: "destroy" } : { venue: "vendor", verb: "destroy" }
  }
  if (action === "fence-sell") return { venue: "fence", verb: "sell" }
  if (action === "fence-launder") return { venue: "fence", verb: "launder" }
  if (action === "list") return { venue: "guild-store", verb: "list" }
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
