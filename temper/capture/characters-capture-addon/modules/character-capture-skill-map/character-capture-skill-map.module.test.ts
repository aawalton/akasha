import { expect, test } from "bun:test"
import { holdPagesOfTypeFromCheckout } from "akasha/design/language/lua-compiler/modules/plugin-pages-of-type/plugin-pages-of-type.module.test-fixtures.ts"
import { getPlayerSkillIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-map/character-capture-skill-map.module.code.ts"
import { getSkillId } from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdPagesOfTypeFromCheckout()

test("the place the encoder writes for a skill's game id decodes to a skill with that game id", () => {
  for (const skill of skills.list) {
    if (skill.esoSkillId === 0) continue
    const decoded = skills.data[getSkillId(getPlayerSkillIndex(skill.esoSkillId))]
    expect(decoded?.esoSkillId).toBe(skill.esoSkillId)
  }
})
