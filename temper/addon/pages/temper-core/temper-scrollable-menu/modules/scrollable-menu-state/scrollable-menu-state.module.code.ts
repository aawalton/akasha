import { asLib } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-contextmenu-shapes/scrollable-menu-contextmenu-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

export const lib: Lib = asLib(ZO_CallbackObject.New())

let gContextMenu: ContextMenuObject | undefined

export function getContextMenu(this: void): ContextMenuObject | undefined {
  return gContextMenu
}

export function setContextMenu(this: void, contextMenu: ContextMenuObject | undefined): undefined {
  gContextMenu = contextMenu
}
