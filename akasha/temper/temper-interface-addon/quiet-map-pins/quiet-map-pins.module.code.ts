import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"

const UNOWNED_HOUSE_ICON = "/esoui/art/icons/poi/poi_group_house_unowned.dds"
const OWNED_HOUSE_ICON = "/esoui/art/icons/poi/poi_group_house_owned.dds"
const BLANK_ICON = "/esoui/art/icons/blank.dds"

export function setHouseIcons(this: void): undefined {
  const savedVars = getSavedVariables()

  if (savedVars.ownedHouses === 2) {
    RedirectTexture(OWNED_HOUSE_ICON, BLANK_ICON)
  } else {
    RedirectTexture(OWNED_HOUSE_ICON, OWNED_HOUSE_ICON)
  }

  if (savedVars.unownedHouses === 2) {
    RedirectTexture(UNOWNED_HOUSE_ICON, BLANK_ICON)
  } else {
    RedirectTexture(UNOWNED_HOUSE_ICON, UNOWNED_HOUSE_ICON)
  }
}

type FastTravelNodeInfo = LuaMultiReturn<
  [
    boolean,
    string,
    number,
    number,
    string,
    string | undefined,
    PointOfInterestType,
    boolean,
    boolean,
  ]
>

export function removePinsFromMaps(this: void): undefined {
  const savedVars = getSavedVariables()

  const isCapitalWayshrine: Record<number, boolean> = {
    [138]: true,
    [181]: true,
    [62]: true,
    [56]: true,
    [55]: true,
    [43]: true,
    [33]: true,
    [142]: true,
    [177]: true,
    [121]: true,
    [214]: true,
    [143]: true,
    [102]: true,
    [106]: true,
    [162]: true,
    [172]: true,
    [173]: true,
    [65]: true,
    [67]: true,
    [28]: true,
    [48]: true,
    [87]: true,
    [109]: true,
    [215]: true,
    [221]: true,
    [220]: true,
    [244]: true,
    [255]: true,
    [251]: true,
    [252]: true,
    [284]: true,
    [355]: true,
    [374]: true,
    [382]: true,
    [402]: true,
    [407]: true,
    [421]: true,
    [449]: true,
    [458]: true,
    [513]: true,
    [529]: true,
    [536]: true,
    [558]: true,
  }
  const isArena: Record<number, boolean> = {
    [250]: true,
    [270]: true,
    [378]: true,
    [457]: true,
  }
  const isDungeon: Record<number, boolean> = {
    [POI_TYPE_GROUP_DUNGEON]: true,
  }
  const isTrial: Record<number, boolean> = {
    [POI_TYPE_ACHIEVEMENT]: true,
  }

  const original = GetFastTravelNodeInfo

  function override(this: void, nodeIndex?: number): FastTravelNodeInfo {
    if (nodeIndex === undefined) return original(nodeIndex)
    const [
      known,
      name,
      normalizedX,
      normalizedY,
      icon,
      glowIcon,
      poiType,
      isShownInCurrentMap,
      linkedCollectibleIsLocked,
    ] = original(nodeIndex)

    function hidden(this: void): FastTravelNodeInfo {
      return $multi(
        false,
        name,
        normalizedX,
        normalizedY,
        icon,
        glowIcon,
        poiType,
        isShownInCurrentMap,
        linkedCollectibleIsLocked
      )
    }

    if (GetMapType() === MAPTYPE_WORLD) {
      if (savedVars.hideTamriel) {
        return hidden()
      }

      if (
        savedVars.hideTamrielWayhsrines === 1 &&
        poiType === POI_TYPE_WAYSHRINE &&
        isCapitalWayshrine[nodeIndex] !== true
      ) {
        return hidden()
      } else if (savedVars.hideTamrielWayhsrines === 2 && poiType === POI_TYPE_WAYSHRINE) {
        return hidden()
      }

      if (
        savedVars.hideTamrielDungeons === 1 &&
        (isArena[nodeIndex] === true || isDungeon[poiType] === true)
      ) {
        return hidden()
      } else if (
        savedVars.hideTamrielDungeons === 2 &&
        (isArena[nodeIndex] === true || isDungeon[poiType] === true || isTrial[poiType] === true)
      ) {
        return hidden()
      }

      if (savedVars.ownedHouses === 1 && poiType === POI_TYPE_HOUSE && icon === OWNED_HOUSE_ICON) {
        return hidden()
      }

      if (
        savedVars.unownedHouses === 1 &&
        poiType === POI_TYPE_HOUSE &&
        icon === UNOWNED_HOUSE_ICON
      ) {
        return hidden()
      }
    }

    if (savedVars.ownedHouses === 2 && poiType === POI_TYPE_HOUSE && icon === OWNED_HOUSE_ICON) {
      return hidden()
    }

    if (
      savedVars.unownedHouses === 2 &&
      poiType === POI_TYPE_HOUSE &&
      icon === UNOWNED_HOUSE_ICON
    ) {
      return hidden()
    }

    return $multi(
      known,
      name,
      normalizedX,
      normalizedY,
      icon,
      glowIcon,
      poiType,
      isShownInCurrentMap,
      linkedCollectibleIsLocked
    )
  }

  globalThis.GetFastTravelNodeInfo = override

  setHouseIcons()
}
