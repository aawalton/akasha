import { recordInstrumentMs } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-slot-handler-stats/crafting-slot-handler-stats.module.code.ts"
import {
  getMasterWritVouchers,
  isWritCompleted,
  isWritDoable,
  isWritMotifUnknown,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-analysis/writ-mark-analysis.module.code.ts"
import {
  asGlobalTable,
  asMaybeControl,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-casts/writ-mark-casts.module.code.ts"
import {
  ADDON_NAME,
  MARKERS,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-constants/writ-mark-constants.module.code.ts"
import {
  areInventoryTweaksEnabled,
  getMarkerColor,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-saved-variables/writ-mark-saved-variables.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/writ-mark-decl-tracker/writ-mark-decl-tracker.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-codes-common-code/temper-codes-common-code.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-inventory-trade/eso-inventory-trade.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-mail/eso-mail.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-inventory/eso-inventory.type-declaration.d.ts"

type LinkResolver = (this: void, ctx: InventoryRowSlotData) => string | undefined

type FlagContext = InventoryRowSlotData | "mail" | undefined

interface ListHookEntry {
  name: string
  link?: LinkResolver
}

function resolveItemLink(
  this: void,
  link: string | LinkResolver | undefined,
  context: FlagContext
): string | undefined {
  if (typeof link === "string") {
    return link
  }
  if (context === undefined || context === "mail") {
    return undefined
  }
  if (link !== undefined) {
    return link(context)
  }
  if (context.bagId !== undefined && context.slotIndex !== undefined) {
    return GetItemLink(context.bagId, context.slotIndex)
  }
  return undefined
}

function flagListItem(
  this: void,
  link: string | LinkResolver | undefined,
  control: Control | undefined,
  context?: FlagContext
): undefined {
  let target = control
  if (context !== "mail") {
    target = control?.GetNamedChild("Button")
  }
  if (target === undefined) {
    return undefined
  }

  const itemLink = resolveItemLink(link, context)
  if (itemLink === undefined) {
    return undefined
  }

  const slotData = context !== undefined && context !== "mail" ? context : undefined

  if (areInventoryTweaksEnabled()) {
    const vouchers = getMasterWritVouchers(slotData)
    if (vouchers !== undefined) {
      const row = target.GetParent()
      const valueControl = row?.GetNamedChild("SellPriceText") ?? row?.GetNamedChild("SellPrice")
      if (valueControl !== undefined && (valueControl as LabelControl).SetFont !== undefined) {
        ZO_CurrencyControl_SetSimpleCurrency(
          valueControl,
          CURT_WRIT_VOUCHERS,
          vouchers,
          ITEM_SLOT_CURRENCY_OPTIONS
        )
      }
    }
  }

  let state: "doable" | "completed" | "unknown" | undefined
  if (isWritCompleted(slotData)) {
    state = "completed"
  } else if (isWritDoable(itemLink)) {
    state = "doable"
  } else if (isWritMotifUnknown(itemLink)) {
    state = "unknown"
  }

  let indicator = target.GetNamedChild<TextureControl>(`_${ADDON_NAME}Mark`)
  if (indicator === undefined) {
    if (state === undefined) {
      return undefined
    }
    indicator = WINDOW_MANAGER.CreateControl(
      `${target.GetName()}_${ADDON_NAME}Mark`,
      target,
      CT_TEXTURE
    )
    indicator.SetDimensions(22, 22)
    indicator.SetInheritScale(false)
    indicator.SetAnchor(TOPRIGHT)
    indicator.SetDrawTier(DT_HIGH)
  }

  if (state !== undefined) {
    indicator.SetTexture(MARKERS[state])
    const [cr, cg, cb, ca] = TemperCodesCommonCode.Int24ToRGBA(getMarkerColor(state))
    indicator.SetColor(cr, cg, cb, ca)
    indicator.SetHidden(false)
  } else {
    indicator.SetHidden(true)
  }
  return undefined
}

export function hookLists(this: void): undefined {
  const processListHooks = (lists: ListHookEntry[]): undefined => {
    for (const [, list] of ipairs(lists)) {
      const scrollList = asMaybeControl(asGlobalTable(_G)[list.name])
      if (scrollList !== undefined && ZO_ScrollList_GetDataTypeTable(scrollList, 1) !== undefined) {
        const dataType = ZO_ScrollList_GetDataTypeTable(scrollList, 1)
        if (dataType !== undefined) {
          SecurePostHook(
            dataType,
            "setupCallback",
            (rowControl: Control, data: InventoryRowSlotData) => {
              const flagStart = GetGameTimeMilliseconds()
              flagListItem(list.link, rowControl, data)
              recordInstrumentMs("writMark", GetGameTimeMilliseconds() - flagStart)
            }
          )
        }
      }
    }
    return undefined
  }

  processListHooks([
    { name: "ZO_PlayerInventoryList" },
    { name: "ZO_PlayerBankBackpack" },
    { name: "ZO_GuildBankBackpack" },
    { name: "ZO_HouseBankBackpack" },
    {
      name: "ZO_LootAlphaContainerList",
      link: (ctx) =>
        ctx.lootId !== undefined ? GetLootItemLink(ctx.lootId, LINK_STYLE_DEFAULT) : undefined,
    },
  ])

  let storeHooked = false
  SecurePostHook(TRADING_HOUSE, "OpenTradingHouse", () => {
    if (!storeHooked) {
      storeHooked = true
      processListHooks([
        {
          name: "ZO_TradingHouseBrowseItemsRightPaneSearchResults",
          link: (ctx) =>
            ctx.slotIndex !== undefined
              ? GetTradingHouseSearchResultItemLink(ctx.slotIndex, LINK_STYLE_DEFAULT)
              : undefined,
        },
      ])
    }
  })

  SecurePostHook(TRADE, "InitializeSlot", (self: TradeWindow, who: number, index: number) => {
    flagListItem(
      GetTradeItemLink(who, index, LINK_STYLE_DEFAULT),
      self.Columns[who]?.[index]?.Control
    )
  })
  SecurePostHook(TRADE, "ResetSlot", (self: TradeWindow, who: number, index: number) => {
    flagListItem("", self.Columns[who]?.[index]?.Control)
  })

  if (MAIL_INBOX !== undefined) {
    SecurePostHook(MAIL_INBOX, "RefreshAttachmentSlots", (self: MailInbox) => {
      if (
        self.mailId === undefined ||
        self.isMailFromGuild === undefined ||
        self.attachmentSlots === undefined
      ) {
        return
      }
      const numAttachments = self.GetMailData(self.mailId, self.isMailFromGuild).numAttachments
      for (const i of $range(1, numAttachments)) {
        flagListItem(
          GetAttachedItemLink(self.mailId, i, LINK_STYLE_DEFAULT),
          self.attachmentSlots[i],
          "mail"
        )
      }
    })
  }
  return undefined
}
