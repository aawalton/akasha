export interface GuildListing<Id> {
  readonly uniqueId: Id
  readonly itemId: number
  readonly link: string
  readonly quantity: number
  readonly price: number
  readonly unitPrice: number
  readonly maxPrice: number | undefined
}

type GuildMiss = "none-listed" | "no-price" | "over-price" | "over-shortfall" | "over-gold"

interface GuildPicks<Id> {
  readonly picks: readonly GuildListing<Id>[]
  readonly miss: GuildMiss | undefined
}

export function guildMaxPrice(
  ruleMaxPrice: number | undefined,
  suggestedPrice: number | undefined
): number | undefined {
  if (ruleMaxPrice !== undefined && ruleMaxPrice > 0) return ruleMaxPrice
  if (suggestedPrice !== undefined && suggestedPrice > 0) return suggestedPrice
  return undefined
}

export function pickGuildListings<Id>(
  listings: readonly GuildListing<Id>[],
  shortfall: number,
  gold: number
): GuildPicks<Id> {
  const cheapest = [...listings].sort((one, two) => one.unitPrice - two.unitPrice)
  const picks: GuildListing<Id>[] = []
  let short = shortfall
  let left = gold
  let priced = false
  let withinPrice = false
  let fits = false
  for (const listing of cheapest) {
    if (short <= 0) break
    if (listing.maxPrice === undefined) continue
    priced = true
    if (listing.unitPrice > listing.maxPrice) continue
    withinPrice = true
    if (listing.quantity > short) continue
    fits = true
    if (listing.price > left) continue
    picks.push(listing)
    short -= listing.quantity
    left -= listing.price
  }
  return {
    picks,
    miss: picks.length > 0 ? undefined : missOf(listings.length, priced, withinPrice, fits),
  }
}

function missOf(listed: number, priced: boolean, withinPrice: boolean, fits: boolean): GuildMiss {
  if (listed === 0) return "none-listed"
  if (!priced) return "no-price"
  if (!withinPrice) return "over-price"
  if (!fits) return "over-shortfall"
  return "over-gold"
}

export function guildMissSaid(miss: GuildMiss): string {
  switch (miss) {
    case "none-listed":
      return "the guild store lists none"
    case "no-price":
      return "the rule states no max price and TTC suggests no price"
    case "over-price":
      return "every listing asks more than the max price for one"
    case "over-shortfall":
      return "every listing within the price is a stack larger than the shortfall"
    case "over-gold":
      return "the gold carried buys no listing within the price"
    default:
      return miss
  }
}
