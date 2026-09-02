const SPECIAL4_ITEM_LINK = "|H1:item:145577:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

export function registerUiStrings(this: void): undefined {
  const register = LibCodesCommonCode.RegisterString

  const craftedName = GetString(SI_ITEM_FORMAT_STR_CRAFTED)

  register("SI_ITEMBROWSER_TITLE", "Item Set Browser")

  register("SI_ITEMBROWSER_HEADER_NAME", "Name")
  register("SI_ITEMBROWSER_HEADER_TYPE", "Type")
  register("SI_ITEMBROWSER_HEADER_SOURCE", "Source")

  register("SI_ITEMBROWSER_COLLECTED_COUNT", "%d / %d collected (%d%%)")

  register("SI_ITEMBROWSER_TYPE_CRAFTED", craftedName)
  register("SI_ITEMBROWSER_TYPE_MONSTER", "Monster")

  register("SI_ITEMBROWSER_SOURCE_SPECIAL1", GetString(SI_DUNGEON_FINDER_RANDOM_FILTER_TEXT))
  register("SI_ITEMBROWSER_SOURCE_SPECIAL2", GetString(SI_BATTLEGROUND_HUD_HEADER))
  register("SI_ITEMBROWSER_SOURCE_SPECIAL3", GetString(SI_LEVEL_UP_REWARDS_GAMEPAD_ENTRY_NAME))
  register(
    "SI_ITEMBROWSER_SOURCE_SPECIAL4",
    zo_strformat(SI_LINK_FORMAT_ITEM_NAME, GetItemLinkName(SPECIAL4_ITEM_LINK))
  )
  register("SI_ITEMBROWSER_SOURCE_SPECIAL5", GetString(SI_MAP_INFO_MODE_ANTIQUITIES))

  register("SI_ITEMBROWSER_SEARCHDROP1", "Search by name/type/source")
  register("SI_ITEMBROWSER_SEARCHDROP2", "Search by set bonuses")

  register("SI_ITEMBROWSER_FILTERDROP1", "All Categories")
  register("SI_ITEMBROWSER_FILTERDROP2", GetString("SI_ITEMFILTERTYPE", ITEMFILTERTYPE_COLLECTIBLE))
  register("SI_ITEMBROWSER_FILTERDROP3", craftedName)
  register("SI_ITEMBROWSER_FILTERDROP4", "Overland")
  register(
    "SI_ITEMBROWSER_FILTERDROP5",
    GetString("SI_GUILDACTIVITYATTRIBUTEVALUE", GUILD_ACTIVITY_ATTRIBUTE_VALUE_PVP)
  )
  register(
    "SI_ITEMBROWSER_FILTERDROP6",
    GetString("SI_GUILDACTIVITYATTRIBUTEVALUE", GUILD_ACTIVITY_ATTRIBUTE_VALUE_DUNGEONS)
  )
  register(
    "SI_ITEMBROWSER_FILTERDROP7",
    GetString("SI_GUILDACTIVITYATTRIBUTEVALUE", GUILD_ACTIVITY_ATTRIBUTE_VALUE_TRIALS)
  )
  register("SI_ITEMBROWSER_FILTERDROP8", "Arenas")
  register("SI_ITEMBROWSER_FILTERDROP9", GetString(SI_MAP_INFO_MODE_ANTIQUITIES))
  register("SI_ITEMBROWSER_FILTERDROP10", GetString("SI_BINDTYPE", BIND_TYPE_ON_EQUIP))
  register("SI_ITEMBROWSER_FILTERDROP11", GetString("SI_BINDTYPE", BIND_TYPE_ON_PICKUP))
  register("SI_ITEMBROWSER_FILTERDROP12", GetString(SI_ANTIQUITY_SCRYABLE_CURRENT_ZONE_SUBCATEGORY))
  register("SI_ITEMBROWSER_FILTERDROP13", GetString(SI_COLLECTIONS_FAVORITES_CATEGORY_HEADER))
  register("SI_ITEMBROWSER_FILTERDROP14", "Today's Pledges")

  register("SI_ITEMBROWSER_WEAPONTYPE4", "Greatsword")
  register("SI_ITEMBROWSER_WEAPONTYPE5", "Battle Axe")
  register("SI_ITEMBROWSER_WEAPONTYPE6", "Maul")

  register("SI_ITEMBROWSER_TT_HEADER_ACCTS", "Collected By")

  register("SI_ITEMBROWSER_SECTION_GENERAL", "General")
  register("SI_ITEMBROWSER_SECTION_TTCLR_P", "Tooltip Colors: Set Pieces")
  register("SI_ITEMBROWSER_SECTION_TTCLR_A", "Tooltip Colors: Accounts")
  register("SI_ITEMBROWSER_SECTION_TTEXT", "External Tooltips")

  register("SI_ITEMBROWSER_SETTING_PERCENT", "Show completion percentage instead of cost")
  register("SI_ITEMBROWSER_SETTING_TT", "Add information to external item tooltips")
  register("SI_ITEMBROWSER_SETTING_TT_P", "Show collection status for set pieces")
  register("SI_ITEMBROWSER_SETTING_TT_A", "Show collection status for other accounts")
  register(
    "SI_ITEMBROWSER_SETTING_TT_A_EX",
    "This information will not appear if there is data for only one account. Requires LibMultiAccountSets."
  )

  register("SI_ITEMBROWSER_TT_INVALID_HEAD", "Not Collectible")
  register(
    "SI_ITEMBROWSER_TT_INVALID_MSG1",
    "This item has been discontinued and is not collectible."
  )
  register("SI_ITEMBROWSER_TT_INVALID_MSG2", "This item cannot be added to your set collections.")
  return undefined
}
