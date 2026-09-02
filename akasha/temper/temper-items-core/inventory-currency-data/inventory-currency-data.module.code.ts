import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CurrencyTemplate {
  id: string
  name: string
}

const INVENTORY_CURRENCY_DATA = {
  gold: { id: "gold" as const, name: "Gold" },
  alliancePoints: { id: "alliancePoints" as const, name: "Alliance Points" },
  telvarStones: { id: "telvarStones" as const, name: "Tel Var Stones" },
  transmuteCrystals: { id: "transmuteCrystals" as const, name: "Transmute Crystals" },
  writVouchers: { id: "writVouchers" as const, name: "Writ Vouchers" },
  eventTickets: { id: "eventTickets" as const, name: "Event Tickets" },
  endeavorSeals: { id: "endeavorSeals" as const, name: "Endeavor Seals" },
  undauntedKeys: { id: "undauntedKeys" as const, name: "Undaunted Keys" },
  crowns: { id: "crowns" as const, name: "Crowns" },
  crownGems: { id: "crownGems" as const, name: "Crown Gems" },
  archivalFortunes: { id: "archivalFortunes" as const, name: "Archival Fortunes" },
  tradeBars: { id: "tradeBars" as const, name: "Trade Bars" },
  tomePoints: { id: "tomePoints" as const, name: "Tome Points" },
  tomePointCaches: { id: "tomePointCaches" as const, name: "Tome Point Caches" },
  tomeTokens: { id: "tomeTokens" as const, name: "Tome Tokens" },
  tomeChallengeRerolls: { id: "tomeChallengeRerolls" as const, name: "Tome Challenge Rerolls" },
} as const satisfies Record<string, CurrencyTemplate>

export const currencies = createDataFile<CurrencyTemplate>()(INVENTORY_CURRENCY_DATA)
