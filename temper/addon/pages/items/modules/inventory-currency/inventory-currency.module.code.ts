import { getCharacterLocationKey } from "akasha/temper/addon/pages/items/modules/inventory-location-keys/inventory-location-keys.module.code.ts"
import {
  getDatabase,
  getSavedVariables,
} from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type {
  CurrencyBalances,
  InventoryCurrencies,
} from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import { requireNumericKey } from "akasha/temper/addon/shared/narrow/modules/require-numeric-key/require-numeric-key.module.code.ts"
import { temperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.ts"
import type { TemperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.types.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

declare const _G: Record<string, number | undefined>

type CurrencyRow = Pick<TemperInventoryCurrency, "key" | "esoCurrencyConstant" | "bankable">

const CURRENCY_MAP: Record<number, string> = {}

const BANKABLE_CURRENCIES: number[] = []

for (const one of $pagesOfType<CurrencyRow>(temperInventoryCurrency)) {
  const name = one.esoCurrencyConstant
  const curt = name === undefined ? undefined : _G[name]
  if (curt !== undefined) {
    CURRENCY_MAP[curt] = one.key
    if (one.bankable === true) BANKABLE_CURRENCIES.push(curt)
  }
}

function ensureCurrencies(): InventoryCurrencies {
  const db = getDatabase()
  if (!db.currencies) {
    db.currencies = { characters: {} }
  }
  return db.currencies
}

export function scanCharacterCurrencies(): undefined {
  const currencies = ensureCurrencies()
  const charId = getCharacterLocationKey()
  if (charId === undefined) return
  const balances: CurrencyBalances = {}

  for (const [curtStr, key] of Object.entries(CURRENCY_MAP)) {
    const curt = requireNumericKey(curtStr, "CURRENCY_MAP")
    const amount = GetCurrencyAmount(curt, CURRENCY_LOCATION_CHARACTER)
    if (amount > 0) {
      balances[key] = amount
    }
  }

  currencies.characters[charId] = {
    displayName: GetUnitName("player"),
    lastScanned: GetTimeStamp(),
    balances: balances,
  }

  if (CURT_TRANSMUTE_CRYSTALS !== undefined) {
    const sv = getSavedVariables()
    sv.transmuteCrystalCap = GetMaxPossibleCurrency(
      CURT_TRANSMUTE_CRYSTALS,
      CURRENCY_LOCATION_ACCOUNT
    )
    sv.transmuteCrystalAmount = GetCurrencyAmount(
      CURT_TRANSMUTE_CRYSTALS,
      CURRENCY_LOCATION_ACCOUNT
    )
  }
}

export function scanBankedCurrencies(): undefined {
  const currencies = ensureCurrencies()
  const balances: CurrencyBalances = {}

  for (const curt of BANKABLE_CURRENCIES) {
    const key = CURRENCY_MAP[curt]
    if (key === undefined) continue
    const amount = GetCurrencyAmount(curt, CURRENCY_LOCATION_BANK)
    if (amount > 0) {
      balances[key] = amount
    }
  }

  currencies.bank = balances
}

export function scanAccountCurrencies(): undefined {
  const currencies = ensureCurrencies()
  const balances: CurrencyBalances = {}

  for (const [curtStr, key] of Object.entries(CURRENCY_MAP)) {
    const curt = requireNumericKey(curtStr, "CURRENCY_MAP")
    const amount = GetCurrencyAmount(curt, CURRENCY_LOCATION_ACCOUNT)
    if (amount > 0) {
      balances[key] = amount
    }
  }

  currencies.account = balances
}

export function updateCurrency(
  currencyType: number,
  currencyLocation: number,
  newAmount: number
): undefined {
  const key = CURRENCY_MAP[currencyType]
  if (key === undefined) return

  const currencies = ensureCurrencies()

  if (currencyLocation === CURRENCY_LOCATION_BANK) {
    if (!currencies.bank) {
      currencies.bank = {}
    }
    if (newAmount > 0) {
      currencies.bank[key] = newAmount
    } else {
      delete currencies.bank[key]
    }
  } else if (currencyLocation === CURRENCY_LOCATION_ACCOUNT) {
    if (!currencies.account) {
      currencies.account = {}
    }
    if (newAmount > 0) {
      currencies.account[key] = newAmount
    } else {
      delete currencies.account[key]
    }
  } else if (currencyLocation === CURRENCY_LOCATION_CHARACTER) {
    const charId = getCharacterLocationKey()
    if (charId === undefined) return
    if (!currencies.characters[charId]) {
      currencies.characters[charId] = {
        displayName: GetUnitName("player"),
        lastScanned: GetTimeStamp(),
        balances: {},
      }
    }
    const charEntry = currencies.characters[charId]
    if (newAmount > 0) {
      charEntry.balances[key] = newAmount
    } else {
      delete charEntry.balances[key]
    }
    charEntry.lastScanned = GetTimeStamp()
  }
}
