declare const FCOCHANGESTUFF_repositionActionSlotTimersOffsetX_EditBox: LamEditboxControl

declare const FCOCHANGESTUFF_repositionActionSlotTimersOffsetY_EditBox: LamEditboxControl

declare const FCOCHANGESTUFF_LAM_CUSTOM_SOUNDS_DISABLE_PARENT: Control

declare const FCOCHANGESTUFF_LAM_MOUNT_FAVORITES_EXCLUDE_PARENT: Control

interface FcocsSkillStatusIcon {
  HasIcon: (this: FcocsSkillStatusIcon) => boolean
  ClearIcons: (this: FcocsSkillStatusIcon) => undefined
  AddIcon: (this: FcocsSkillStatusIcon, texture: string) => undefined
  SetColor: (this: FcocsSkillStatusIcon, r: number, g: number, b: number, a: number) => undefined
  Hide: (this: FcocsSkillStatusIcon) => undefined
  Show: (this: FcocsSkillStatusIcon) => undefined
}

interface FcocsSkillLineNodeData {
  isSubclassingNode?: boolean
  skillLineIndex?: number
  skillTypeData?: { skillType?: number }
}

interface FcocsSkillLineEntryControl extends Control {
  node?: { data?: FcocsSkillLineNodeData }
  data?: FcocsSkillLineNodeData
  enabled?: boolean
  statusIcon?: FcocsSkillStatusIcon
  SetEnabled: (this: FcocsSkillLineEntryControl, enabled: boolean) => undefined
}

interface FcocsSkillLinesTreeNode {
  control?: FcocsSkillLineEntryControl
  enabled?: boolean
  children?: FcocsSkillLinesTreeNode[]
}
