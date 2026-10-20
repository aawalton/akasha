import { expect, test } from "bun:test"
import { holdPagesOfTypeFromCheckout } from "akasha/design/language/lua-compiler/modules/plugin-pages-of-type/plugin-pages-of-type.module.test-fixtures.ts"
import {
  getScribedSkillIndex,
  getScribedSkillPlace,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-scribed-skill-map/character-capture-scribed-skill-map.module.code.ts"
import { skillIndexOfPlace } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-map/character-capture-skill-map.module.code.ts"
import { getSkillId } from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { scribedSkills } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"
import { grimoires } from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"

holdSkillCatalogFromCheckout()
holdPagesOfTypeFromCheckout()

test("each scribed skill's grimoire and focus script name its place in the scribed skills table", () => {
  for (const [index, skill] of scribedSkills.list.entries()) {
    const grimoireName = grimoires.data[skill.grimoireId].name
    const focusScriptName = skillCatalog().focusScripts.data[skill.focusScriptId].name
    expect(getScribedSkillIndex(grimoireName, focusScriptName)).toBe(index)
  }
})

test("each scribed skill's grimoire and focus script name its place in the skills table", () => {
  for (const skill of scribedSkills.list) {
    const grimoireName = grimoires.data[skill.grimoireId].name
    const focusScriptName = skillCatalog().focusScripts.data[skill.focusScriptId].name
    const place = getScribedSkillPlace(grimoireName, focusScriptName)
    expect(getSkillId(skillIndexOfPlace(place))).toBe(skill.id)
  }
})
