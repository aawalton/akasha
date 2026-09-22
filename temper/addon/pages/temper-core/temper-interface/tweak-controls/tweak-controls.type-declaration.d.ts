declare const TEMPERTWEAKS_repositionActionSlotTimersOffsetX_EditBox: LamEditboxControl

declare const TEMPERTWEAKS_repositionActionSlotTimersOffsetY_EditBox: LamEditboxControl

declare const TEMPERTWEAKS_LAM_CUSTOM_SOUNDS_DISABLE_PARENT: Control

declare const TEMPERTWEAKS_LAM_MOUNT_FAVORITES_EXCLUDE_PARENT: Control

interface TweakSkillStatusIcon {
  HasIcon: (this: TweakSkillStatusIcon) => boolean
  ClearIcons: (this: TweakSkillStatusIcon) => undefined
  AddIcon: (this: TweakSkillStatusIcon, texture: string) => undefined
  SetColor: (this: TweakSkillStatusIcon, r: number, g: number, b: number, a: number) => undefined
  Hide: (this: TweakSkillStatusIcon) => undefined
  Show: (this: TweakSkillStatusIcon) => undefined
}

interface TweakSkillLineNodeData {
  isSubclassingNode?: boolean
  skillLineIndex?: number
  skillTypeData?: { skillType?: number }
}

interface TweakSkillLineEntryControl extends Control {
  node?: { data?: TweakSkillLineNodeData }
  data?: TweakSkillLineNodeData
  enabled?: boolean
  statusIcon?: TweakSkillStatusIcon
  SetEnabled: (this: TweakSkillLineEntryControl, enabled: boolean) => undefined
}

interface TweakSkillLinesTreeNode {
  control?: TweakSkillLineEntryControl
  enabled?: boolean
  children?: TweakSkillLinesTreeNode[]
}
