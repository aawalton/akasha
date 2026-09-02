import type { Skill } from "@akasha/temper-character-skills/character-skills"
import { type SkillId, skills } from "@akasha/temper-character-skills/character-skills"
import type { ScribedSkill } from "@akasha/temper-character-skills/scribed-skill-types"
import { getScribedSkillId } from "@akasha/temper-character-skills/scribed-skills"
import { type GrimoireId, grimoires } from "@akasha/temper-character-skills/scribing-grimoires"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import type { PendingScriptEdits } from "../skills-types/skills-types.module.code.ts"

interface UseScribedSkillsReturn {
  scribedSkillDefinitions: readonly Skill[]
  sortedScribing: ReadonlyArray<{ skill: ScribedSkill; originalIndex: number }>
  editingIndex: number | null
  pendingEdits: PendingScriptEdits | null
  isScribingSelectionOpen: boolean
  openScribingSelection: () => void
  closeScribingSelection: () => void
  handleScribingSelectionComplete: (grimoireId: GrimoireId, focusScriptId: FocusScriptId) => void
  openScriptEdit: (index: number) => void
  saveScriptEdits: () => void
  cancelScriptEdits: () => void
  removeSkill: (index: number) => void
  setPendingEdits: (edits: PendingScriptEdits) => void
}

export function useScribedSkills(
  scribing: readonly ScribedSkill[],
  onUpdateScribing: (scribing: readonly ScribedSkill[]) => void
): UseScribedSkillsReturn {
  const [editingScribedSkillIndex, setEditingScribedSkillIndex] = useState<number | null>(null)
  const [pendingScriptEdits, setPendingScriptEdits] = useState<PendingScriptEdits | null>(null)
  const [isScribingSelectionOpen, setIsScribingSelectionOpen] = useState(false)

  const scribedSkillDefinitions = useMemo((): readonly Skill[] => {
    return scribing.flatMap((scribedSkill) => {
      const skillId: SkillId = scribedSkill.skillId satisfies SkillId

      const baseSkill = skills.data[skillId]
      if (!baseSkill) return []

      return [
        {
          ...baseSkill,
          grimoireId: scribedSkill.grimoireId,
          focusScriptId: scribedSkill.focusScriptId,
          signatureScriptId: scribedSkill.signatureScriptId,
          affixScriptId: scribedSkill.affixScriptId,
        },
      ]
    })
  }, [scribing])

  const sortedScribing = useMemo(() => {
    return [...scribing]
      .map((skill, originalIndex) => ({ skill, originalIndex }))
      .sort((a, b) => {
        const nameA =
          a.skill.grimoireId && grimoires.has(a.skill.grimoireId)
            ? grimoires.data[a.skill.grimoireId].name
            : ""
        const nameB =
          b.skill.grimoireId && grimoires.has(b.skill.grimoireId)
            ? grimoires.data[b.skill.grimoireId].name
            : ""
        return nameA.localeCompare(nameB)
      })
  }, [scribing])

  const handleOpenScribedSkillEdit = (index: number) => {
    const skill = scribing[index]
    if (!skill) return
    setEditingScribedSkillIndex(index)
    setPendingScriptEdits({
      focusScriptId: skill.focusScriptId,
      signatureScriptId: skill.signatureScriptId,
      affixScriptId: skill.affixScriptId,
    })
  }

  const handleSaveScriptEdits = () => {
    if (editingScribedSkillIndex !== null && pendingScriptEdits) {
      const originalSkill = scribing[editingScribedSkillIndex]
      if (!originalSkill) {
        setEditingScribedSkillIndex(null)
        setPendingScriptEdits(null)
        return
      }
      const newScribing = [...scribing]

      const focusScriptChanged = pendingScriptEdits.focusScriptId !== originalSkill.focusScriptId

      let updatedSkill: ScribedSkill
      if (focusScriptChanged) {
        const newSkillId = getScribedSkillId(
          originalSkill.grimoireId,
          pendingScriptEdits.focusScriptId
        )
        if (newSkillId == null) {
          toast.error(
            "Changes not saved — Temper has no scribed skill for this grimoire with that focus script. Check that Focus is not set to None; if it is set, this is a gap in Temper's data."
          )
          setEditingScribedSkillIndex(null)
          setPendingScriptEdits(null)
          return
        }
        updatedSkill = {
          ...originalSkill,
          ...pendingScriptEdits,
          skillId: newSkillId,
        }
      } else {
        updatedSkill = {
          ...originalSkill,
          ...pendingScriptEdits,
        }
      }

      newScribing[editingScribedSkillIndex] = updatedSkill
      onUpdateScribing(newScribing)
    }
    setEditingScribedSkillIndex(null)
    setPendingScriptEdits(null)
  }

  const handleCancelScriptEdits = () => {
    setEditingScribedSkillIndex(null)
    setPendingScriptEdits(null)
  }

  const removeScribedSkill = (index: number) => {
    onUpdateScribing(scribing.filter((_, i) => i !== index))
  }

  const handleScribingSelectionComplete = (
    grimoireId: GrimoireId,
    focusScriptId: FocusScriptId
  ) => {
    const skillId = getScribedSkillId(grimoireId, focusScriptId)
    if (skillId == null) {
      toast.error(
        "Skill not added — Temper has no scribed skill for that grimoire and focus script. Temper offered that combination, so the gap is in its data, not your selection."
      )
      setIsScribingSelectionOpen(false)
      return
    }

    const newIndex = scribing.length
    const newSkill: ScribedSkill = {
      skillId,
      grimoireId: grimoireId,
      focusScriptId: focusScriptId,
      signatureScriptId: "no-signature-script",
      affixScriptId: "no-affix-script",
    }
    const newScribing: ScribedSkill[] = [...scribing, newSkill]
    onUpdateScribing(newScribing)
    setIsScribingSelectionOpen(false)
    setEditingScribedSkillIndex(newIndex)
    setPendingScriptEdits({
      focusScriptId: focusScriptId,
      signatureScriptId: "no-signature-script",
      affixScriptId: "no-affix-script",
    })
  }

  const openScribingSelection = () => setIsScribingSelectionOpen(true)
  const closeScribingSelection = () => setIsScribingSelectionOpen(false)

  return {
    scribedSkillDefinitions,
    sortedScribing,
    editingIndex: editingScribedSkillIndex,
    pendingEdits: pendingScriptEdits,
    isScribingSelectionOpen,
    openScribingSelection,
    closeScribingSelection,
    handleScribingSelectionComplete,
    openScriptEdit: handleOpenScribedSkillEdit,
    saveScriptEdits: handleSaveScriptEdits,
    cancelScriptEdits: handleCancelScriptEdits,
    removeSkill: removeScribedSkill,
    setPendingEdits: setPendingScriptEdits,
  }
}
