import type { SkillTypeId } from "akasha/temper/catalog/skill-kind/modules/skill-types/skill-types.module.code.ts"
import type { SkillSource as SharedSkillSource } from "akasha/temper/formula-framework/modules/skill-source/skill-source.module.code.ts"

export type SkillSource = SharedSkillSource<SkillTypeId>
