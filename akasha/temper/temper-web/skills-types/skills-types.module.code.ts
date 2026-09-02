import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { Skill } from "@akasha/temper-character-skills/character-skills"
import type { ScribedSkill } from "@akasha/temper-character-skills/scribed-skill-types"
import type { AffixScriptId } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import type { SignatureScriptId } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import type { SkillLineCategoryId } from "@akasha/temper-skill-lines/skill-line-category-data"

export type BarType = "primary" | "backup"

export interface SkillsPanelProps {
  skills: CharacterState["skills"]
  scribing: readonly ScribedSkill[]
  character: CharacterState["character"]
  equipment: CharacterState["equipment"]
  availableSkills: readonly Skill[]
  onUpdateSkills: (updates: Partial<CharacterState["skills"]>) => void
  onUpdateScribing: (scribing: readonly ScribedSkill[]) => void
  onUpdateCharacter: (updates: Partial<CharacterState["character"]>) => void
  columnCount: 1 | 2
  readOnly?: boolean
  passiveSearch?: string
  passiveCategory?: SkillLineCategoryId | null
}

export interface PendingScriptEdits {
  focusScriptId: FocusScriptId
  signatureScriptId: SignatureScriptId
  affixScriptId: AffixScriptId
}
