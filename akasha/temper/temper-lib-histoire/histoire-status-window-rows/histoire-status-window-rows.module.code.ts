import { internal } from "../histoire-state/histoire-state.module.code.ts"
import { GuildHistoryStatusWindow } from "../histoire-status-window/histoire-status-window.module.code.ts"
import { initializeClickHandler } from "../histoire-status-window-row-helpers/histoire-status-window-row-helpers.module.code.ts"
import {
  asBoolean,
  asControl,
  asNumber,
  asWindowHistoryCacheRef,
  BUTTON_NORMAL_TEXTURE,
  BUTTON_PRESSED_TEXTURE,
  DATA_ENTRY,
  guildHistoryScene,
  LINKED_ICON,
  type RowEntry,
  requireChild,
  UNLINKED_ICON,
} from "../histoire-status-window-shared/histoire-status-window-shared.module.code.ts"

function asCategoryRowCacheRef(value: unknown): CategoryRowCacheRef {
  return value as CategoryRowCacheRef
}

function requireDataList(listControl: Control): ZoScrollListDataEntry<RowEntry>[] {
  const dataList = ZO_ScrollList_GetDataList<RowEntry>(listControl)
  if (dataList == null) {
    error("LibHistoire: scroll list has no data list")
  }
  return dataList
}

interface CategoryRowCacheRef {
  HasLinked: (this: CategoryRowCacheRef) => boolean
  IsProcessing: (this: CategoryRowCacheRef) => boolean
  GetRequestMode: (this: CategoryRowCacheRef) => string
  SetRequestMode: (this: CategoryRowCacheRef, mode: string) => void
  Reset: (this: CategoryRowCacheRef) => void
  Clear: (this: CategoryRowCacheRef) => boolean | undefined
}

GuildHistoryStatusWindow.InitializeButtons = function (this) {
  const optionsButton = requireChild<ButtonControl>(this.control, "Options")
  optionsButton.SetHandler("OnClicked", () => {
    ClearMenu()

    if (this.IsLocked() === true) {
      AddCustomMenuItem("Unlock Window", () => {
        this.Unlock()
      })
    } else {
      AddCustomMenuItem("Lock Window", () => {
        this.Lock()
      })
      AddCustomMenuItem("Reset Position", () => {
        this.ResetPosition()
      })
    }
    AddCustomMenuItem("Check Stuck Requests", () => {
      asWindowHistoryCacheRef(internal.historyCache).VerifyRequests()
    })
    AddCustomMenuItem("Delete All Requests", () => {
      asWindowHistoryCacheRef(internal.historyCache).DeleteRequests()
    })
    AddCustomSubMenuItem("Zoom Mode", [
      {
        label: "Automatic",
        itemType: MENU_ADD_OPTION_CHECKBOX,
        callback: () => {
          this.SetZoomMode(internal.ZOOM_MODE_AUTO)
        },
        checked: () => this.GetZoomMode() === internal.ZOOM_MODE_AUTO,
      },
      {
        label: "Full Range",
        itemType: MENU_ADD_OPTION_CHECKBOX,
        callback: () => {
          this.SetZoomMode(internal.ZOOM_MODE_FULL_RANGE)
        },
        checked: () => this.GetZoomMode() === internal.ZOOM_MODE_FULL_RANGE,
      },
      {
        label: "Missing Range",
        itemType: MENU_ADD_OPTION_CHECKBOX,
        callback: () => {
          this.SetZoomMode(internal.ZOOM_MODE_MISSING_RANGE)
        },
        checked: () => this.GetZoomMode() === internal.ZOOM_MODE_MISSING_RANGE,
      },
    ])

    AddCustomMenuItem("Hide Window", () => {
      this.Disable()
    })
    AddCustomMenuItem("Show Debug Info", () => {
      this.ShowDebugInfo()
    })
    AddCustomMenuItem("Open Settings Menu", () => {
      const openSettings = internal.OpenSettingsPanel
      if (openSettings != null) {
        openSettings()
      }
    })

    ShowMenu(optionsButton)
  })
  this.optionsButton = optionsButton

  const toggleWindowButton = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    "LibHistoireGuildHistoryStatusWindowToggleButton",
    ZO_GuildHistory_Keyboard_TL,
    "LibHistoireGuildHistoryStatusWindowToggleButtonTemplate"
  )
  toggleWindowButton.SetHandler("OnClicked", () => {
    if (this.IsEnabled() === true) {
      this.Disable()
    } else {
      this.Enable()
    }
  })
  toggleWindowButton.SetHandler("OnMouseEnter", (...args: unknown[]) => {
    const control = asControl(args[0])
    InitializeTooltip(InformationTooltip, control, RIGHT, 0, 0)
    SetTooltipText(InformationTooltip, "Toggle Guild History Status Window")
  })
  toggleWindowButton.SetHandler("OnMouseExit", () => {
    ClearTooltip(InformationTooltip)
  })
  this.toggleWindowButton = toggleWindowButton

  if (this.IsEnabled() === true) {
    this.Enable()
  } else {
    this.Disable()
  }
}

GuildHistoryStatusWindow.InitializeGuildList = function (this, listControl) {
  const onSelectRow = (entry: RowEntry): undefined => {
    this.historyAdapter.SelectGuildByIndex(entry.value)
  }

  this.InitializeBaseList(
    listControl,
    "LibHistoireGuildHistoryStatusGuildRowTemplate",
    (rowControl) => {
      initializeClickHandler(rowControl, onSelectRow)
    }
  )

  this.emptyGuildListRow = CreateControlFromVirtual(
    "$(parent)EmptyRow",
    listControl,
    "ZO_SortFilterListEmptyRow_Keyboard"
  )
  const message = GetControl<LabelControl>(this.emptyGuildListRow, "Message")
  if (message != null) {
    message.SetText("No Guilds")
  }
}

function getCacheFromRow(rowControl: Control): CategoryRowCacheRef {
  const entry = ZO_ScrollList_GetData<RowEntry>(rowControl)
  return asCategoryRowCacheRef(entry.cache)
}

GuildHistoryStatusWindow.InitializeCategoryList = function (this, listControl) {
  const onSelectRow = (entry: RowEntry): undefined => {
    this.historyAdapter.SelectCategory(entry.value)
  }

  this.InitializeBaseList(
    listControl,
    "LibHistoireGuildHistoryStatusCategoryRowTemplate",
    (rowControl) => {
      initializeClickHandler(rowControl, onSelectRow)

      const menuButton = requireChild<Control>(rowControl, "MenuButton")
      menuButton.SetHandler(
        "OnMouseUp",
        (...args: unknown[]) => {
          const button = asNumber(args[1])
          const isInside = asBoolean(args[2])
          if (isInside && button === MOUSE_BUTTON_INDEX_LEFT) {
            const cache = getCacheFromRow(rowControl)
            ClearMenu()
            AddCustomMenuItem("Reset Managed Range", () => {
              const showReset = internal.ShowResetManagedRangeDialog
              if (showReset != null) {
                showReset(() => {
                  cache.Reset()
                })
              }
            })
            AddCustomMenuItem("Clear Cache", () => {
              const showClear = internal.ShowClearCacheDialog
              if (showClear != null) {
                showClear(() => {
                  if (cache.Clear() === true) {
                    ReloadUI()
                  } else {
                    ZO_Alert(
                      UI_ALERT_CATEGORY_ERROR,
                      SOUNDS.NEGATIVE_CLICK,
                      "Could not reset history cache"
                    )
                  }
                })
              }
            })
            AddCustomSubMenuItem("Request Mode", [
              {
                label: "Automatic",
                itemType: MENU_ADD_OPTION_CHECKBOX,
                callback: () => {
                  cache.SetRequestMode(internal.REQUEST_MODE_AUTO)
                },
                checked: () => cache.GetRequestMode() === internal.REQUEST_MODE_AUTO,
              },
              {
                label: "Force off",
                itemType: MENU_ADD_OPTION_CHECKBOX,
                callback: () => {
                  cache.SetRequestMode(internal.REQUEST_MODE_OFF)
                },
                checked: () => cache.GetRequestMode() === internal.REQUEST_MODE_OFF,
              },
              {
                label: "Force on",
                itemType: MENU_ADD_OPTION_CHECKBOX,
                callback: () => {
                  cache.SetRequestMode(internal.REQUEST_MODE_ON)
                },
                checked: () => cache.GetRequestMode() === internal.REQUEST_MODE_ON,
              },
            ])
            ShowMenu(menuButton)
          }
        },
        "LibHistoire_Click"
      )
      rowControl.menuButton = menuButton
    },
    (_rowControl, entry) => {
      const cache = entry.cache
      const hasLinked = cache.HasLinked()
      const isIdle = !cache.IsProcessing()
      void hasLinked
      void isIdle
    }
  )
}

GuildHistoryStatusWindow.SetGuildId = function (this, guildId) {
  if (this.guildId === guildId) {
    return
  }
  this.guildId = guildId
  this.Update()
}

GuildHistoryStatusWindow.SetCategory = function (this, category) {
  if (this.category === category) {
    return
  }
  this.category = category
  this.Update()
}

GuildHistoryStatusWindow.CreateDataEntry = function (this, label, cache, value, selected) {
  return ZO_ScrollList_CreateDataEntry<RowEntry>(DATA_ENTRY, {
    label,
    cache,
    value,
    selected,
  })
}

GuildHistoryStatusWindow.Update = function (this) {
  if (this.IsShowing()) {
    let hasLinkedEverything = true

    const guildListControl = this.guildListControl
    const guildScrollData = requireDataList(guildListControl)
    ZO_ScrollList_Clear(guildListControl)
    let numGuilds = 0
    const historyCache = asWindowHistoryCacheRef(internal.historyCache)
    historyCache.ForEachActiveGuild((guildCache) => {
      numGuilds = numGuilds + 1
      const guildId = guildCache.GetGuildId()
      const label = GetGuildName(guildId)
      const selected = this.guildId === guildId
      guildScrollData[guildScrollData.length] = this.CreateDataEntry(
        label,
        guildCache,
        numGuilds,
        selected
      )
      if (selected) {
        this.selectionWidget.SelectGuild(numGuilds)
      }
      if (!guildCache.HasLinked()) {
        hasLinkedEverything = false
      }
    })
    this.emptyGuildListRow.SetHidden(numGuilds > 0)
    ZO_ScrollList_Commit(guildListControl)

    const categoryListControl = this.categoryListControl
    const categoryScrollData = requireDataList(categoryListControl)
    ZO_ScrollList_Clear(categoryListControl)
    if (numGuilds > 0) {
      for (
        let eventCategory = GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN;
        eventCategory <= GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END;
        eventCategory = eventCategory + 1
      ) {
        const label = GetString("SI_GUILDHISTORYEVENTCATEGORY", eventCategory)
        const cache = historyCache.GetCategoryCache(this.guildId, eventCategory)
        const selected = this.category === eventCategory
        categoryScrollData[categoryScrollData.length] = this.CreateDataEntry(
          label,
          cache,
          eventCategory,
          selected
        )
        if (selected) {
          this.selectionWidget.SelectCategory(categoryScrollData.length)
        }
      }
    }
    ZO_ScrollList_Commit(categoryListControl)

    this.selectionWidget.SetGuildCount(numGuilds)
    this.selectionWidget.SetCategoryCount(categoryScrollData.length)
    this.selectionWidget.Update()

    this.statusIcon.SetTexture(hasLinkedEverything ? LINKED_ICON : UNLINKED_ICON)
    this.hasLinkedEverything = hasLinkedEverything
  }
}

GuildHistoryStatusWindow.SavePosition = function (this) {
  const control = this.control
  const saveData = this.saveData
  const [x, y] = control.GetScreenRect()
  saveData.x = x
  saveData.y = y
}

GuildHistoryStatusWindow.LoadPosition = function (this) {
  const control = this.control
  const saveData = this.saveData
  control.ClearAnchors()
  if (saveData.x == null || saveData.y == null) {
    control.SetAnchor(BOTTOMRIGHT, ZO_GuildHistory_Keyboard_TL, BOTTOMLEFT, -30, 30)
  } else {
    control.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, saveData.x, saveData.y)
  }
}

GuildHistoryStatusWindow.ResetPosition = function (this) {
  const saveData = this.saveData
  saveData.x = undefined
  saveData.y = undefined
  this.LoadPosition()
}

GuildHistoryStatusWindow.IsLocked = function (this) {
  return this.saveData.locked
}

GuildHistoryStatusWindow.Lock = function (this) {
  this.saveData.locked = true
  this.control.SetMovable(false)
}

GuildHistoryStatusWindow.Unlock = function (this) {
  this.saveData.locked = false
  this.control.SetMovable(true)
}

GuildHistoryStatusWindow.IsShowing = function (this) {
  return guildHistoryScene.IsShowing() && this.IsEnabled() === true
}

GuildHistoryStatusWindow.IsEnabled = function (this) {
  return this.saveData.enabled
}

GuildHistoryStatusWindow.Enable = function (this) {
  this.saveData.enabled = true
  guildHistoryScene.AddFragment(this.fragment)
  this.toggleWindowButton.SetNormalTexture(BUTTON_PRESSED_TEXTURE)
  this.toggleWindowButton.SetPressedTexture(BUTTON_NORMAL_TEXTURE)
  this.Update()
}

GuildHistoryStatusWindow.Disable = function (this) {
  this.saveData.enabled = false
  guildHistoryScene.RemoveFragment(this.fragment)
  this.toggleWindowButton.SetNormalTexture(BUTTON_NORMAL_TEXTURE)
  this.toggleWindowButton.SetPressedTexture(BUTTON_PRESSED_TEXTURE)
}

GuildHistoryStatusWindow.GetZoomMode = function (this) {
  const zoomMode = this.saveData.zoomMode
  return zoomMode != null ? zoomMode : internal.ZOOM_MODE_AUTO
}

GuildHistoryStatusWindow.SetZoomMode = function (this, zoomMode) {
  this.saveData.zoomMode = zoomMode
  internal.FireCallbacks(internal.callback.ZOOM_MODE_CHANGED, zoomMode)
}
