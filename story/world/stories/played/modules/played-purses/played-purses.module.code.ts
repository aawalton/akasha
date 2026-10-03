"use client"

import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { worldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.ts"
import { metricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.ts"
import { askedLoudly } from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import {
  type Currency,
  denominationsIn,
  namedIn,
  pursesIn,
  revealedRows,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"
import {
  type LedgerLine,
  ledgersIn,
} from "akasha/story/world/stories/played/modules/purse-ledger/purse-ledger.module.code.ts"

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

const CHARACTER_KEY = "character"

const VALUE_KEY = "value"

const HISTORY_KEY = "history"

const CURRENCY_KEY = "currency"

const DENOMINATIONS_KEY = "denominations"

const DISPLAY_ORDER_KEY = "displayOrder"

const REVEALED_AS_KEY = "revealedAs"

const UNREVEALED_KEY = "unrevealed"

type Purses = {
  readonly purse: Readonly<Record<string, string | number>>
  readonly ledgers: Readonly<Record<string, readonly LedgerLine[]>>
}

async function currenciesOf(rows: readonly QueryRow[]): Promise<ReadonlyMap<string, Currency>> {
  const slugs = namedIn(rows, [CURRENCY_KEY]).get(worldCurrency.slug) ?? []
  const currencies = new Map<string, Currency>()
  if (slugs.length === 0) return currencies
  const asked = await askedLoudly({
    "page-type": worldCurrency.slug,
    where: { slug: { in: [...slugs] } },
    keys: [SLUG_KEY, TITLE_KEY, DENOMINATIONS_KEY],
  })
  if (!asked.ok) return currencies
  for (const row of asked.answer.rows) {
    const slug = textIn(row.values[SLUG_KEY])
    const title = textIn(row.values[TITLE_KEY])
    if (slug === null || title === null) continue
    currencies.set(`${worldCurrency.slug}/${slug}`, {
      title,
      denominations: denominationsIn(row.values[DENOMINATIONS_KEY]),
    })
  }
  return currencies
}

export async function readPurses(character: string, turn: number): Promise<Purses> {
  const asked = await askedLoudly({
    "page-type": metricCharacterCurrency.slug,
    where: { character: { is: character } },
    keys: [
      CHARACTER_KEY,
      VALUE_KEY,
      HISTORY_KEY,
      SLUG_KEY,
      TITLE_KEY,
      CURRENCY_KEY,
      DISPLAY_ORDER_KEY,
      REVEALED_AS_KEY,
      UNREVEALED_KEY,
    ],
    files: [HISTORY_KEY],
  })
  const rows = asked.ok ? revealedRows(asked.answer.rows) : []
  const currencies = await currenciesOf(rows)
  return { purse: pursesIn(rows, currencies), ledgers: ledgersIn(rows, currencies, turn) }
}
