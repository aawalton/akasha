interface VkBind {
  keyCode: number
  mod1: number
  mod2: number
  mod3: number
  mod4: number
}

interface ConfigKeybinding {
  shared: boolean
  changedAt: number
  bindings: VkBind[]
}

interface KeybindingNaming {
  title?: string
  layer?: string
  category?: string
}

interface KeybindingChange extends KeybindingNaming {
  at: number
  shared: boolean
  bindings: VkBind[]
}

interface CapturedKeybinding extends KeybindingNaming {
  bindings: VkBind[]
}

interface KeybindingCapture {
  at: number
  actions: Record<string, CapturedKeybinding | undefined>
}

interface VkScrollEntry {
  typeId: number
  data: KeybindRowData
}

type VkScrollData = VkScrollEntry[]
