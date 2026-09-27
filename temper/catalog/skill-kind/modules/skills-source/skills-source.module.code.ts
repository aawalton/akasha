import type { SkillTypeId } from "akasha/temper/catalog/skill/type/modules/skill-type-ids/skill-type-ids.data-table.code.ts"
import type { SkillSource as SharedSkillSource } from "akasha/temper/player/character/formula-framework/modules/skill-source/skill-source.module.code.ts"

export type SkillSource = SharedSkillSource<SkillTypeId>
