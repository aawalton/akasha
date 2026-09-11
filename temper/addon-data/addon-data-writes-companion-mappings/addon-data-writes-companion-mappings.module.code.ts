import { COMPANIONS_OUTPUT_DIR } from "akasha/temper/addon-data/addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import { generateCompanionMappings } from "akasha/temper/addon-data/companion-mappings/companion-mappings.module.code.ts"
import { generateSkillMappings } from "akasha/temper/addon-data/companion-skill-mappings/companion-skill-mappings.module.code.ts"

export function buildAddonDataWritesCompanionMappings(
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(COMPANIONS_OUTPUT_DIR, "companion-mappings.generated.ts", generateCompanionMappings()),
    w(COMPANIONS_OUTPUT_DIR, "skill-mappings.generated.ts", generateSkillMappings()),
  ]
}
