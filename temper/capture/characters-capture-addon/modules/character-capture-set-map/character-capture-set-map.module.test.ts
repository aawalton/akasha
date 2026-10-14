import { expect, test } from "bun:test"
import { holdPagesOfTypeFromCheckout } from "akasha/design/language/lua-compiler/modules/plugin-pages-of-type/plugin-pages-of-type.module.test-fixtures.ts"
import { getSetId } from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import { setsAll } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"

holdSetCatalogFromCheckout()
holdPagesOfTypeFromCheckout()

const { getSetIndex } = await import(
  "akasha/temper/capture/characters-capture-addon/modules/character-capture-set-map/character-capture-set-map.module.code.ts"
)

test("the place the encoder writes for a set's game id decodes to that set", () => {
  for (const set of setsAll().list) {
    if (set.esoSetId === 0) continue
    expect(getSetId(getSetIndex(set.esoSetId))).toBe(set.id)
  }
})
