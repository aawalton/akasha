import {
  DATA_TYPE,
  PLEDGE_FILTER_ID,
  SORT_TYPE,
} from "../item-browser-constants/item-browser-constants.module.code.ts"
import { getData } from "../item-browser-data/item-browser-data.module.code.ts"
import {
  createEntryFromRaw,
  getSetBonuses,
} from "../item-browser-item-link/item-browser-item-link.module.code.ts"
import {
  checkForPledge,
  countUnlockedSlots,
  getCurrencyCost,
  getLmas,
  getMaxFilterId,
  getSelectedAccount,
  getSelectedServer,
  setSelectedAccount,
  setSelectedServer,
} from "../item-browser-multi-account/item-browser-multi-account.module.code.ts"
import {
  getInitialized,
  setAlwaysRefreshOnShow,
} from "../item-browser-refresh-state/item-browser-refresh-state.module.code.ts"
import {
  formatTransmuteCost,
  getVars,
} from "../item-browser-state/item-browser-state.module.code.ts"
import type {
  ContextMenuFactory,
  EntryData,
  ItemBrowserListInstance,
} from "../item-browser-types/item-browser-types.module.code.ts"

interface ItemBrowserListClass extends ItemBrowserListInstance {}

interface ItemBrowserCell extends LabelControl {
  normalColor?: ZoColorDef
  nonRecolorable?: boolean
}

function requireChild<T extends Control = Control>(this: void, parent: Control, name: string): T {
  const child = parent.GetNamedChild<T>(name)
  if (child === undefined) {
    throw new Error(string.format("TemperItemBrowser missing child control: %s", name))
  }
  return child
}

function requireCell(this: void, parent: Control, name: string): ItemBrowserCell {
  const child = parent.GetNamedChild<ItemBrowserCell>(name)
  if (child === undefined) {
    throw new Error(string.format("TemperItemBrowser missing row cell: %s", name))
  }
  return child
}

function getScrollData(this: void, list: Control): ZoScrollListDataEntry<EntryData>[] {
  const scrollData = ZO_ScrollList_GetDataList<EntryData>(list)
  if (scrollData === undefined) {
    throw new Error("TemperItemBrowser scroll data list missing")
  }
  return scrollData
}

const ItemBrowserList = ExtendedJournalSortFilterList.Subclass<ItemBrowserListClass>()

ItemBrowserList.Setup = function (this: ItemBrowserListInstance): undefined {
  ZO_ScrollList_AddDataType<EntryData>(
    this.list,
    DATA_TYPE,
    "ItemBrowserListRow",
    30,
    (control, data) => {
      this.SetupItemRow(control, data)
    }
  )
  ZO_ScrollList_EnableHighlight(this.list, "ZO_ThinListHighlight")
  this.SetAlternateRowBackgrounds(true)

  this.masterList = []

  const sortKeys: Record<string, ZoSortKeyConfig> = {
    name: { caseInsensitive: true },
    itemType: { caseInsensitive: true, tiebreaker: "name", tieBreakerSortOrder: ZO_SORT_ORDER_UP },
    source: {
      caseInsensitive: true,
      tiebreaker: "itemType",
      tieBreakerSortOrder: ZO_SORT_ORDER_UP,
    },
    progress: { isNumeric: true, tiebreaker: "setSize" },
    setSize: { isNumeric: true, tiebreaker: "name", tieBreakerSortOrder: ZO_SORT_ORDER_UP },
  }

  this.currentSortKey = "name"
  this.currentSortOrder = ZO_SORT_ORDER_UP
  this.sortHeaderGroup.SelectAndResetSortForKey(this.currentSortKey)
  this.sortFunction = (listEntry1, listEntry2) =>
    ZO_TableOrderingFunction(
      listEntry1.data,
      listEntry2.data,
      this.currentSortKey,
      sortKeys,
      this.currentSortOrder
    )

  this.filterDrop = ZO_ComboBox_ObjectFromContainer(requireChild(this.frame, "FilterDrop"))
  this.InitializeComboBox(
    this.filterDrop,
    { prefix: "SI_ITEMBROWSER_FILTERDROP", max: getMaxFilterId() },
    getVars().filterId
  )

  this.searchDrop = ZO_ComboBox_ObjectFromContainer(requireChild(this.frame, "SearchDrop"))
  this.InitializeComboBox(this.searchDrop, { prefix: "SI_ITEMBROWSER_SEARCHDROP", max: 2 })

  this.searchBox = requireChild<EditControl>(this.frame, "SearchBox")
  this.searchBox.SetHandler("OnTextChanged", () => {
    this.RefreshFilters()
  })
  this.search = this.InitializeSearch(SORT_TYPE)

  const lmas = getLmas()
  if (lmas !== undefined) {
    const servers = lmas.GetServerAndAccountList(true)

    if (servers.length > 1 || (servers[0] !== undefined && servers[0].accounts.length > 1)) {
      const accountControl = requireChild(this.frame, "AccountDrop")
      requireChild<LabelControl>(accountControl, "Caption").SetText(GetString(SI_LEJ_ACCOUNT))
      accountControl.SetHidden(false)
      this.accountDrop = ZO_ComboBox_ObjectFromContainer(accountControl)

      if (servers.length > 1) {
        const serverControl = requireChild(this.frame, "ServerDrop")
        requireChild<LabelControl>(serverControl, "Caption").SetText(GetString(SI_LEJ_SERVER))
        serverControl.SetHidden(false)
        this.serverDrop = ZO_ComboBox_ObjectFromContainer(serverControl)
        this.InitializeComboBox(
          this.serverDrop,
          { list: servers, key: "server" },
          undefined,
          true,
          (_comboBox, entryText) => {
            setSelectedServer(entryText)
            this.RefreshAccountList()
          }
        )
      } else {
        this.RefreshAccountList()
      }
    }
  }

  this.RefreshData()
  return undefined
}

ItemBrowserList.BuildMasterList = function (this: ItemBrowserListInstance): undefined {
  this.masterList = []
  for (const item of getData().items) {
    const entry = createEntryFromRaw(item)
    if (entry !== undefined) {
      this.masterList.push(entry)
    }
  }
  return undefined
}

ItemBrowserList.FilterScrollList = function (this: ItemBrowserListInstance): undefined {
  const scrollData = getScrollData(this.list)
  ZO_ClearNumericallyIndexedTable(scrollData)

  const searchSelected = this.searchDrop.GetSelectedItemData()
  this.searchType = searchSelected?.id ?? 0
  const filterSelected = this.filterDrop.GetSelectedItemData()
  const filterId = filterSelected?.id ?? 0
  const vars = getVars()
  vars.filterId = filterId

  const searchInput = this.searchBox.GetText()
  const data = getData()

  let zoneId = 0
  if (filterId === 12) {
    zoneId = LibCodesCommonCode.GetZoneId()
    if (data.zoneClassification[zoneId] === undefined) {
      zoneId = GetParentZoneId(zoneId)
      if (data.zoneClassification[zoneId] === undefined) {
        zoneId = 0
      }
    }
  }

  setAlwaysRefreshOnShow(filterId === PLEDGE_FILTER_ID)

  let totalCollectibles = 0
  let foundCollectibles = 0

  for (const entry of this.masterList) {
    const matchesCategory =
      filterId === 1 ||
      (filterId === 2 && entry.setSize > 0) ||
      (filterId === 13 && vars.favorites[entry.setId] === true) ||
      (filterId === PLEDGE_FILTER_ID && checkForPledge(entry.zoneIds)) ||
      (entry.zoneType[filterId - 3] === true &&
        !(filterId > 3 && filterId < 10 && entry.zoneType[0] === true)) ||
      (zoneId > 0 && entry.zoneIds[zoneId] === true)

    if (matchesCategory && (searchInput === "" || this.CheckForMatch(entry, searchInput))) {
      scrollData.push(ZO_ScrollList_CreateDataEntry(DATA_TYPE, entry))
      if (entry.setSize > 0) {
        totalCollectibles = totalCollectibles + entry.setSize
        foundCollectibles = foundCollectibles + entry.setFound
      }
    }
  }

  requireChild<LabelControl>(this.frame, "CollectedCount").SetText(
    totalCollectibles > 0
      ? string.format(
          GetString(SI_ITEMBROWSER_COLLECTED_COUNT),
          foundCollectibles,
          totalCollectibles,
          (100 * foundCollectibles) / totalCollectibles
        )
      : ""
  )

  if (scrollData.length !== this.masterList.length) {
    requireChild<LabelControl>(this.frame, "Counter").SetText(
      string.format("%d / %d", scrollData.length, this.masterList.length)
    )
  } else {
    requireChild<LabelControl>(this.frame, "Counter").SetText(
      string.format("%d", this.masterList.length)
    )
  }
  return undefined
}

ItemBrowserList.SetupItemRow = function (
  this: ItemBrowserListInstance,
  control: Control,
  data: EntryData
): undefined {
  const vars = getVars()

  const nameCell = requireCell(control, "Name")
  nameCell.normalColor = ZO_DEFAULT_TEXT
  nameCell.SetText(data.name)

  const typeCell = requireCell(control, "Type")
  typeCell.nonRecolorable = true
  const [typeR, typeG, typeB, typeA] = data.color.UnpackRGBA()
  typeCell.SetColor(typeR, typeG, typeB, typeA)
  typeCell.SetText(data.itemType)

  const sourceCell = requireCell(control, "Source")
  sourceCell.normalColor = ZO_DEFAULT_TEXT
  sourceCell.SetText(data.source)

  const collectedCell = requireCell(control, "Collected")
  const collectedCountCell = requireCell(control, "CollectedCount")
  if (data.setSize > 0) {
    let color: number | undefined
    let ratio: number | undefined

    if (vars.usePercentage) {
      ratio = data.progress
      if (ratio === 0) {
        color = 0xff0000cc
      } else if (ratio === 1) {
        color = 0x00ff00cc
      }
      collectedCell.SetText(string.format("%d%%", 100 * ratio))
    } else {
      const cost = 100 - data.progress
      if (cost > 75) {
        color = 0xff0000cc
      } else if (cost === 25) {
        color = 0x00ff00cc
      } else {
        ratio = (75 - cost) / 50
      }
      collectedCell.SetText(formatTransmuteCost(cost))
    }

    collectedCell.nonRecolorable = true
    if (color !== undefined) {
      const [r, g, b, a] = LibCodesCommonCode.Int32ToRGBA(color)
      collectedCell.SetColor(r, g, b, a)
    } else {
      const [r, g, b, a] = LibCodesCommonCode.HSLToRGB(((ratio ?? 0) * 0.6 + 0.15) / 3, 1, 0.5, 0.8)
      collectedCell.SetColor(r, g, b, a)
    }

    collectedCountCell.nonRecolorable = true
    const [cr, cg, cb, ca] = LibCodesCommonCode.Int32ToRGBA(0xffffff66)
    collectedCountCell.SetColor(cr, cg, cb, ca)
    collectedCountCell.SetText(string.format("%d/%d", data.setFound, data.setSize))
  } else {
    collectedCell.SetText("")
    collectedCountCell.SetText("")
  }

  this.SetupRow(control, data)
  return undefined
}

ItemBrowserList.RefreshCollectionCount = function (this: ItemBrowserListInstance): undefined {
  if (getInitialized() < 2) {
    return
  }

  const vars = getVars()
  for (const data of this.masterList) {
    if (data.setSize > 0) {
      data.setFound = countUnlockedSlots(data.setId)
      if (vars.usePercentage) {
        data.progress = data.setFound / data.setSize
      } else {
        data.progress = 100 - (getCurrencyCost(data.setId, CURT_CHAOTIC_CREATIA) ?? 100)
      }
    }
  }

  this.RefreshFilters()
  return undefined
}

ItemBrowserList.OrderedSearch = function (
  this: ItemBrowserListInstance,
  haystack: string,
  needles: string
): boolean {
  const lowerHaystack = string.lower(haystack)
  const lowerNeedles = string.lower(needles)

  let i = 0
  for (const [needle] of string.gmatch(lowerNeedles, "%S+")) {
    if (needle === undefined) {
      continue
    }
    const found = string.find(lowerHaystack, needle, i + 1, true)[0]
    if (found === undefined) {
      return false
    }
    i = found
  }

  return true
}

ItemBrowserList.SearchSetBonuses = function (
  this: ItemBrowserListInstance,
  bonuses: string[],
  searchInput: string
): boolean {
  let curpos = 1
  let delim = 0
  let exclude = false

  do {
    let found = false

    const foundDelim = string.find(searchInput, "[+,-]", curpos)[0]
    delim = foundDelim ?? 0

    const searchQuery = string.sub(searchInput, curpos, delim - 1)

    if (string.find(searchQuery, "%S+")[0] !== undefined) {
      for (const bonus of bonuses) {
        if (this.OrderedSearch(bonus, searchQuery)) {
          found = true
          break
        }
      }

      if (found === exclude) {
        return false
      }
    }

    curpos = delim + 1
    if (delim !== 0) {
      exclude = string.sub(searchInput, delim, delim) === "-"
    }
  } while (delim !== 0)

  return true
}

ItemBrowserList.CheckForMatch = function (
  this: ItemBrowserListInstance,
  data: EntryData,
  searchInput: string
): boolean {
  let curpos = 1
  let delim = 0

  do {
    const foundDelim = string.find(searchInput, "|", curpos)[0]
    delim = foundDelim ?? 0

    const searchFragment = string.sub(searchInput, curpos, delim - 1)

    if (string.find(searchFragment, "%S+")[0] !== undefined || (curpos === 1 && delim === 0)) {
      if (this.searchType === 1) {
        if (this.search.IsMatch(searchFragment, data)) {
          return true
        }
      } else if (this.searchType === 2) {
        if (typeof data.bonuses === "number") {
          data.bonuses = getSetBonuses(data.itemLink, data.bonuses)
        }
        if (this.SearchSetBonuses(data.bonuses, searchFragment)) {
          return true
        }
      }
    }

    curpos = delim + 1
  } while (delim !== 0)

  return false
}

ItemBrowserList.ProcessItemEntry = function (
  this: ItemBrowserListInstance,
  _stringSearch: object,
  data: EntryData,
  searchTerm: string,
  _cache?: unknown
): boolean {
  if (searchTerm === "+") {
    return data.setSize === data.setFound
  }
  if (searchTerm === "-") {
    return data.setSize > data.setFound
  }

  return (
    zo_plainstrfind(string.lower(data.name), searchTerm) ||
    zo_plainstrfind(string.lower(data.subname), searchTerm) ||
    zo_plainstrfind(string.lower(data.itemType), searchTerm) ||
    zo_plainstrfind(string.lower(data.source), searchTerm)
  )
}

ItemBrowserList.RefreshAccountList = function (this: ItemBrowserListInstance): undefined {
  const lmas = getLmas()
  if (lmas === undefined || this.accountDrop === undefined) {
    return
  }

  let accounts: string[] | undefined
  for (const server of lmas.GetServerAndAccountList(true)) {
    if (getSelectedServer() === server.server || accounts === undefined) {
      accounts = server.accounts
    }
  }
  if (accounts === undefined) {
    return
  }
  const resolvedAccounts = accounts

  let initialIndex: number | undefined
  for (const i of $range(1, resolvedAccounts.length)) {
    if (getSelectedAccount() === resolvedAccounts[i - 1]) {
      initialIndex = i
    }
  }

  this.InitializeComboBox(
    this.accountDrop,
    { list: resolvedAccounts },
    initialIndex,
    true,
    (_comboBox, entryText) => {
      setSelectedAccount(entryText)
      this.RefreshCollectionCount()
    }
  )
  return undefined
}

export function createItemBrowserList(
  this: void,
  frame: Control,
  contextMenuItems: ContextMenuFactory[]
): ItemBrowserListInstance {
  return ExtendedJournalSortFilterList.New<ItemBrowserListInstance>(
    ItemBrowserList,
    frame,
    contextMenuItems
  )
}
