import { expect, test } from "bun:test"
import { faultSaid, parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import { asPage } from "akasha/temper/addon-generators/modules/addon-data-page/addon-data-page.module.code.ts"
import { generateTemperEsoCompanionEquipmentConstant } from "akasha/temper/addon-generators/temper-eso-companion-equipment-constant/temper-eso-companion-equipment-constant.module.code.ts"

const AT = "companion-equipment-constants.generated.ts"

function rendered(): string {
  return generateTemperEsoCompanionEquipmentConstant([
    asPage({
      id: "1",
      kind: "equip-type",
      keyText: "equip-type-head",
      valueNum: 1,
      displayOrder: 0,
    }),
    asPage({
      id: "2",
      kind: "quality-eso-to-companion",
      keyText: "1",
      valueText: "no-quality",
      displayOrder: 0,
    }),
    asPage({
      id: "3",
      kind: "quality-companion-to-eso",
      keyText: "no-quality",
      valueNum: 5,
      displayOrder: 0,
    }),
  ])
}

test("a key that is no identifier is written as a string literal key", () => {
  expect(faultSaid(parsedAs(AT, rendered()))).toBeNull()
})

test("every key is written as a string literal, whichever mapping it belongs to", () => {
  const said = rendered()
  expect(said).toContain(`  "equip-type-head": 1,`)
  expect(said).toContain(`  "1": "no-quality",`)
  expect(said).toContain(`  "no-quality": 5,`)
})
