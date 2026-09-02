export const ADDON_NAME = "TemperLoreBooks"
export const ADDON_VERSION = "106"
export const ADDON_WEBSITE = "http://www.esoui.com/downloads/info288-LoreBooks.html"
export const ADDON_PANEL = "TemperLoreBooksPanel"
export const SAVED_VARIABLES_NAME = "TemperLoreBooks_SavedVariables"
export const SAVEDVARIABLES_VERSION = 3

export const PINS_UNKNOWN = "LBooksMapPin_unknown"
export const PINS_COLLECTED = "LBooksMapPin_collected"
export const PINS_EIDETIC = "LBooksMapPin_eidetic"
export const PINS_EIDETIC_COLLECTED = "LBooksMapPin_eideticCollected"
export const PINS_COMPASS = "LBooksCompassPin_unknown"
export const PINS_COMPASS_EIDETIC = "LBooksCompassPin_eidetic"
export const PINS_BOOKSHELF = "LBooksMapPin_bookshelf"
export const PINS_COMPASS_BOOKSHELF = "LBooksCompassPin_bookshelf"

export const CALLBACK_MOTIF_CHECKBOX_CHANGED = "LoreBooksMotifCheckboxChanged"

export const PIN_ICON_REAL = 1
export const PIN_ICON_SET1 = 2
export const PIN_ICON_SET2 = 3
export const PIN_ICON_ESOHEAD = 4

export const PIN_TEXTURES: Record<number, readonly [string, string]> = {
  [PIN_ICON_REAL]: [
    "EsoUI/Art/Icons/lore_book4_detail4_color5.dds",
    "EsoUI/Art/Icons/lore_book4_detail4_color5.dds",
  ],
  [PIN_ICON_SET1]: [
    "TemperCollections/Icons/book1.dds",
    "TemperCollections/Icons/book1-invert.dds",
  ],
  [PIN_ICON_SET2]: [
    "TemperCollections/Icons/book2.dds",
    "TemperCollections/Icons/book2-invert.dds",
  ],
  [PIN_ICON_ESOHEAD]: [
    "TemperCollections/Icons/book3.dds",
    "TemperCollections/Icons/book3-invert.dds",
  ],
}

export const MISSING_TITLE = "Untitled (Missing Translation)"
export const MISSING_TEXTURE = "/esoui/art/icons/icon_missing.dds"
export const PLACEHOLDER_TEXTURE = "/esoui/art/icons/lore_book4_detail1_color2.dds"

export const LORE_LIBRARY_SHALIDOR = 1
export const LORE_LIBRARY_CRAFTING = 2
export const LORE_LIBRARY_EIDETIC = 3

export const IMMERSIVE_DISABLED = 1
export const IMMERSIVE_MAINQUEST = 2
export const IMMERSIVE_WAYSHRINES = 3
export const IMMERSIVE_EXPLORATION = 4
export const IMMERSIVE_ZONEQUESTS = 5

export const LBOOKS_IMMERSIVE_DISABLED = 1
export const LBOOKS_IMMERSIVE_ZONEMAINQUEST = 2
export const LBOOKS_IMMERSIVE_WAYSHRINES = 3
export const LBOOKS_IMMERSIVE_EXPLORATION = 4
export const LBOOKS_IMMERSIVE_ZONEQUESTS = 5

export const SHALIDOR_LOCATION_X = 1
export const SHALIDOR_LOCATION_Y = 2
export const SHALIDOR_COLLECTIONINDEX = 3
export const SHALIDOR_BOOKINDEX = 4
export const SHALIDOR_ZONEID = 5
export const SHALIDOR_MOREINFO_BREADCRUMB = 9999

export const ICON_LIST_ZONEID: Record<number, string> = {
  [281]: "/esoui/art/icons/housing_arg_fur_mrkshelftall001.dds",
  [280]: "/esoui/art/icons/housing_dun_fur_bookcaset001.dds",
  [57]: "/esoui/art/icons/housing_vrd_fur_hlabookcase001.dds",
  [101]: "/esoui/art/icons/housing_nor_fur_bookcaselrg001.dds",
  [117]: "/esoui/art/icons/housing_arg_fur_mrkshelftall001.dds",
  [41]: "/esoui/art/icons/housing_vrd_fur_hlachinacabinetdoor001.dds",
  [103]: "/esoui/art/icons/housing_nor_duc_shelflarge002.dds",
  [104]: " /esoui/art/icons/housing_red_fur_varbookcasecombined004.dds",
  [92]: "/esoui/art/icons/housing_bre_fur_bookcasetall001.dds",
  [535]: "/esoui/art/icons/housing_orc_fur_wtgbookcase001.dds",
  [3]: "/esoui/art/icons/housing_cra_fur_bookshelvescombo005.dds",
  [20]: "/esoui/art/icons/housing_bre_fur_bookcasetall001.dds",
  [19]: "/esoui/art/icons/housing_bre_fur_bookcasetall001.dds",
  [534]: "/esoui/art/icons/housing_red_fur_varbookcasecombined004.dds",
  [381]: "/esoui/art/icons/housing_ayl_duc_bookcaselarge002.dds",
  [383]: "/esoui/art/icons/housing_bos_fur_shelf002.dds",
  [108]: "/esoui/art/icons/housing_bos_fur_shelf002.dds",
  [537]: "/esoui/art/icons/housing_kha_fur_bookcase001.dds",
  [58]: "/esoui/art/icons/housing_bos_fur_shelf002.dds",
  [382]: "/esoui/art/icons/housing_kha_fur_bookcase001.dds",
  [1027]: "/esoui/art/icons/housing_sum_fur_highbookcase001.dds",
  [1208]: "/esoui/art/icons/housing_skr_fur_housingvampirebookcasefilled002.dds",
  [1161]: "/esoui/art/icons/housing_skr_fur_housingvampirebookcasefilled001.dds",
  [1261]: "/esoui/art/icons/housing_bad_fur_housingleybookcasetallfilled001.dds",
  [980]: "/esoui/art/icons/housing_cwc_fur_informationwall001.dds",
  [981]: "/esoui/art/icons/housing_cwc_fur_informationwall001.dds",
  [982]: "/esoui/art/icons/housing_cwc_fur_informationwall001.dds",
  [347]: "/esoui/art/icons/housing_cld_duc_bookcaseprop002.dds",
  [888]: "/esoui/art/icons/housing_coh_inc_housingbookcase001.dds",
  [2119]: " /esoui/art/icons/housing_bad_fur_dedhighbookshelf001.dds",
  [1282]: " /esoui/art/icons/housing_bad_fur_dedhighbookshelf001.dds",
  [2082]: " /esoui/art/icons/housing_bad_fur_dedhighbookshelf001.dds",
  [823]: "/esoui/art/icons/housing_kha_fur_bookcase001.dds",
  [816]: "/esoui/art/icons/housing_kha_fur_bookcase001.dds",
  [1318]: "/esoui/art/icons/housing_bre_fur_bookcasetall001.dds",
  [1383]: "/esoui/art/icons/housing_bre_fur_bookcasetall001.dds",
  [1413]: "/esoui/art/icons/housing_vrd_fur_telshelvesorganic001.dds",
  [2274]: "/esoui/art/icons/housing_vrd_fur_telshelvesorganic001.dds",
  [2343]: "/esoui/art/icons/housing_vrd_fur_telshelvesorganic001.dds",
  [726]: "/esoui/art/icons/housing_arg_duc_bookcasecombined001.dds",
  [1086]: "/esoui/art/icons/housing_els_fur_housingmedbookcase001.dds",
  [1133]: "/esoui/art/icons/housing_els_run_housingbookshelves001.dds",
  [1011]: "/esoui/art/icons/housing_sum_fur_highbookcase001.dds",
  [1286]: "/esoui/art/icons/housing_bad_fur_dedhighbookshelf001.dds",
  [1207]: "/esoui/art/icons/housing_nor_duc_shelflarge002.dds",
  [849]: "/esoui/art/icons/housing_vrd_fur_telshelvesorganic001.dds",
  [1443]: "/esoui/art/icons/housing_vrd_fur_telshelvesorganic001.dds",
  [1160]: "/esoui/art/icons/housing_skr_fur_housingbookshelffancyfilled003.dds",
  [684]: "/esoui/art/icons/housing_orc_fur_wtgbookshelf002.dds",
  [181]: "/esoui/art/icons/housing_cra_fur_bookshelvescombo005.dds",
  [584]: "/esoui/art/icons/housing_cra_fur_bookshelvescombo005.dds",
  [267]: "/esoui/art/icons/housing_alt_fur_cabinet004.dds",
}
