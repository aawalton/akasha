interface DropdownScrollControl {
  contents?: unknown
  scrollbar: { owner?: unknown; IsHidden: (this: unknown) => boolean }
  upButton: { owner?: unknown }
  downButton: { owner?: unknown }
  highlightTemplateOrFunction?: (
    this: void,
    control: DropdownRowControl
  ) => LuaMultiReturn<[unknown, unknown]>
  highlightCallback?: (
    this: void,
    control: DropdownRowControl | undefined,
    isHighlighting: boolean
  ) => undefined
  [key: string]: unknown
}
