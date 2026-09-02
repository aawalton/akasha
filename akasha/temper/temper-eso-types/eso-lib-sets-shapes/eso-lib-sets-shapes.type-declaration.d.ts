interface SharedInventoryManager {
  GetOrCreateBagCache: (
    this: SharedInventoryManager,
    bagId: number
  ) => { [slotKey: number]: { slotIndex: number } }
}

interface MailInbox {
  GetOpenMailId: (this: MailInbox) => number | undefined
}

interface EsoSystems {
  RegisterKeyboardObject: (this: EsoSystems, name: string, object: unknown) => void
}

interface ZoObjectClass {
  Initialize: (this: void, self: object, ...args: unknown[]) => void
}

interface WritGamepadTooltip {
  tooltips: { [tooltipType: number]: unknown }
  GetTooltipInfo: (
    this: WritGamepadTooltip,
    tooltipType: number
  ) => { control: { container?: unknown } }
  ClearTooltip: (this: WritGamepadTooltip, tooltipType: number, reset?: boolean) => void
  LayoutItem: (
    this: WritGamepadTooltip,
    tooltipType: number,
    itemLink: string,
    a?: boolean,
    b?: unknown,
    c?: boolean
  ) => void
}
