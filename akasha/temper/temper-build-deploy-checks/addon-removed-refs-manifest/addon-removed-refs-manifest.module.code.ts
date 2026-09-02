export interface RemovedAddonGlobal {
  readonly global: string
  readonly addon: string
  readonly remedy: string
}

const FILTER_SUBSTRATE_REMEDY =
  "ported to the Temper-native filter substrate (#12076); register filters through the substrate"

export const REMOVED_EXTERNAL_ADDON_GLOBALS: readonly RemovedAddonGlobal[] = [
  { global: "AwesomeGuildStore", addon: "AwesomeGuildStore", remedy: FILTER_SUBSTRATE_REMEDY },
  { global: "AdvancedFilters", addon: "Advanced Filters", remedy: FILTER_SUBSTRATE_REMEDY },
  {
    global: "LibFilters",
    addon: "LibFilters (AGS / Advanced Filters filter registry)",
    remedy: FILTER_SUBSTRATE_REMEDY,
  },
  {
    global: "LibFilters3",
    addon: "LibFilters3 (AGS / Advanced Filters filter registry)",
    remedy: FILTER_SUBSTRATE_REMEDY,
  },
  {
    global: "IIFA_DATABASE",
    addon: "IIfA",
    remedy:
      "retired (#14988); its cross-character inventory UI lives in TemperInventory, and the /temperiifa importer that read this global is gone",
  },
  {
    global: "LibHarvensAddonSettings",
    addon: "LibHarvensAddonSettings",
    remedy: "retired fleet-wide (#14480); settings panels are built on LibAddonMenu-2.0",
  },
]
