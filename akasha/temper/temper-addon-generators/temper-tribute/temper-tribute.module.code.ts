import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const CARD_SCHEMA = z
  .object({
    id: z.string(),
    cardIndex: z.number(),
    baseCardName: z.string(),
    upgradeCardName: z.string(),
  })
  .strict()

const PATRON_SCHEMA = z
  .object({
    title: z.string(),
    category: z.string(),
    esoPatronId: z.number(),
    esoCollectibleId: z.number(),
    cards: z.array(CARD_SCHEMA),
  })
  .strict()

interface OutCard {
  cardIndex: number
  baseCardName: string
  upgradeCardName: string
}

interface OutPatron {
  patronId: number
  name: string
  categoryName: string
  collectibleId: number
  cards: readonly OutCard[]
}

function titledFrom(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function patronOf(row: Page): OutPatron {
  const held = PATRON_SCHEMA.parse({
    title: row.title,
    category: row.category,
    esoPatronId: row.esoPatronId,
    esoCollectibleId: row.esoCollectibleId,
    cards: row.cards ?? [],
  })
  const cards = [...held.cards].sort((a, b) => a.cardIndex - b.cardIndex)
  return {
    patronId: held.esoPatronId,
    name: held.title,
    categoryName: titledFrom(held.category),
    collectibleId: held.esoCollectibleId,
    cards: cards.map((card) => ({
      cardIndex: card.cardIndex,
      baseCardName: card.baseCardName,
      upgradeCardName: card.upgradeCardName,
    })),
  }
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "tribute")
  if (found === undefined) throw new Error("no `temper-catalog-domain` page is slugged `tribute`")
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `tribute` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

export function generateTemperTribute(
  rows: readonly Page[],
  catalogDomains: readonly Page[]
): string {
  const patrons = rows.map(patronOf).sort((a, b) => a.name.localeCompare(b.name))
  const cardCount = patrons.reduce((held, patron) => held + patron.cards.length, 0)
  return `\
/**
 * Tales of Tribute Static Data (Generated)
 *
 * ${patrons.length} patrons, ${cardCount} upgradeable cards
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate tribute
 */

interface TributeCardEntry {
  cardIndex: number
  baseCardName: string
  upgradeCardName: string
}

interface TributePatronEntry {
  patronId: number
  name: string
  categoryName: string
  collectibleId: number
  cards: readonly TributeCardEntry[]
}

export const tributeData: TributePatronEntry[] = ${JSON.stringify(patrons, null, 2)}
`
}
