import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { getActionReportLevel } from "akasha/temper/addon/pages/items/modules/inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import {
  CURRENCY_DISPLAY_NAMES,
  CURRENCY_KEY_TO_CURT,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-bank-currency/inventory-rules-dispatch-bank-currency.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function transferToGuildBank(this: void, curt: number, amount: number): undefined {
  if (IsProtectedFunction("TransferCurrency")) {
    CallSecureProtected(
      "TransferCurrency",
      curt,
      amount,
      CURRENCY_LOCATION_CHARACTER,
      CURRENCY_LOCATION_GUILD_BANK
    )
  } else {
    TransferCurrency(curt, amount, CURRENCY_LOCATION_CHARACTER, CURRENCY_LOCATION_GUILD_BANK)
  }
  return undefined
}

export function dispatchGuildBankCurrency(): undefined {
  if (!IsGuildBankOpen()) return

  const compiled = getCompiledConfig()
  if (!compiled?.currencyRules) return

  const level = getActionReportLevel()
  const reports: string[] = []

  for (const [currencyKey, rule] of Object.entries(compiled.currencyRules)) {
    if (rule.destination !== "guild-bank") continue

    const curt = CURRENCY_KEY_TO_CURT[currencyKey]
    if (curt === undefined) continue

    const maxTransfer = GetMaxCurrencyTransfer(
      curt,
      CURRENCY_LOCATION_CHARACTER,
      CURRENCY_LOCATION_GUILD_BANK
    )
    if (maxTransfer <= 0) continue

    const charAmount = GetCurrencyAmount(curt, CURRENCY_LOCATION_CHARACTER)
    let toTransfer = 0

    if (rule.action === "move-to") {
      toTransfer = math.min(charAmount, maxTransfer)
    } else if (rule.action === "keep-floor") {
      const surplus = math.max(0, charAmount - (rule.keepAmount ?? 0))
      toTransfer = math.min(surplus, maxTransfer)
    } else {
      toTransfer = math.min(charAmount, maxTransfer)
    }

    if (toTransfer > 0) {
      transferToGuildBank(curt, toTransfer)
      reports.push(`${CURRENCY_DISPLAY_NAMES[currencyKey]}: ${toTransfer} → guild bank`)
    }
  }

  if (reports.length > 0 && level !== "none") {
    d(`[${ADDON_NAME}] Guild bank currency transfers: ${reports.join(", ")}`)
  }
}
