import { expect, test } from "bun:test"
import { holdPagesOfTypeFromCheckout } from "akasha/design/language/lua-compiler/modules/plugin-pages-of-type/plugin-pages-of-type.module.test-fixtures.ts"
import {
  characterPassiveSkillCount,
  getPassiveBitmaskIndex,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-passive-map/character-capture-passive-map.module.code.ts"
import { passiveSkillIds } from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdPagesOfTypeFromCheckout()

test("the encoder's passive bitmask is as long as the decoder's", () => {
  expect(characterPassiveSkillCount()).toBe(passiveSkillIds().length)
})

test("the bit the encoder sets for a passive's game id decodes to a passive with that game id", () => {
  const ids = passiveSkillIds()
  for (const id of ids) {
    const esoSkillId = skills.data[id]?.esoSkillId ?? 0
    if (esoSkillId === 0) continue
    const index = getPassiveBitmaskIndex(esoSkillId)
    expect(index).toBeDefined()
    expect(skills.data[ids[index ?? 0] ?? ""]?.esoSkillId).toBe(esoSkillId)
  }
})
