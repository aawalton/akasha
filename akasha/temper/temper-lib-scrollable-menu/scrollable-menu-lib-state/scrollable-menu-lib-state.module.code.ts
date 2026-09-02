import { asLib } from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"

export const lib: Lib = asLib(ZO_CallbackObject.New())

let gContextMenu: ContextMenuObject | undefined

export function getContextMenu(this: void): ContextMenuObject | undefined {
  return gContextMenu
}

export function setContextMenu(this: void, contextMenu: ContextMenuObject | undefined): undefined {
  gContextMenu = contextMenu
}
