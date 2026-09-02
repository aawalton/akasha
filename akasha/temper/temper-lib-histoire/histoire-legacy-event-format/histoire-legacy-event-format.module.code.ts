import { convertEventIdToLegacyId64 } from "../histoire-legacy-event-id/histoire-legacy-event-id.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

interface LegacyEventInfo {
  displayName: string
  actingDisplayName: string
  targetDisplayName: string
  sellerDisplayName: string
  buyerDisplayName: string
  kioskName: string
  rankName: string
  keepId: number
  campaignId: number
  amount: number
  quantity: number
  price: number
  tax: number
  currencyType: unknown
  itemLink: unknown
}

function asLegacyEventInfo(value: unknown): LegacyEventInfo {
  return value as LegacyEventInfo
}

function convertEvent(
  this: void,
  event: GuildHistoryEventObject
): LuaMultiReturn<unknown[]> | undefined {
  const oldEventId = convertEventIdToLegacyId64(event.GetEventId())
  const eventTime = event.GetEventTimestampS()
  const category = event.GetEventCategory()
  const type = event.GetEventType()
  const info = asLegacyEventInfo(event.GetEventInfo())

  if (category === GUILD_HISTORY_EVENT_CATEGORY_ACTIVITY) {
    if (type === GUILD_HISTORY_ACTIVITY_EVENT_ABOUT_US_EDITED) {
      return $multi(
        GUILD_EVENT_ABOUT_US_EDITED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName)
      )
    } else if (type === GUILD_HISTORY_ACTIVITY_EVENT_MOTD_EDITED) {
      return $multi(
        GUILD_EVENT_MOTD_EDITED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName)
      )
    } else if (type === GUILD_HISTORY_ACTIVITY_EVENT_RECRUITMENT_LISTED) {
      return $multi(
        GUILD_EVENT_GUILD_RECRUITMENT_GUILD_LISTED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName)
      )
    } else if (type === GUILD_HISTORY_ACTIVITY_EVENT_RECRUITMENT_UNLISTED) {
      return $multi(
        GUILD_EVENT_GUILD_RECRUITMENT_GUILD_UNLISTED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName)
      )
    } else {
      logger.Warn("Unsupported activity event type", type)
    }
  } else if (category === GUILD_HISTORY_EVENT_CATEGORY_AVA_ACTIVITY) {
    if (type === GUILD_HISTORY_AVA_ACTIVITY_EVENT_KEEP_CLAIMED) {
      return $multi(
        GUILD_EVENT_KEEP_CLAIMED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        GetKeepName(info.keepId),
        GetCampaignName(info.campaignId)
      )
    } else if (type === GUILD_HISTORY_AVA_ACTIVITY_EVENT_KEEP_LOST) {
      return $multi(
        GUILD_EVENT_KEEP_LOST,
        oldEventId,
        eventTime,
        GetKeepName(info.keepId),
        GetCampaignName(info.campaignId)
      )
    } else if (type === GUILD_HISTORY_AVA_ACTIVITY_EVENT_KEEP_RELEASED) {
      return $multi(
        GUILD_EVENT_KEEP_RELEASED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        GetKeepName(info.keepId),
        GetCampaignName(info.campaignId)
      )
    } else {
      logger.Warn("Unsupported AvA activity event type", type)
    }
  } else if (category === GUILD_HISTORY_EVENT_CATEGORY_BANKED_CURRENCY) {
    if (info.currencyType !== CURT_MONEY) {
      logger.Warn("Unsupported currency type", info.currencyType)
      return undefined
    }
    if (type === GUILD_HISTORY_BANKED_CURRENCY_EVENT_DEPOSITED) {
      return $multi(
        GUILD_EVENT_BANKGOLD_ADDED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        info.amount
      )
    } else if (type === GUILD_HISTORY_BANKED_CURRENCY_EVENT_HERALDRY_EDITED) {
      return $multi(
        GUILD_EVENT_HERALDRY_EDITED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        info.amount
      )
    } else if (type === GUILD_HISTORY_BANKED_CURRENCY_EVENT_KIOSK_BID) {
      return $multi(
        GUILD_EVENT_BANKGOLD_KIOSK_BID,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        info.amount,
        info.kioskName
      )
    } else if (type === GUILD_HISTORY_BANKED_CURRENCY_EVENT_KIOSK_BID_REFUND) {
      return $multi(
        GUILD_EVENT_BANKGOLD_KIOSK_BID_REFUND,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.kioskName),
        info.amount
      )
    } else if (type === GUILD_HISTORY_BANKED_CURRENCY_EVENT_KIOSK_PURCHASED) {
      return $multi(
        GUILD_EVENT_GUILD_KIOSK_PURCHASED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        info.amount,
        info.kioskName
      )
    } else if (type === GUILD_HISTORY_BANKED_CURRENCY_EVENT_WITHDRAWN) {
      return $multi(
        GUILD_EVENT_BANKGOLD_REMOVED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        info.amount
      )
    } else {
      logger.Warn("Unsupported bank currency event type", type)
    }
  } else if (category === GUILD_HISTORY_EVENT_CATEGORY_BANKED_ITEM) {
    if (type === GUILD_HISTORY_BANKED_ITEM_EVENT_ADDED) {
      return $multi(
        GUILD_EVENT_BANKITEM_ADDED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        info.quantity,
        info.itemLink
      )
    } else if (type === GUILD_HISTORY_BANKED_ITEM_EVENT_REMOVED) {
      return $multi(
        GUILD_EVENT_BANKITEM_REMOVED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.displayName),
        info.quantity,
        info.itemLink
      )
    } else {
      logger.Warn("Unsupported bank item event type", type)
    }
  } else if (category === GUILD_HISTORY_EVENT_CATEGORY_MILESTONE) {
    if (type === GUILD_HISTORY_MILESTONE_EVENT_BANK_LOCKED) {
      return $multi(GUILD_EVENT_GUILD_BANK_LOCKED, oldEventId, eventTime)
    } else if (type === GUILD_HISTORY_MILESTONE_EVENT_BANK_UNLOCKED) {
      return $multi(GUILD_EVENT_GUILD_BANK_UNLOCKED, oldEventId, eventTime)
    } else if (type === GUILD_HISTORY_MILESTONE_EVENT_KIOSK_LOCKED) {
      return $multi(GUILD_EVENT_GUILD_KIOSK_LOCKED, oldEventId, eventTime)
    } else if (type === GUILD_HISTORY_MILESTONE_EVENT_KIOSK_UNLOCKED) {
      return $multi(GUILD_EVENT_GUILD_KIOSK_UNLOCKED, oldEventId, eventTime)
    } else if (type === GUILD_HISTORY_MILESTONE_EVENT_STORE_LOCKED) {
      return $multi(GUILD_EVENT_GUILD_STORE_LOCKED, oldEventId, eventTime)
    } else if (type === GUILD_HISTORY_MILESTONE_EVENT_STORE_UNLOCKED) {
      return $multi(GUILD_EVENT_GUILD_STORE_UNLOCKED, oldEventId, eventTime)
    } else if (type === GUILD_HISTORY_MILESTONE_EVENT_TABARD_LOCKED) {
      return $multi(GUILD_EVENT_GUILD_TABARD_LOCKED, oldEventId, eventTime)
    } else if (type === GUILD_HISTORY_MILESTONE_EVENT_TABARD_UNLOCKED) {
      return $multi(GUILD_EVENT_GUILD_TABARD_UNLOCKED, oldEventId, eventTime)
    } else {
      logger.Warn("Unsupported milestone event type", type)
    }
  } else if (category === GUILD_HISTORY_EVENT_CATEGORY_ROSTER) {
    if (type === GUILD_HISTORY_ROSTER_EVENT_ADDED_TO_BLACKLIST) {
      return $multi(
        GUILD_EVENT_ADDED_TO_BLACKLIST,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName)
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_APPLICATION_ACCEPTED) {
      return $multi(
        GUILD_EVENT_GUILD_APPLICATION_ACCEPTED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName)
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_APPLICATION_DECLINED) {
      return $multi(
        GUILD_EVENT_GUILD_APPLICATION_DECLINED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName)
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_DEMOTE) {
      return $multi(
        GUILD_EVENT_GUILD_DEMOTE,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName),
        info.rankName
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_EDIT_BLACKLIST_NOTE) {
      return $multi(
        GUILD_EVENT_EDIT_BLACKLIST_NOTE,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName)
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_INVITE) {
      return $multi(
        GUILD_EVENT_GUILD_INVITE,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName)
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_JOIN) {
      return $multi(
        GUILD_EVENT_GUILD_JOIN,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName)
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_KICKED) {
      return $multi(
        GUILD_EVENT_GUILD_KICKED,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName)
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_LEAVE) {
      return $multi(
        GUILD_EVENT_GUILD_LEAVE,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName)
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_PROMOTE) {
      return $multi(
        GUILD_EVENT_GUILD_PROMOTE,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName),
        info.rankName
      )
    } else if (type === GUILD_HISTORY_ROSTER_EVENT_REMOVED_FROM_BLACKLIST) {
      return $multi(
        GUILD_EVENT_REMOVED_FROM_BLACKLIST,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.actingDisplayName),
        DecorateDisplayName(info.targetDisplayName)
      )
    } else {
      logger.Warn("Unsupported roster event type", type)
    }
  } else if (category === GUILD_HISTORY_EVENT_CATEGORY_TRADER) {
    if (type === GUILD_HISTORY_TRADER_EVENT_ITEM_SOLD) {
      return $multi(
        GUILD_EVENT_ITEM_SOLD,
        oldEventId,
        eventTime,
        DecorateDisplayName(info.sellerDisplayName),
        DecorateDisplayName(info.buyerDisplayName),
        info.quantity,
        info.itemLink,
        info.price,
        info.tax
      )
    } else {
      logger.Warn("Unsupported trader event type", type)
    }
  } else {
    logger.Warn("Unsupported category", category)
  }
  return undefined
}

type ConvertEventToLegacyFormatFn = (
  this: void,
  event: unknown
) => LuaMultiReturn<unknown[]> | undefined
function asConvertEventToLegacyFormatFn(value: unknown): ConvertEventToLegacyFormatFn {
  return value as ConvertEventToLegacyFormatFn
}
internal.ConvertEventToLegacyFormat = asConvertEventToLegacyFormatFn(convertEvent)
