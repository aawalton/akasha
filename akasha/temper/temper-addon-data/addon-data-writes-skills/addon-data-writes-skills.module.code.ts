import { generateTemperCharacterSkillActivation } from "@akasha/temper-addon-generators/temper-character-skill-activation"
import { generateTemperGrimoire } from "@akasha/temper-addon-generators/temper-grimoire"
import { generateTemperScribedSkill } from "@akasha/temper-addon-generators/temper-scribed-skill"
import { generateTemperSkill } from "@akasha/temper-addon-generators/temper-skill"
import { TEMPER_SKILLS_OUTPUT_DIR } from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import type { AddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"
import { rendered } from "../failing-alone/failing-alone.module.code.ts"

export function buildAddonDataWritesSkills(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-character-skill-activation.generated.ts", () =>
      generateTemperCharacterSkillActivation(p.characterSkillActivationPages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-grimoire.generated.ts", () =>
      generateTemperGrimoire(p.grimoirePages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-scribed-skill.generated.ts", () =>
      generateTemperScribedSkill(p.scribedSkillPages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-skill.generated.ts", () =>
      generateTemperSkill(p.skillPages.rows)
    ),
  ]
}
