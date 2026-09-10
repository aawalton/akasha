import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import type { CompanionBaseRoleId } from "akasha/temper/companions-core/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionRoleId } from "akasha/temper/companions-core/companion-roles/companion-roles.module.code.ts"
import type { CompanionState } from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import type { RoleId } from "../../character-sources/character-roles/character-roles.module.code.ts"

export interface CharacterBuildMetadata {
  name: string
  description: string
  characterName: string
  baseRoles?: readonly RoleId[]
  targetCount?: number
}

export interface CompanionBuildMetadata {
  name: string
  description: string
  baseRoles?: readonly CompanionBaseRoleId[]
  roleId?: CompanionRoleId
  targetCount?: number
}

export interface ProfileMetadata {
  platform?: "PC" | "Xbox" | "PlayStation"
  server?: "NA" | "EU"
}

export function extractCharacterMetadata(state: CharacterState): CharacterBuildMetadata {
  return {
    name: state.name,
    description: state.description,
    characterName: state.character.name,
    baseRoles: state.character.roles,
    targetCount: state.target.targetCount,
  }
}

export function extractCompanionMetadata(state: CompanionState): CompanionBuildMetadata {
  return {
    name: state.name,
    description: state.description,
    baseRoles: state.companion.baseRoles,
    targetCount: state.target.targetCount,
  }
}

export function applyCharacterMetadata(
  state: CharacterState,
  metadata: CharacterBuildMetadata
): CharacterState {
  return {
    ...state,
    name: metadata.name,
    description: metadata.description,
    character: {
      ...state.character,
      name: metadata.characterName,
      roles: metadata.baseRoles ?? state.character.roles,
    },
    target: {
      ...state.target,
      targetCount: metadata.targetCount ?? state.target.targetCount,
    },
  }
}

export function applyCompanionMetadata(
  state: CompanionState,
  metadata: CompanionBuildMetadata
): CompanionState {
  return {
    ...state,
    name: metadata.name,
    description: metadata.description,
    companion: {
      ...state.companion,
      baseRoles: metadata.baseRoles ?? state.companion.baseRoles,
    },
    target: {
      ...state.target,
      targetCount: metadata.targetCount ?? state.target.targetCount,
    },
  }
}
