import { expect, test } from "bun:test"
import { getScribedSkillIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-scribed-skill-map/character-capture-scribed-skill-map.module.code.ts"
import { focusScripts } from "akasha/temper/catalog/skill-kind/modules/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import { scribedSkills } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"
import { grimoires } from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"

test("each scribed skill's grimoire and focus script name its place in the scribed skills table", () => {
  for (const [index, skillId] of scribedSkills.ids.entries()) {
    const skill = scribedSkills.data[skillId]
    const grimoireName = grimoires.data[skill.grimoireId].name
    const focusScriptName = focusScripts.data[skill.focusScriptId].name
    expect(getScribedSkillIndex(grimoireName, focusScriptName)).toBe(index)
  }
})
