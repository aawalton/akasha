import type { BitReaderState } from "@akasha/temper-build-hash/build-hash-bit-reader"
import { readBits } from "@akasha/temper-build-hash/build-hash-bit-reader"
import { recordFromKeys } from "@akasha/temper-build-hash/record-from-keys"
import type { CharacterState } from "akasha/temper/temper-character-build/build-types/build-types.module.code.ts"
import type { SkillId } from "akasha/temper/temper-character-skills/character-skills/character-skills.module.code.ts"
import {
  getPassiveSkillId,
  getSkillId,
  PASSIVE_SKILL_COUNT,
  SKILL_BITS,
  skillSlotIds,
} from "../build-codec-indices/build-codec-indices.module.code.ts"

export function decodeSkills(reader: BitReaderState): CharacterState["skills"] {
  const primarySkillBar = recordFromKeys(skillSlotIds, () =>
    getSkillId(readBits(reader, SKILL_BITS))
  )
  const backupSkillBar = recordFromKeys(skillSlotIds, () =>
    getSkillId(readBits(reader, SKILL_BITS))
  )

  return {
    "primary-skill-bar": primarySkillBar,
    "backup-skill-bar": backupSkillBar,
  }
}

export function decodePassives(reader: BitReaderState): readonly SkillId[] {
  const passives: SkillId[] = []
  for (let i = 0; i < PASSIVE_SKILL_COUNT; i++) {
    if (readBits(reader, 1) === 1) {
      passives.push(getPassiveSkillId(i))
    }
  }
  return passives
}
