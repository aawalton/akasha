import { asLcmLabel } from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-casts/custom-menu-casts.module.code.ts"
import {
  SUBMENU_ITEM_MOUSE_ENTER,
  SUBMENU_ITEM_MOUSE_EXIT,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-constants/custom-menu-constants.module.code.ts"
import type {
  LcmLabel,
  LcmRowControl,
  Submenu,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-types/custom-menu-types.module.code.ts"
import { menu } from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/eso-menu/eso-menu.module.code.ts"
import {
  runTooltip,
  setupDivider,
  setupHeader,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/menu-row-setup/menu-row-setup.module.code.ts"
import {
  addSubmenuItem,
  updateSubmenuAnchors,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/submenu-rows/submenu-rows.module.code.ts"
import {
  clearTimeout,
  setTimeout,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/submenu-timeout/submenu-timeout.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const wm = WINDOW_MANAGER

export function createSubmenu(this: void, name: string): Submenu {
  const window = ZO_Menus
  const submenuControl = window.CreateControl(name, CT_CONTROL)
  submenuControl.SetClampedToScreen(true)
  submenuControl.SetMouseEnabled(true)
  submenuControl.SetHidden(true)
  submenuControl.SetHandler("OnMouseEnter", clearTimeout)

  let self: Submenu

  function refreshSubMenu(this: void): undefined {
    if (self.parent !== undefined && self.parent.OnSelect !== undefined) {
      self.parent.OnSelect(SUBMENU_ITEM_MOUSE_ENTER)
    }
  }
  function exitSubMenu(this: void): undefined {
    if (self.parent !== undefined && self.parent.OnSelect !== undefined) {
      self.parent.OnSelect(SUBMENU_ITEM_MOUSE_EXIT)
    }
  }

  submenuControl.SetHandler("OnMouseExit", () => setTimeout(exitSubMenu))
  submenuControl.SetHandler("OnHide", () => {
    clearTimeout()
    self.Clear()
  })
  submenuControl.SetDrawLayer(menu.GetDrawLayer())
  submenuControl.SetDrawTier(menu.GetDrawTier())
  submenuControl.SetDrawLevel(menu.GetDrawLevel() + 1)

  const bg = submenuControl.CreateControl<BackdropControl>("$(parent)BG", CT_BACKDROP)
  bg.SetCenterTexture("EsoUI/Art/Tooltips/UI-TooltipCenter.dds")
  bg.SetEdgeTexture("EsoUI/Art/Tooltips/UI-Border.dds", 128, 16)
  bg.SetInsets(16, 16, -16, -16)
  bg.SetAnchorFill()

  const overlay = bg.CreateControl<TextureControl>("$(parent)MungeOverlay", CT_TEXTURE)
  overlay.SetTexture("EsoUI/Art/Tooltips/munge_overlay.dds")
  overlay.SetAddressMode(TEX_MODE_WRAP)
  overlay.SetAnchor(TOPLEFT)
  overlay.SetAnchor(BOTTOMRIGHT)

  const highlight = CreateControlFromVirtual(
    "$(parent)Highlight",
    submenuControl,
    "ZO_SelectionHighlight"
  )
  highlight.SetHidden(true)

  let upInside: LcmRowControl | undefined

  function itemMouseEnter(this: void, control: LcmRowControl): undefined {
    upInside = control
    clearTimeout()
    self.SetSelectedIndex(control.index)
    runTooltip(control, true)
  }
  function itemMouseExit(this: void, control: LcmRowControl): undefined {
    upInside = undefined
    if (self.selectedIndex === control.index) {
      self.SetSelectedIndex(undefined)
    }
    runTooltip(control, false)
  }

  function resetFunction(this: void, control: LcmRowControl): undefined {
    control.SetHidden(true)
    control.ClearAnchors()
    control.OnSelect = undefined
    control.menuIndex = undefined
  }

  function itemFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
    const control = CreateControlFromVirtual<LcmRowControl>(
      "TemperCustomSubMenuRow",
      submenuControl,
      "ZO_MenuItem",
      pool.GetNextControlId()
    )
    control.SetDrawLevel(3)
    const nl = GetControl<LcmLabel>(control, "Name")
    if (nl !== undefined) {
      control.nameLabel = nl
    }
    control.SetHandler("OnMouseEnter", () => itemMouseEnter(control))
    control.SetHandler("OnMouseExit", () => itemMouseExit(control))
    control.SetHandler("OnMouseDown", IgnoreMouseDownEditFocusLoss)
    control.SetHandler("OnMouseUp", (_self: unknown, button: unknown) => {
      if (upInside === control && button === MOUSE_BUTTON_INDEX_LEFT) {
        ZO_Menu_SetLastCommandWasFromMenu(true)
        if (control.checkbox !== undefined) {
          ZO_CheckButton_OnClicked(control.checkbox, MOUSE_BUTTON_INDEX_LEFT)
        } else if (control.OnSelect !== undefined) {
          const keep = control.OnSelect()
          if (keep === undefined || keep === false) {
            ClearMenu()
          }
        }
      }
    })
    return control
  }

  function dividerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
    const control = CreateControlFromVirtual<LcmRowControl>(
      "TemperCustomSubMenuDivider",
      submenuControl,
      "ZO_NotificationsRowButton",
      pool.GetNextControlId()
    )
    setupDivider(control)
    return control
  }

  function headerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
    const control = CreateControlFromVirtual<LcmRowControl>(
      "TemperCustomSubMenuHeader",
      submenuControl,
      "ZO_AddOnSectionHeaderRow",
      pool.GetNextControlId()
    )
    setupHeader(control)
    return control
  }

  function checkboxFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
    const control = CreateControlFromVirtual<LcmRowControl>(
      "TemperCustomSubMenuItemCheckButton",
      submenuControl,
      "ZO_CheckButton",
      pool.GetNextControlId()
    )
    control.SetDrawLevel(3)
    control.nameLabel = asLcmLabel(control)
    control.SetHandler("OnMouseEnter", () => {
      const p = control.GetParent<LcmRowControl>()
      if (p !== undefined) {
        itemMouseEnter(p)
      }
    })
    control.SetHandler("OnMouseExit", () => {
      const p = control.GetParent<LcmRowControl>()
      if (p !== undefined) {
        itemMouseExit(p)
      }
    })
    ZO_CheckButton_SetToggleFunction(control, (cb: Control) => {
      self.refCount = (self.refCount ?? 0) + 1
      const parent = cb.GetParent<LcmRowControl>()
      if (parent !== undefined && parent.OnSelect !== undefined) {
        parent.OnSelect(ZO_CheckButton_IsChecked(cb))
      }
      refreshSubMenu()
      const enter = cb.GetHandler("OnMouseEnter")
      if (enter !== undefined) {
        enter(cb)
      }
    })
    return control
  }

  const itemPool = ZO_ObjectPool.New(itemFactory, resetFunction)
  const dividerPool = ZO_ObjectPool.New(dividerFactory, resetFunction)
  const checkBoxPool = ZO_ObjectPool.New(checkboxFactory, resetFunction)
  const headerPool = ZO_ObjectPool.New(headerFactory, resetFunction)

  self = {
    control: submenuControl,
    highlight,
    window,
    items: [],
    itemPool,
    dividerPool,
    checkBoxPool,
    headerPool,

    SetSelectedIndex(index) {
      let next = index
      if (next !== undefined) {
        next = zo_max(zo_min(next, this.items.length - 1), 0)
      }
      if (this.selectedIndex !== next) {
        this.UnselectItem(this.selectedIndex)
        this.SelectItem(next)
      }
    },

    UnselectItem(index) {
      if (index === undefined) {
        return
      }
      const item = this.items[index]
      if (item !== undefined) {
        this.highlight.SetHidden(true)
        const nameControl = item.nameLabel
        const [r, g, b, a] = nameControl.normalColor.UnpackRGBA()
        nameControl.SetColor(r, g, b, a)
        this.selectedIndex = undefined
      }
    },

    SelectItem(index) {
      if (index === undefined) {
        return
      }
      const item = this.items[index]
      if (item !== undefined) {
        const highlightControl = this.highlight
        highlightControl.ClearAnchors()
        highlightControl.SetAnchor(TOPLEFT, item, TOPLEFT, -2, -2)
        highlightControl.SetAnchor(BOTTOMRIGHT, item, BOTTOMRIGHT, 2, 2)
        highlightControl.SetHidden(false)
        const nameControl = item.nameLabel
        const [r, g, b, a] = nameControl.highlightColor.UnpackRGBA()
        nameControl.SetColor(r, g, b, a)
        this.selectedIndex = index
      }
    },

    UpdateAnchors() {
      updateSubmenuAnchors(this)
    },

    Clear() {
      this.UnselectItem(this.selectedIndex)
      this.items = []
      this.itemPool.ReleaseAllObjects()
      this.dividerPool.ReleaseAllObjects()
      this.checkBoxPool.ReleaseAllObjects()
      this.headerPool.ReleaseAllObjects()
      this.control.SetHidden(true)
      this.refCount = undefined
    },

    AddItem(entry, myfont, normalColor, highlightColor, itemYPad) {
      addSubmenuItem(this, entry, myfont, normalColor, highlightColor, itemYPad)
    },

    Show(parent) {
      if (!this.control.IsHidden()) {
        this.Clear()
        return false
      }
      this.UpdateAnchors()

      const padding = menu.menuPad
      const control = this.control
      control.ClearAnchors()
      if (parent.GetRight() + control.GetWidth() < GuiRoot.GetRight()) {
        control.SetAnchor(TOPLEFT, parent, TOPRIGHT, -1, -padding)
      } else {
        control.SetAnchor(TOPRIGHT, parent, TOPLEFT, 1, -padding)
      }
      control.SetHidden(false)
      this.parent = parent
      this.refCount = 2
      return true
    },
  }

  EVENT_MANAGER.RegisterForEvent(`${name}_OnGlobalMouseUp`, EVENT_GLOBAL_MOUSE_UP, () => {
    if (self.refCount !== undefined) {
      const moc = wm.GetMouseOverControl()
      if (moc !== undefined && moc.GetOwningWindow() !== submenuControl) {
        self.refCount = self.refCount - 1
        if (self.refCount <= 0) {
          self.Clear()
        }
      }
    }
  })

  return self
}
