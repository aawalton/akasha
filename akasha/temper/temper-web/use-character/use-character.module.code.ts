"use client"

import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import { useCallback, useContext } from "react"
import type { CharacterAction } from "../character-actions/character-actions.module.code.ts"
import {
  CharacterDispatchContext,
  type CharacterMetadata,
  CharacterMetadataContext,
  CharacterStateContext,
} from "../character-context/character-context.module.code.tsx"
import { CHARACTER_ACTION_CREATORS } from "../character-reducer/character-reducer.module.code.ts"

export function useCharacter(): CharacterState {
  const context = useContext(CharacterStateContext)
  if (context === null) {
    throw new Error("useCharacter must be used within a CharacterProvider")
  }
  return context
}

function useCharacterDispatch(): React.Dispatch<CharacterAction> {
  const context = useContext(CharacterDispatchContext)
  if (context === null) {
    throw new Error("useCharacterDispatch must be used within a CharacterProvider")
  }
  return context
}

export function useCharacterMetadata(): CharacterMetadata {
  const context = useContext(CharacterMetadataContext)
  if (context === null) {
    throw new Error("useCharacterMetadata must be used within a CharacterProvider")
  }
  return context
}

export function useCharacterActions() {
  const dispatch = useCharacterDispatch()

  const updateBuild = useCallback(
    (updates: Partial<CharacterState>) => {
      dispatch(CHARACTER_ACTION_CREATORS.updateBuild(updates))
    },
    [dispatch]
  )

  const updateCharacter = useCallback(
    (updates: Partial<CharacterState["character"]>) => {
      dispatch(CHARACTER_ACTION_CREATORS.updateCharacter(updates))
    },
    [dispatch]
  )

  const updateEquipment = useCallback(
    (updates: Partial<CharacterState["equipment"]>) => {
      dispatch(CHARACTER_ACTION_CREATORS.updateEquipment(updates))
    },
    [dispatch]
  )

  const updateSkills = useCallback(
    (updates: Partial<CharacterState["skills"]>) => {
      dispatch(CHARACTER_ACTION_CREATORS.updateSkills(updates))
    },
    [dispatch]
  )

  const updateChampionPoints = useCallback(
    (updates: Partial<CharacterState["championPoints"]>) => {
      dispatch(CHARACTER_ACTION_CREATORS.updateChampionPoints(updates))
    },
    [dispatch]
  )

  const updateConsumables = useCallback(
    (updates: Partial<CharacterState["consumables"]>) => {
      dispatch(CHARACTER_ACTION_CREATORS.updateConsumables(updates))
    },
    [dispatch]
  )

  const updateTarget = useCallback(
    (updates: Partial<CharacterState["target"]>) => {
      dispatch(CHARACTER_ACTION_CREATORS.updateTarget(updates))
    },
    [dispatch]
  )

  const updateAccount = useCallback(
    (updates: Partial<CharacterState["account"]>) => {
      dispatch(CHARACTER_ACTION_CREATORS.updateAccount(updates))
    },
    [dispatch]
  )

  const setClassWithCleanup = useCallback(
    (payload: {
      newClass: ClassId
      validatedSkillLineIds: readonly SkillLineId[]
      clearedEquipment: CharacterState["equipment"]
      clearedSkills: CharacterState["skills"]
    }) => {
      dispatch(CHARACTER_ACTION_CREATORS.setClassWithCleanup(payload))
    },
    [dispatch]
  )

  const resetBuild = useCallback(
    (build: CharacterState) => {
      dispatch(CHARACTER_ACTION_CREATORS.reset(build))
    },
    [dispatch]
  )

  return {
    updateBuild,
    updateCharacter,
    updateEquipment,
    updateSkills,
    updateChampionPoints,
    updateConsumables,
    updateTarget,
    updateAccount,
    setClassWithCleanup,
    resetBuild,
  }
}
