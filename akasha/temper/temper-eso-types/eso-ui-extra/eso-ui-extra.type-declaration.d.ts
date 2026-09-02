declare const ZO_ERROR_COLOR: ZoColorDef

declare const ZO_FormatDurationAgo: (this: void, seconds: number) => string

declare const ZO_CommaDelimitDecimalNumber: (this: void, value: number) => string

declare const ZO_StatusBar_SetGradientColor: (
  this: void,
  statusBar: Control,
  gradient: readonly [ZoColorDef, ZoColorDef]
) => void

interface ZoStatusBarGloss {
  EnableLeadingEdge: (this: ZoStatusBarGloss, enabled: boolean) => void
}

interface StatusBarControl {
  gloss: ZoStatusBarGloss
}

interface ZoAnimation {
  SetAlphaValues: (this: ZoAnimation, from: number, to: number) => void
}

interface ZoTimeline {
  GetFirstAnimation: (this: ZoTimeline) => ZoAnimation
  GetDuration: (this: ZoTimeline) => number
  PlayForward: (this: ZoTimeline) => void
  PlayBackward: (this: ZoTimeline) => void
  PlayFromEnd: (this: ZoTimeline, time: number) => void
}

interface Control {
  initialized?: boolean
  statusBar?: unknown
  animation?: ZoTimeline
  menuButton?: Control
  SetAutoRectClipChildren: (enabled: boolean) => void
}

interface ErrorFrameSingleton {
  suppressErrorDialog: boolean
  titleControl: LabelControl
  suppressKeybind: Control
  copyErrorCodeButton: Control
  copyKeybind: Control
  HideAllErrors: (this: ErrorFrameSingleton) => void
}

interface MainMenuKeyboard {
  ShowScene: (this: MainMenuKeyboard, sceneName: string) => void
}

declare const ZO_Dialogs_ShowGamepadDialog: (this: void, name: string, data?: object) => void

declare const ZO_Dialogs_ReleaseDialogOnButtonPress: (this: void, keybind: string) => void

declare const zo_removeCallLater: (this: void, handle: number) => void

declare const SI_SLASH_LOGOUT: number
declare const SI_SLASH_CAMP: number
declare const SI_SLASH_QUIT: number
declare const SI_LOG_OUT_GAME_CONFIRM_KEYBIND: number
declare const SI_QUIT_GAME_CONFIRM_KEYBIND: number

interface ButtonControl {
  SetPressedMouseOverTexture: (texture: string) => void
  SetDisabledTexture: (texture: string) => void
  SetPressedOffset: (x: number, y: number) => void
  SetTextureCoords: (left: number, right: number, top: number, bottom: number) => void
}
