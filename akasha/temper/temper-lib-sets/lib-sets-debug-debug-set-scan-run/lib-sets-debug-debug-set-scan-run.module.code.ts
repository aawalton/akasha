import {
  asNumberOpt,
  asNumRecord,
  asNumRecordOpt,
  asPresent,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { getFirstEntryOfTable } from "../lib-sets-debug-debug-helpers/lib-sets-debug-debug-helpers.module.code.ts"
import {
  DEBUG_HOLDER,
  DEBUG_OUTPUT_START_LINE,
  libPrefix,
  SCAN_STATE,
  UNKNOWN_NAME,
} from "../lib-sets-debug-debug-state/lib-sets-debug-debug-state.module.code.ts"

const lib = LibSets

const zocstrfor = ZO_CachedStrFormat
const buildItemLink = lib.buildItemLink

const UPPER_CASE_FIRST_FORMATTER = "<<C:1>>"

function scanAllSetData(
  this: void,
  keepUncompressedetItemIds?: boolean,
  noReloadInfo?: boolean
): undefined {
  const noReload = noReloadInfo ?? false
  const keepUncompressed = keepUncompressedetItemIds ?? false
  const numItemIdPackages = lib.debugNumItemIdPackages
  const numItemIdPackageSize = lib.debugNumItemIdPackageSize

  if (
    numItemIdPackages === undefined ||
    numItemIdPackages === 0 ||
    numItemIdPackageSize === undefined ||
    numItemIdPackageSize === 0
  ) {
    return
  }
  const itemIdsToScanTotal = numItemIdPackages * numItemIdPackageSize
  d(DEBUG_OUTPUT_START_LINE)
  d(
    libPrefix +
      "Start to load all set data. This could take a few minutes to finish!\nWatch the chat output for further information."
  )
  d(
    ">Scanning " +
      tostring(numItemIdPackages) +
      " packages with each " +
      tostring(numItemIdPackageSize) +
      " itemIds (total: " +
      tostring(itemIdsToScanTotal) +
      ") now..."
  )

  SCAN_STATE.sets = {}
  SCAN_STATE.setsEquipTypes = {}
  SCAN_STATE.setsArmor = {}
  SCAN_STATE.setsArmorTypes = {}
  SCAN_STATE.setsJewelry = {}
  SCAN_STATE.setsWeapons = {}
  SCAN_STATE.setsWeaponTypes = {}

  SCAN_STATE.setCount = 0
  SCAN_STATE.itemCount = 0
  SCAN_STATE.itemArmorCount = 0
  SCAN_STATE.itemJewelryCount = 0
  SCAN_STATE.itemWeaponsCount = 0
  SCAN_STATE.itemIdsScanned = 0

  let milliseconds = 0
  const fromTo: { from: number; to: number }[] = []
  let fromVal = 0
  let summaryMet = false

  SCAN_STATE.noFurtherItemsFound = false
  for (const numItemIdPackage of $range(1, numItemIdPackages, 1)) {
    const toVal = numItemIdPackage * numItemIdPackageSize
    fromTo.push({ from: fromVal, to: toVal })
    fromVal = toVal + 1
  }
  const numPackageLoops = fromTo.length
  for (const [packageNr, packageData] of ipairs(fromTo)) {
    const isLastLoop = packageNr === numPackageLoops

    zo_callLater((): undefined => {
      if (!summaryMet && !SCAN_STATE.noFurtherItemsFound) {
        d(">loadSetsByIds, packageNr: " + tostring(packageNr))
        asPresent(DEBUG_HOLDER.loadSetsByIds)(packageNr, packageData.from, packageData.to, noReload)
      }
      if ((SCAN_STATE.noFurtherItemsFound === true || isLastLoop === true) && !summaryMet) {
        d(">lastLoop, or noFurtherItemsFound!")
        summaryMet = true
        let loopsLeft = numPackageLoops - packageNr
        if (loopsLeft < 0) {
          loopsLeft = 0
        }
        d(
          ">>#fromTo: " +
            tostring(fromTo.length) +
            ", packageNr: " +
            tostring(packageNr) +
            ", loopsLeft: " +
            tostring(loopsLeft)
        )
        asPresent(DEBUG_HOLDER.showSetCountsScanned)(true, keepUncompressed, noReload, "Summary")
      }
    }, milliseconds)

    milliseconds = milliseconds + 1000
  }
}
lib.DebugScanAllSetData = scanAllSetData
DEBUG_HOLDER.scanAllSetData = scanAllSetData

function getNewSetName(this: void, newSetId: number | undefined): string {
  if (newSetId === undefined) {
    return UNKNOWN_NAME
  }
  let itemId: number | undefined
  if (SCAN_STATE.sets[newSetId] !== undefined) {
    itemId = asNumberOpt(getFirstEntryOfTable(SCAN_STATE.sets[newSetId], true))
  }
  if (itemId === undefined) {
    const itemIdsPreloaded = asNumRecord(lib.setDataPreloaded[LIBSETS_TABLEKEY_SETITEMIDS])
    if (itemIdsPreloaded[newSetId] === undefined) {
      return UNKNOWN_NAME
    }
    itemId = asNumberOpt(
      getFirstEntryOfTable(asNumRecordOpt(lib.DecompressSetIdItemIds(newSetId)), true)
    )
  }
  if (itemId === undefined) {
    return UNKNOWN_NAME
  }
  const setItemLink = buildItemLink(itemId)
  if (setItemLink === undefined || setItemLink === "") {
    return UNKNOWN_NAME
  }
  const [hasSet, setName, , , , setId] = GetItemLinkSetInfo(setItemLink, false)
  if (hasSet === true && setId === newSetId) {
    return zocstrfor(UPPER_CASE_FIRST_FORMATTER, setName)
  }
  return UNKNOWN_NAME
}
DEBUG_HOLDER.getNewSetName = getNewSetName
