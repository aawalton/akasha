import {
  createEquipmentForBaseRoles,
  equipmentMatchesBaseRoleDefaults,
} from "@akasha/temper-companions-core/companion-factory"
import {
  getDefaultUltimateForCompanion,
  isSkillValidForCompanion,
} from "@akasha/temper-companions-core/companion-skills"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { useCallback } from "react"

export function useCompanionUpdate(
  build: CompanionState,
  updateCompanion: (updates: Partial<CompanionState["companion"]>) => void,
  updateEquipment: (equipment: CompanionState["equipment"]) => void,
  setCompanionWithCleanup: (args: {
    newCompanion: CompanionId
    clearedSkills: CompanionState["skills"]
  }) => void
) {
  return useCallback(
    (updates: Partial<CompanionState["companion"]>) => {
      if (updates.id != null && updates.id !== build.companion.id) {
        const currentSkillBar = build.skills["skill-bar"]
        const newCompanionId = updates.id

        const filteredSkillBar = {
          "active-1": isSkillValidForCompanion(currentSkillBar["active-1"], newCompanionId)
            ? currentSkillBar["active-1"]
            : "no-skill",
          "active-2": isSkillValidForCompanion(currentSkillBar["active-2"], newCompanionId)
            ? currentSkillBar["active-2"]
            : "no-skill",
          "active-3": isSkillValidForCompanion(currentSkillBar["active-3"], newCompanionId)
            ? currentSkillBar["active-3"]
            : "no-skill",
          "active-4": isSkillValidForCompanion(currentSkillBar["active-4"], newCompanionId)
            ? currentSkillBar["active-4"]
            : "no-skill",
          "active-5": isSkillValidForCompanion(currentSkillBar["active-5"], newCompanionId)
            ? currentSkillBar["active-5"]
            : "no-skill",
          ultimate: isSkillValidForCompanion(currentSkillBar.ultimate, newCompanionId)
            ? currentSkillBar.ultimate
            : getDefaultUltimateForCompanion(newCompanionId),
        } as const

        setCompanionWithCleanup({
          newCompanion: newCompanionId,
          clearedSkills: {
            "skill-bar": filteredSkillBar,
          },
        })
        return
      }

      updateCompanion(updates)

      const newRoles = updates.baseRoles
      if (newRoles && !newRoles.includes("support")) {
        const oldRoles = build.companion.baseRoles
        const changed =
          newRoles.length !== oldRoles.length || newRoles.some((r, i) => r !== oldRoles[i])
        if (changed && equipmentMatchesBaseRoleDefaults(build.equipment, oldRoles)) {
          updateEquipment(createEquipmentForBaseRoles(newRoles))
        }
      }
    },
    [
      updateCompanion,
      updateEquipment,
      setCompanionWithCleanup,
      build.companion.id,
      build.companion.baseRoles,
      build.equipment,
      build.skills,
    ]
  )
}
