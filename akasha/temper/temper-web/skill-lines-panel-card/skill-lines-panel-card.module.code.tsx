import { PanelCard } from "@akasha/design-layout/panel-card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import {
  getAvailableSkillLinesGrouped,
  getClassForSkillLine,
} from "@akasha/temper-character-skills/skill-line-queries"
import { classes } from "@akasha/temper-classes/character-class"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { type SkillLineId, skillLines } from "@akasha/temper-skill-lines/skill-lines"

interface SkillLinesPanelCardProps {
  skillLineIds: readonly SkillLineId[]
  characterClass: ClassId
  onSkillLineChange: (index: number, newSkillLineId: SkillLineId) => void
  className?: string
  readOnly?: boolean
  collapseProtected?: boolean
}

export function SkillLinesPanelCard({
  skillLineIds,
  characterClass,
  onSkillLineChange,
  className,
  readOnly,
  collapseProtected,
}: SkillLinesPanelCardProps) {
  const getClassDisplayNameForSkillLine = (skillLineId: SkillLineId) => {
    const classId = getClassForSkillLine(skillLineId)
    if (classId == null) return ""
    return classes.data[classId].name
  }

  const getSkillLineDisplayName = (skillLineId: SkillLineId) => {
    return skillLines.data[skillLineId]?.name ?? skillLineId
  }

  return (
    <PanelCard
      id="skill-lines"
      collapsible={true}
      collapseProtected={collapseProtected}
      title="Skill Lines"
      className={className}
    >
      {[0, 1, 2].map((index) => {
        const currentSkillLineId = skillLineIds[index]
        const groupedOptions = getAvailableSkillLinesGrouped(characterClass, skillLineIds, index)

        return (
          <div key={index} className="flex items-center justify-between">
            <span className="text-secondary text-sm">
              {(() => {
                if (currentSkillLineId == null) return "None"
                const displayName = getClassDisplayNameForSkillLine(currentSkillLineId)
                return displayName !== "" ? displayName : "None"
              })()}
            </span>
            <Select
              value={currentSkillLineId}
              onValueChange={(v) => onSkillLineChange(index, v)}
              disabled={readOnly}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {currentSkillLineId != null ? getSkillLineDisplayName(currentSkillLineId) : ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {groupedOptions.map((group) => {
                  return (
                    <SelectGroup key={group.classId}>
                      <SelectLabel>{group.className}</SelectLabel>
                      {group.skillLineIds.map((lineId) => (
                        <SelectItem key={lineId} value={lineId}>
                          {getSkillLineDisplayName(lineId)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        )
      })}
    </PanelCard>
  )
}
