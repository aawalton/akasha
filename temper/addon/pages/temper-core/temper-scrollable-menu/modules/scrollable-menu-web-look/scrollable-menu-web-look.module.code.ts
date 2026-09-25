import { lib } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import {
  openedInTemperWindow,
  paintOpenList,
  restoreOpenList,
} from "akasha/temper/window/modules/window-open-list/window-open-list.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface MenuOwner {
  m_container?: Control
  openingControl?: Control
}

interface ShownMenu {
  owner?: MenuOwner
}

const MENU_KINDS: readonly string[] = ["Menu", "ContextMenu", "SubMenu"]

function listOf(value: unknown): Control | undefined {
  return type(value) === "userdata" ? (value as Control) : undefined
}

function openerOf(value: unknown): Control | undefined {
  if (type(value) !== "table") return undefined
  const owner = (value as ShownMenu).owner
  return owner?.openingControl ?? owner?.m_container
}

function onShown(this: void, ...args: unknown[]): undefined {
  const list = listOf(args[0])
  if (list === undefined) return undefined
  if (openedInTemperWindow(openerOf(args[1]))) paintOpenList(list)
  return undefined
}

function onHidden(this: void, ...args: unknown[]): undefined {
  const list = listOf(args[0])
  if (list !== undefined) restoreOpenList(list)
  return undefined
}

export function openTemperMenusLikeTheWeb(this: void): undefined {
  for (const kind of MENU_KINDS) {
    lib.RegisterCallback(`On${kind}Show`, onShown)
    lib.RegisterCallback(`On${kind}Hide`, onHidden)
  }
  return undefined
}
