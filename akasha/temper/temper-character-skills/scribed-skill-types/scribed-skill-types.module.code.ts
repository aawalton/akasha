import type { AffixScriptId } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import type { SignatureScriptId } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import type { ScribedSkillId } from "../scribed-skills/scribed-skills.module.code.ts"
import type { GrimoireId } from "../scribing-grimoires/scribing-grimoires.module.code.ts"

export interface ScribedSkill {
  skillId: ScribedSkillId
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  signatureScriptId: SignatureScriptId
  affixScriptId: AffixScriptId
}
