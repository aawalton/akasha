import { expect, test } from "bun:test"
import { faultSaid, parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import { asPage } from "akasha/temper/addon-generators/modules/addon-data-page/addon-data-page.module.code.ts"
import { generateTemperInventoryCurrency } from "akasha/temper/addon-generators/temper-inventory-currency/temper-inventory-currency.module.code.ts"

const AT = "inventory-currency-data.generated.ts"

test("a currency id that is no identifier is written as a string literal key", () => {
  const said = generateTemperInventoryCurrency([
    asPage({ id: "1", key: "tel-var-stones", title: "Tel Var Stones", displayOrder: 1 }),
  ])
  expect(faultSaid(parsedAs(AT, said))).toBeNull()
  expect(said).toContain(`"tel-var-stones": { id: "tel-var-stones" as const`)
})

test("a currency id that is an identifier renders a file that parses", () => {
  const said = generateTemperInventoryCurrency([
    asPage({ id: "1", key: "gold", title: "Gold", displayOrder: 1 }),
  ])
  expect(faultSaid(parsedAs(AT, said))).toBeNull()
  expect(said).toContain(`"gold": { id: "gold" as const, name: "Gold" },`)
})
