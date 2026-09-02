import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"

function findsIn(haystack: string, pattern: string): boolean {
  const [findStart] = string.find(haystack, pattern)
  return findStart !== undefined
}

export function scanFishingBait(): undefined {
  const numLures = GetNumFishingLures()
  for (let lureIndex = 1; lureIndex <= numLures; lureIndex++) {
    const [name, icon, stack] = GetFishingLureInfo(lureIndex)
    const isSimpleBait =
      findsIn(name, "simple") || findsIn(name, "einfacher") || findsIn(name, "appât")
    if (findsIn(icon, "centipede")) {
      DEFAULTS.data.FoulBaitLeft = stack
    } else if (findsIn(icon, "fish_roe")) {
      DEFAULTS.data.FoulSBaitLeft = stack
    } else if (findsIn(icon, "torchbug")) {
      DEFAULTS.data.RiverBaitLeft = stack
    } else if (findsIn(icon, "shad")) {
      DEFAULTS.data.RiverSBaitLeft = stack
    } else if (findsIn(icon, "worms")) {
      DEFAULTS.data.OceanBaitLeft = stack
    } else if (findsIn(icon, "fish_tail") && !isSimpleBait) {
      DEFAULTS.data.OceanSBaitLeft = stack
    } else if (findsIn(icon, "guts")) {
      DEFAULTS.data.LakeBaitLeft = stack
    } else if (findsIn(icon, "river_betty")) {
      DEFAULTS.data.LakeSBaitLeft = stack
    } else if (findsIn(icon, "fish_tail") && isSimpleBait) {
      DEFAULTS.data.GeneralBait = stack
    }
  }
}

export function baitAndWaterForPinType(pinType: number): {
  fishingBait: string | undefined
  waterType: string | undefined
} {
  if (pinType === 40) {
    return {
      fishingBait: getSettingsString("FISHING_FOUL_BAIT"),
      waterType: getSettingsString("FISHING_FOUL"),
    }
  }
  if (pinType === 41) {
    return {
      fishingBait: getSettingsString("FISHING_RIVER_BAIT"),
      waterType: getSettingsString("FISHING_RIVER"),
    }
  }
  if (pinType === 42) {
    return {
      fishingBait: getSettingsString("FISHING_OCEAN_BAIT"),
      waterType: getSettingsString("FISHING_OCEAN"),
    }
  }
  if (pinType === 43) {
    return {
      fishingBait: getSettingsString("FISHING_LAKE_BAIT"),
      waterType: getSettingsString("FISHING_LAKE"),
    }
  }
  if (pinType === 44) {
    return { fishingBait: undefined, waterType: getSettingsString("FISHING_UNKNOWN") }
  }
  return { fishingBait: undefined, waterType: undefined }
}

export function baitLeftForPinType(pinType: number): string | undefined {
  let fishingBaitLeft: string | undefined
  if (pinType === 40) {
    fishingBaitLeft =
      tostring(DEFAULTS.data.FoulBaitLeft) + "/" + tostring(DEFAULTS.data.FoulSBaitLeft)
  } else if (pinType === 41) {
    fishingBaitLeft =
      tostring(DEFAULTS.data.RiverBaitLeft) + "/" + tostring(DEFAULTS.data.RiverSBaitLeft)
  } else if (pinType === 42) {
    fishingBaitLeft =
      tostring(DEFAULTS.data.OceanBaitLeft) + "/" + tostring(DEFAULTS.data.OceanSBaitLeft)
  } else if (pinType === 43) {
    fishingBaitLeft =
      tostring(DEFAULTS.data.LakeBaitLeft) + "/" + tostring(DEFAULTS.data.LakeSBaitLeft)
  }
  if (fishingBaitLeft !== undefined && DEFAULTS.data.GeneralBait >= 1) {
    fishingBaitLeft = fishingBaitLeft + "/" + tostring(DEFAULTS.data.GeneralBait)
  }
  return fishingBaitLeft
}
