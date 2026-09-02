declare const ZO_ScrollList_GetSelectedData: (list: object) => unknown

declare const ZO_ScrollList_GetSelectedDataIndex: (list: object) => number | undefined

declare const ZO_ScrollList_HasVisibleData: (list: object) => boolean

declare const ZO_ScrollList_SelectDataAndScrollIntoView: (
  list: object,
  data: unknown,
  control?: unknown,
  animateInstantly?: boolean
) => undefined

declare const ZO_ScrollList_SelectPreviousData: (
  list: object,
  control?: unknown,
  animateInstantly?: boolean
) => undefined

declare const ZO_ScrollList_SelectNextData: (
  list: object,
  control?: unknown,
  animateInstantly?: boolean
) => undefined

declare const ZO_ScrollList_MouseClick: (list: object, control: Control) => undefined

declare const ZO_ScrollList_SetUseScrollbar: (list: object, useScrollbar: boolean) => undefined

interface LamDialogEditBoxControl extends Control {
  GetText: (this: unknown) => string
}

interface LamDialogEditBoxInfo {
  textType?: number
  specialCharacters?: string[]
  maxInputCharacters?: number
  defaultText?: string
  instructions?: unknown
  selectAll?: boolean
  validatesText?: boolean
  validator?: ((this: void, text: string) => boolean) | undefined
}

interface LamDialogButtonInfo {
  text: string | number
  callback?: (this: void, dialog: Control) => undefined
}

interface LamOrderListBoxDialogInfo {
  gamepadInfo?: { dialogType?: number }
  title?: { text: string | number | undefined }
  mainText?: { text: string | number | undefined }
  editBox?: LamDialogEditBoxInfo
  buttons?: LamDialogButtonInfo[]
}
