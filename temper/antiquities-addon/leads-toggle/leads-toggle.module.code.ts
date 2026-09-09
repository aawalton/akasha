import { setAlerts } from "../leads-alerts/leads-alerts.module.code.ts"
import { DROPDOWN_DATA } from "../leads-constants/leads-constants.module.code.ts"
import { FIND_SCRY_DIFFERENT_ZONES } from "../leads-find-scry-overrides/leads-find-scry-overrides.module.code.ts"
import { UNKNOWN } from "../leads-location-types/leads-location-types.module.code.ts"
import { LOCATIONS } from "../leads-locations/leads-locations.module.code.ts"
import { getUnitList } from "../leads-unit-list/leads-unit-list.module.code.ts"
import { setSetsMinFound, setUnits } from "../leads-unit-state/leads-unit-state.module.code.ts"
import { zoneDisplayName } from "../leads-zone-name/leads-zone-name.module.code.ts"
import { FAKE_ZONE_IDS } from "../leads-zones/leads-zones.module.code.ts"

let alreadyRun = false

export function toggleLeadsWindow(this: void, _extra?: string): undefined {
  if (TemperLeadsMainWindow.IsHidden()) {
    const units: Record<number, LeadsUnitData> = {}
    const setsMinFound: Record<number, number> = {}
    setUnits(units)
    setSetsMinFound(setsMinFound)
    const foundAlready: Record<string, string | undefined> = {}
    const zonesTable: string[] = []
    const setTypeTable: string[] = []
    let d7 = 0
    let d1 = 0
    let h1 = 0
    let antiquityId = GetNextAntiquityId(undefined)
    while (antiquityId !== undefined) {
      let haveLead = DoesAntiquityHaveLead(antiquityId)
      let zoneId = GetAntiquityZoneId(antiquityId)
      let zoneName = zoneDisplayName(zoneId)
      const antiquityName = ZO_CachedStrFormat("<<C:1>>", GetAntiquityName(antiquityId))
      const quality: number = GetAntiquityQuality(antiquityId)
      const setId = GetAntiquitySetId(antiquityId)
      let setName = ZO_CachedStrFormat("<<C:1>>", GetAntiquitySetName(setId))
      let setQuality: number = GetAntiquitySetQuality(setId)
      let diff: number = GetAntiquityDifficulty(antiquityId)
      const numRecovered = GetNumAntiquitiesRecovered(antiquityId)
      let repeatable = IsAntiquityRepeatable(antiquityId)
      if (setId > 0) {
        const currentMin = setsMinFound[setId]
        if (currentMin === undefined || (currentMin > numRecovered && !haveLead)) {
          setsMinFound[setId] = numRecovered
        }
      }
      if (setId === 22) {
        repeatable = false
      }
      if (
        antiquityId === 310 ||
        (antiquityId > 498 && antiquityId < 509) ||
        (antiquityId > 614 && antiquityId < 625)
      ) {
        repeatable = false
      }
      if (antiquityId === 248 && numRecovered === 1) {
        haveLead = false
      }
      const loreLeft =
        GetNumAntiquityLoreEntries(antiquityId) - GetNumAntiquityLoreEntriesAcquired(antiquityId)
      let leadTimeLeft = GetAntiquityLeadTimeRemainingSeconds(antiquityId)
      if (diff < 5 && (antiquityId < 401 || antiquityId > 415)) {
        diff = quality
      }
      if (haveLead) {
        if (leadTimeLeft === 0) {
          leadTimeLeft = 2851200
        }
        if (leadTimeLeft < 3600) {
          h1 = h1 + 1
        } else if (leadTimeLeft < 86400) {
          d1 = d1 + 1
        } else if (leadTimeLeft < 604800) {
          d7 = d7 + 1
        }
      } else {
        const findZoneId = FIND_SCRY_DIFFERENT_ZONES[antiquityId]
        if (findZoneId !== undefined) {
          zoneName = zoneDisplayName(findZoneId)
          zoneId = findZoneId
        }
      }
      const rewardId = GetAntiquityRewardId(antiquityId)
      if (setName === "" && rewardId > 0) {
        setQuality = GetAntiquityQuality(antiquityId)
        setName = REWARDS_MANAGER.GetRewardContextualTypeString(rewardId)
        if (setName === "Motif Chapter") {
          setQuality = 3
        }
      }
      if (zoneName !== "") {
        let locationEntry = LOCATIONS[antiquityId]
        if (locationEntry === undefined) {
          locationEntry = { description: UNKNOWN, type: UNKNOWN, short: UNKNOWN, complete: false }
          LOCATIONS[antiquityId] = locationEntry
        }
        units[antiquityId] = {
          Lead: antiquityName,
          Zone: zoneName,
          ZoneId: zoneId,
          Location: locationEntry.short,
          Diff: diff,
          Lore: loreLeft,
          Dug: numRecovered,
          Set: setName,
          SetId: setId,
          Expiration: leadTimeLeft,
          SetQuality: setQuality,
          HaveLead: haveLead,
          Repeatable: repeatable,
          Aid: antiquityId,
        }
      }
      if (!alreadyRun) {
        if (foundAlready[zoneName] === undefined && zoneId < FAKE_ZONE_IDS.ALLZONES) {
          foundAlready[zoneName] = zoneName
          zonesTable.push(zoneName)
        }
        if (foundAlready[setName] === undefined) {
          foundAlready[setName] = setName
          setTypeTable.push(setName)
        }
      }
      antiquityId = GetNextAntiquityId(antiquityId)
    }
    if (!alreadyRun) {
      alreadyRun = true
      zonesTable.sort()
      for (const zone of zonesTable) {
        DROPDOWN_DATA.ChoicesZone.push(zone)
        DROPDOWN_DATA.TooltipsZone.push(string.format(DROPDOWN_DATA.TooltipsZoneGenerated, zone))
      }
      setTypeTable.sort()
      for (const setType of setTypeTable) {
        DROPDOWN_DATA.ChoicesSetType.push(setType)
        DROPDOWN_DATA.TooltipsSetType.push(
          string.format(DROPDOWN_DATA.TooltipsSetTypeGenerated, setType)
        )
      }
    }
    setAlerts(d7, d1, h1)
    getUnitList().RefreshData()
  }
  SCENE_MANAGER.ToggleTopLevel(TemperLeadsMainWindow)
}
