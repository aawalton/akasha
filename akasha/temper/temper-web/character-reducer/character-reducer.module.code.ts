import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import {
  CHARACTER_ACTIONS,
  type CharacterAction,
} from "../character-actions/character-actions.module.code.ts"

export function characterReducer(state: CharacterState, action: CharacterAction): CharacterState {
  switch (action.type) {
    case CHARACTER_ACTIONS.UPDATE_BUILD:
      return { ...state, ...action.payload }

    case CHARACTER_ACTIONS.UPDATE_CHARACTER:
      return {
        ...state,
        character: { ...state.character, ...action.payload },
      }

    case CHARACTER_ACTIONS.UPDATE_EQUIPMENT:
      return {
        ...state,
        equipment: { ...state.equipment, ...action.payload },
      }

    case CHARACTER_ACTIONS.UPDATE_SKILLS:
      return {
        ...state,
        skills: { ...state.skills, ...action.payload },
      }

    case CHARACTER_ACTIONS.UPDATE_CHAMPION_POINTS:
      return {
        ...state,
        championPoints: { ...state.championPoints, ...action.payload },
      }

    case CHARACTER_ACTIONS.UPDATE_CONSUMABLES:
      return {
        ...state,
        consumables: { ...state.consumables, ...action.payload },
      }

    case CHARACTER_ACTIONS.UPDATE_TARGET:
      return {
        ...state,
        target: { ...state.target, ...action.payload },
      }

    case CHARACTER_ACTIONS.UPDATE_ACCOUNT:
      return {
        ...state,
        account: { ...state.account, ...action.payload },
      }

    case CHARACTER_ACTIONS.SET_CLASS_WITH_CLEANUP:
      return {
        ...state,
        character: {
          ...state.character,
          class: action.payload.newClass,
          skillLineIds: action.payload.validatedSkillLineIds,
        },
        equipment: action.payload.clearedEquipment,
        skills: action.payload.clearedSkills,
      }

    case CHARACTER_ACTIONS.BATCH_UPDATE:
      return action.payload.reduce((currentState: CharacterState, batchAction: CharacterAction) => {
        return characterReducer(currentState, batchAction)
      }, state)

    case CHARACTER_ACTIONS.RESET:
      return action.payload

    default:
      assertNever(action)
  }
}

export const CHARACTER_ACTION_CREATORS = {
  updateBuild: (payload: Partial<CharacterState>): CharacterAction => ({
    type: CHARACTER_ACTIONS.UPDATE_BUILD,
    payload,
  }),

  updateCharacter: (payload: Partial<CharacterState["character"]>): CharacterAction => ({
    type: CHARACTER_ACTIONS.UPDATE_CHARACTER,
    payload,
  }),

  updateEquipment: (payload: Partial<CharacterState["equipment"]>): CharacterAction => ({
    type: CHARACTER_ACTIONS.UPDATE_EQUIPMENT,
    payload,
  }),

  updateSkills: (payload: Partial<CharacterState["skills"]>): CharacterAction => ({
    type: CHARACTER_ACTIONS.UPDATE_SKILLS,
    payload,
  }),

  updateChampionPoints: (payload: Partial<CharacterState["championPoints"]>): CharacterAction => ({
    type: CHARACTER_ACTIONS.UPDATE_CHAMPION_POINTS,
    payload,
  }),

  updateConsumables: (payload: Partial<CharacterState["consumables"]>): CharacterAction => ({
    type: CHARACTER_ACTIONS.UPDATE_CONSUMABLES,
    payload,
  }),

  updateTarget: (payload: Partial<CharacterState["target"]>): CharacterAction => ({
    type: CHARACTER_ACTIONS.UPDATE_TARGET,
    payload,
  }),

  updateAccount: (payload: Partial<CharacterState["account"]>): CharacterAction => ({
    type: CHARACTER_ACTIONS.UPDATE_ACCOUNT,
    payload,
  }),

  setClassWithCleanup: (payload: {
    newClass: ClassId
    validatedSkillLineIds: readonly SkillLineId[]
    clearedEquipment: CharacterState["equipment"]
    clearedSkills: CharacterState["skills"]
  }): CharacterAction => ({
    type: CHARACTER_ACTIONS.SET_CLASS_WITH_CLEANUP,
    payload,
  }),

  batchUpdate: (actions: readonly CharacterAction[]): CharacterAction => ({
    type: CHARACTER_ACTIONS.BATCH_UPDATE,
    payload: actions,
  }),

  reset: (build: CharacterState): CharacterAction => ({
    type: CHARACTER_ACTIONS.RESET,
    payload: build,
  }),
}
