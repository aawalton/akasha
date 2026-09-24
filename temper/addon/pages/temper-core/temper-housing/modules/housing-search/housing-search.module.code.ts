import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const wm = WINDOW_MANAGER

interface SearchResultControl extends Control {
  searchResult: string
  SetText: (this: SearchResultControl, text: string) => void
  SetFont: (this: SearchResultControl, font: string) => void
  SetNormalFontColor: (
    this: SearchResultControl,
    r: number,
    g: number,
    b: number,
    a: number
  ) => void
  SetHorizontalAlignment: (this: SearchResultControl, alignment: number) => void
}

interface SearchResultBackdrop extends Control {
  SetCenterColor: (this: SearchResultBackdrop, r: number, g: number, b: number, a?: number) => void
  SetEdgeColor: (
    this: SearchResultBackdrop,
    r: number,
    g: number,
    b: number,
    a?: number,
    edgeSize?: number
  ) => void
}

interface SearchSliderView extends Control {
  GetValue: (this: SearchSliderView) => number
  SetValue: (this: SearchSliderView, value: number) => void
}

interface SearchBoxControlView extends Control {
  backdrop: Control
  scrollControl: Control
  bodyControl: Control
  slider: SearchSliderView
}

interface HouseControls {
  editbox: EditControl
  searchBox: SearchBoxControlView
}

function asSearchResultControl(value: unknown): SearchResultControl {
  return value as SearchResultControl
}
function asSearchResultBackdrop(value: unknown): SearchResultBackdrop {
  return value as SearchResultBackdrop
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}

type StringKeyedNames = Record<string, string>
function asStringKeyedNames(value: unknown): StringKeyedNames {
  return value as StringKeyedNames
}
type SearchResultList = SearchResultControl[]
function asSearchResultList(value: unknown): SearchResultList {
  return value as SearchResultList
}
type SearchResultBackdropList = SearchResultBackdrop[]
function asSearchResultBackdropList(value: unknown): SearchResultBackdropList {
  return value as SearchResultBackdropList
}
function getSearchResults(this: void): SearchResultControl[] {
  return asSearchResultList(houseTravel.controls.searchResults)
}
function getSearchResultsBackdrop(this: void): SearchResultBackdrop[] {
  return asSearchResultBackdropList(houseTravel.controls.searchResultsBackdrop)
}

function clearNameList(this: void): undefined {
  houseTravel.addonState.names = []
}
houseTravel.ClearNameList = clearNameList

function stringStartsWith(this: void, theString: string, startsWith: string): boolean {
  return string.sub(theString, 1, string.len(startsWith)) === startsWith
}
houseTravel.StringStartsWith = stringStartsWith

function searchEntryOnClicked(this: void, id: number): undefined {
  const searchResults = getSearchResults()
  const entry = searchResults[id]
  if (
    id !== undefined &&
    id >= 0 &&
    id < searchResults.length !== undefined &&
    entry !== undefined
  ) {
    houseTravel.addonState.searchResultClicked = true
    const house = asHouseControls(houseTravel.controls.house)
    house.editbox.SetText(entry.searchResult)
  }
}
houseTravel.SearchEntryOnClicked = searchEntryOnClicked

function searchEntryOnMouseEnter(this: void, id: number): undefined {
  const backdrops = getSearchResultsBackdrop()
  const backdrop = backdrops[id]
  if (id !== undefined && id >= 0 && id < backdrops.length && backdrop !== undefined) {
    backdrop.SetCenterColor(
      houseTravel.config.color.backDropLine.R,
      houseTravel.config.color.backDropLine.G,
      houseTravel.config.color.backDropLine.B,
      houseTravel.config.color.backDropLine.A
    )
  }
}
houseTravel.SearchEntryOnMouseEnter = searchEntryOnMouseEnter

function searchEntryOnMouseExit(this: void, id: number): undefined {
  const backdrops = getSearchResultsBackdrop()
  const backdrop = backdrops[id]
  if (id !== undefined && id >= 0 && id < backdrops.length && backdrop !== undefined) {
    backdrop.SetCenterColor(
      houseTravel.config.color.backDropLine.R,
      houseTravel.config.color.backDropLine.G,
      houseTravel.config.color.backDropLine.B,
      0.0
    )
  }
}
houseTravel.SearchEntryOnMouseExit = searchEntryOnMouseExit

function setSearchResults(this: void, names: string[] | undefined): string[] | undefined {
  const house = asHouseControls(houseTravel.controls.house)
  if (names === undefined || names.length === 0) {
    house.searchBox.SetHidden(true)
    return
  }
  if (houseTravel.addonState.searchResultClicked === true) {
    house.searchBox.SetHidden(true)
    houseTravel.addonState.searchResultClicked = false
    return
  }

  house.searchBox.SetHidden(false)
  let height = 10
  for (let i = 1; i <= names.length; i += 1) {
    height = height + houseTravel.config.search.height
  }
  let dimensionWidth = houseTravel.config.search.width - 22
  if (height > houseTravel.config.search.max * houseTravel.config.search.height + 10) {
    height = houseTravel.config.search.max * houseTravel.config.search.height + 10
    house.searchBox.slider.SetHidden(false)
  } else {
    house.searchBox.slider.SetHidden(true)
    dimensionWidth = houseTravel.config.search.width - 4
  }

  const searchResults = getSearchResults()
  const backdrops = getSearchResultsBackdrop()
  const color = houseTravel.config.color
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i] ?? ""
    let backdrop = backdrops[i]
    if (backdrop === undefined) {
      backdrop = asSearchResultBackdrop(
        wm.CreateControl("", house.searchBox.bodyControl, CT_BACKDROP)
      )
      backdrops[i] = backdrop
    }
    backdrop.SetHidden(false)
    backdrop.SetDimensions(dimensionWidth, houseTravel.config.search.height)
    backdrop.ClearAnchors()
    backdrop.SetAnchor(
      TOPLEFT,
      house.searchBox.bodyControl,
      TOPLEFT,
      0,
      houseTravel.config.search.height * i
    )
    backdrop.SetCenterColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
    backdrop.SetEdgeColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0, 0)
    backdrop.SetDrawLayer(3)

    let result = searchResults[i]
    if (result === undefined) {
      result = asSearchResultControl(wm.CreateControl("", house.searchBox.bodyControl, CT_BUTTON))
      searchResults[i] = result
    }
    result.SetHidden(false)
    result.SetMouseEnabled(true)
    result.SetDimensions(dimensionWidth, houseTravel.config.search.height)
    result.ClearAnchors()
    result.SetAnchor(
      TOPLEFT,
      house.searchBox.bodyControl,
      TOPLEFT,
      0,
      houseTravel.config.search.height * i
    )
    result.SetHandler("OnClicked", () => houseTravel.SearchEntryOnClicked(i))
    result.SetHandler("OnMouseEnter", () => houseTravel.SearchEntryOnMouseEnter(i))
    result.SetHandler("OnMouseExit", () => houseTravel.SearchEntryOnMouseExit(i))
    result.SetText(name)
    result.searchResult = name
    result.SetFont(houseTravel.config.fonts.header)
    result.SetNormalFontColor(color.default.R, color.default.G, color.default.B, 1.0)
    result.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    result.SetDrawLayer(3)
  }

  if (searchResults.length > names.length) {
    for (let i = names.length; i < searchResults.length; i += 1) {
      const backdrop = backdrops[i]
      if (backdrop !== undefined) {
        backdrop.SetHidden(true)
        backdrop.SetAnchor(TOPLEFT, house.searchBox.bodyControl, TOPLEFT, 0, 0)
        backdrop.SetDimensions(0, 0)
      }

      const result = searchResults[i]
      if (result !== undefined) {
        result.SetHidden(true)
        result.SetAnchor(TOPLEFT, house.searchBox.bodyControl, TOPLEFT, 0, 0)
        result.SetDimensions(0, 0)
        result.SetText("")
      }
    }
  }

  house.searchBox.SetDimensions(houseTravel.config.search.width, height)
  house.searchBox.scrollControl.SetDimensions(dimensionWidth, height - 8)
  house.searchBox.bodyControl.SetDimensions(dimensionWidth, height - 8)
  house.searchBox.slider.SetDimensions(25, height)
  house.searchBox.slider.SetValue(0)
  house.searchBox.backdrop.SetDimensions(dimensionWidth, height)
}
houseTravel.SetSearchResults = setSearchResults

function searchTextChanged(this: void): undefined {
  const house = asHouseControls(houseTravel.controls.house)
  const searchTerm = house.editbox.GetText()
  let names: string[] | undefined
  if (searchTerm !== undefined && string.len(searchTerm) >= houseTravel.config.search.minChars) {
    names = houseTravel.SearchNames(searchTerm)
  }
  houseTravel.addonState.searchResult = names
  houseTravel.SetSearchResults(names)
}
houseTravel.SearchTextChanged = searchTextChanged

type SparseNames = (string | undefined)[]
function asSparseNames(value: unknown): SparseNames {
  return value as SparseNames
}
type DenseNames = string[]
function asDenseNames(value: (string | undefined)[]): DenseNames {
  return value as DenseNames
}

function sortPairs(this: void, names: Record<number, string> | undefined): string[] | undefined {
  if (names !== undefined) {
    const indexes: string[] = []
    const values: (string | undefined)[] = []
    let index = 0
    const namesByKey = asStringKeyedNames(names)
    for (const key in namesByKey) {
      const value = namesByKey[key]
      indexes[index] = key
      values[index] = value
      index = index + 1
    }

    let itemCount = indexes.length
    let hasChanged: boolean
    do {
      hasChanged = false
      itemCount = itemCount - 1
      for (let i = 0; i < itemCount; i += 1) {
        const a = values[i]
        const b = values[i + 1]
        if ((a !== undefined && b !== undefined && a > b) || a === undefined) {
          values[i] = b
          values[i + 1] = a
          hasChanged = true
        }
      }
    } while (hasChanged !== false)
    return asDenseNames(values)
  }
  return names
}
houseTravel.SortPairs = sortPairs

function sortSearchNames(this: void, names: string[] | undefined): string[] | undefined {
  if (names !== undefined) {
    const work = asSparseNames(names)
    let itemCount = work.length
    let hasChanged: boolean
    do {
      hasChanged = false
      itemCount = itemCount - 1
      for (let i = 0; i < itemCount; i += 1) {
        const a = work[i]
        const b = work[i + 1]
        if ((a !== undefined && b !== undefined && a > b) || a === undefined) {
          work[i] = b
          work[i + 1] = a
          hasChanged = true
        }
      }
    } while (hasChanged !== false)
    return asDenseNames(work)
  }
  return undefined
}
houseTravel.SortSearchNames = sortSearchNames

function searchNames(this: void, name: string): string[] | undefined {
  const retNames: string[] = []
  const names = houseTravel.addonState.names
  if (names !== undefined && name !== undefined) {
    for (let i = 0; i < names.length; i += 1) {
      const candidate = names[i]
      if (
        candidate !== undefined &&
        houseTravel.StringStartsWith(string.lower(candidate), string.lower(name))
      ) {
        retNames.push(candidate)
      }
    }
  }
  return houseTravel.SortSearchNames(retNames)
}
houseTravel.SearchNames = searchNames

function addNameToNameList(this: void, name: string): undefined {
  if (houseTravel.addonState.names !== undefined && name !== undefined) {
    let entryIdentified = false
    for (let i = 0; i < houseTravel.addonState.names.length; i += 1) {
      if (houseTravel.addonState.names[i] === name) {
        entryIdentified = true
        break
      }
    }
    if (entryIdentified === false) {
      houseTravel.addonState.names.push(name)
    }
  }
}
houseTravel.AddNameToNameList = addNameToNameList

type UndefinedName = string
function asUndefinedName(value: unknown): UndefinedName {
  return value as UndefinedName
}

function createGuildAndFriendList(this: void): undefined {
  houseTravel.ClearNameList()
  for (let guildIndex = 1; guildIndex <= GetNumGuilds(); guildIndex += 1) {
    const guildId = GetGuildId(guildIndex)
    for (let memberId = 1; memberId <= GetNumGuildMembers(guildId); memberId += 1) {
      const [, charNameRaw] = GetGuildMemberCharacterInfo(guildId, memberId)
      const [name] = GetGuildMemberInfo(guildId, memberId)
      let charName = charNameRaw
      const [charIndex] = string.find(charName, "^", undefined, true)
      if (charIndex !== undefined) {
        charName = string.sub(charName, 1, charIndex - 1)
      }
      houseTravel.AddNameToNameList(charName)
      houseTravel.AddNameToNameList(name)
    }
  }
  for (let friendIndex = 1; friendIndex <= GetNumFriends(); friendIndex += 1) {
    const [, characterNameRaw] = GetFriendCharacterInfo(friendIndex)
    let characterName = characterNameRaw
    const [charIndex] = string.find(characterName, "^", undefined, true)
    if (charIndex !== undefined) {
      characterName = string.sub(characterName, 1, charIndex - 1)
    }
    houseTravel.AddNameToNameList(characterName)
    houseTravel.AddNameToNameList(asUndefinedName(undefined))
  }
}
houseTravel.CreateGuildAndFriendList = createGuildAndFriendList
