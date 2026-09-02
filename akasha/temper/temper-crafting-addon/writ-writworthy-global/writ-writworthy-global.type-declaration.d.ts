interface WritSavedChariable {
  STATE?: string | undefined
  use_mimic?: boolean
  last_seen_ts?: number | undefined
}

interface TemperWritSavedVariables {
  filter_max_gold_per_voucher?: number | undefined
  enable_banked_vouchers?: boolean
  enable_station_colors?: boolean
  lang?: string | undefined
  enable_mat_price_tooltip?: boolean
  enable_mat_list_chat?: string | number
  enable_mm_price?: boolean
  enable_att_price?: boolean
  enable_ttc_price?: boolean
  enable_mat_list_tooltip?: string | number
  position?: Record<number, number>
  show_confirm_master_writ_duplicates?: boolean
  [key: string]: unknown
}

interface TemperWritSavedChariables {
  writ_unique_id?: Record<string, WritSavedChariable | undefined>
  [key: string]: unknown
}

interface TemperWritGlobal {
  name: string
  version: string

  Util?: import("../writ-util/writ-util.module.code.ts").UtilNamespace
  Log?: import("../writ-log/writ-log.module.code.ts").LogNamespace
  Logger?: typeof import("../writ-log/writ-log.module.code.ts").logger
  LogOne?: typeof import("../writ-log/writ-log.module.code.ts").logOne
  LogOneWarnError?: typeof import("../writ-log/writ-log.module.code.ts").logOneWarnError
  Know?: import("../writ-know/writ-know.module.code.ts").KnowNamespace
  MatRow?: import("../writ-mat-row/writ-mat-row.module.code.ts").MatRowNamespace
  Profiler?: import("../writ-profiler/writ-profiler.module.code.ts").ProfilerNamespace

  Alchemy?: import("../writ-alchemy-data/writ-alchemy-data.module.code.ts").AlchemyNamespace
  Enchanting?: import("../writ-enchanting-parser/writ-enchanting-parser.module.code.ts").EnchantingNamespace
  Provisioning?: import("../writ-prov-data/writ-prov-data.module.code.ts").ProvisioningNamespace
  Smithing?: import("../writ-smithing/writ-smithing.module.code.ts").SmithingNamespace
  RequiredSkill?: import("../writ-required-skill/writ-required-skill.module.code.ts").RequiredSkillNamespace

  Str?: typeof import("../writ-i18n/writ-i18n.module.code.ts").str
  SI?: typeof import("../writ-i18n/writ-i18n.module.code.ts").si
  Gear?: typeof import("../writ-i18n/writ-i18n.module.code.ts").gearName
  SetName?: typeof import("../writ-i18n/writ-i18n.module.code.ts").setName
  Shorten?: typeof import("../writ-i18n/writ-i18n.module.code.ts").shortenName
  Mat?: typeof import("../writ-i18n/writ-i18n.module.code.ts").matName
  Motif?: typeof import("../writ-i18n/writ-i18n.module.code.ts").motifName
  FoodDrink?: typeof import("../writ-i18n/writ-i18n.module.code.ts").foodDrink
  LangList?: typeof import("../writ-i18n/writ-i18n.module.code.ts").langList
  STR_HOW?: typeof import("../writ-i18n/writ-i18n.module.code.ts").STR_HOW
  I18NStatic?: typeof import("../writ-i18n/writ-i18n.module.code.ts").i18nStatic
  I18NClientSIDyn?: typeof import("../writ-i18n/writ-i18n.module.code.ts").i18nClientSiDyn
  I18NFoodDrinkDyn?: typeof import("../writ-i18n/writ-i18n.module.code.ts").i18nFoodDrinkDyn
  I18NGearDyn?: typeof import("../writ-i18n/writ-i18n.module.code.ts").i18nGearDyn
  I18NMotifDyn?: typeof import("../writ-i18n/writ-i18n.module.code.ts").i18nMotifDyn
  I18NMatDyn?: typeof import("../writ-i18n/writ-i18n.module.code.ts").i18nMatDyn
  I18NSetDyn?: typeof import("../writ-i18n/writ-i18n.module.code.ts").i18nSetDyn
  lang_list?: string[]
  LibSets?: (
    this: void
  ) => { GetSetName: (this: void, set_id: number) => string | undefined } | undefined

  LINK?: typeof import("../writ-link-data-table/writ-link-data-table.module.code.ts").LINK
  FindLink?: typeof import("../writ-link-data/writ-link-data.module.code.ts").findLink
  ToLinkKey?: typeof import("../writ-link-data/writ-link-data.module.code.ts").toLinkKey
  FALLBACK_PRICE?: Record<string | number, number | boolean>
  FallbackPrice?: typeof import("../writ-price/writ-price.module.code.ts").fallbackPrice
  PopulateTableWithItemIds?: typeof import("../writ-price/writ-price.module.code.ts").populateTableWithItemIds

  ICON_TO_PARSER?: Record<string, unknown>
  CreateParser?: typeof import("../writ-parser-dispatch/writ-parser-dispatch.module.code.ts").createParser
  ToMatKnowList?: typeof import("../writ-parser-dispatch/writ-parser-dispatch.module.code.ts").toMatKnowList
  ToMatCost?: typeof import("../writ-parser-dispatch/writ-parser-dispatch.module.code.ts").toMatCost
  ToVoucherCount?: typeof import("../writ-parser-dispatch/writ-parser-dispatch.module.code.ts").toVoucherCount
  ToLinkBaseText?: typeof import("../writ-parser-dispatch/writ-parser-dispatch.module.code.ts").toLinkBaseText
  ScanInventoryForMasterWrits?: (
    this: void
  ) => import("../writ-parser-dispatch/writ-parser-dispatch.module.code.ts").ScannedWrit[]
  UniqueID?: typeof import("../writ-parser-dispatch/writ-parser-dispatch.module.code.ts").uniqueID

  TooltipInsertOurText?: typeof import("../writ-tooltip/writ-tooltip.module.code.ts").tooltipInsertOurText
  TooltipInterceptInstall?: typeof import("../writ-tooltip/writ-tooltip.module.code.ts").tooltipInterceptInstall
  MatTooltipText?: typeof import("../writ-tooltip-text/writ-tooltip-text.module.code.ts").matTooltipText
  KnowTooltipText?: typeof import("../writ-tooltip-text/writ-tooltip-text.module.code.ts").knowTooltipText
  MatHaveCtTooltipText?: typeof import("../writ-tooltip-text/writ-tooltip-text.module.code.ts").matHaveCtTooltipText
  CanShowCMWDuplicates?: typeof import("../writ-tooltip-text/writ-tooltip-text.module.code.ts").canShowCMWDuplicates
  KnowDump?: typeof import("../writ-tooltip/writ-tooltip.module.code.ts").knowDump

  Forget?: typeof import("../writ-slash-commands/writ-slash-commands.module.code.ts").forget
  ServerName?: typeof import("../writ-slash-commands/writ-slash-commands.module.code.ts").serverName
  Port?: typeof import("../writ-slash-commands/writ-slash-commands.module.code.ts").port
  SlashCommand?: typeof import("../writ-slash-commands/writ-slash-commands.module.code.ts").slashCommand
  RegisterSlashCommands?: typeof import("../writ-slash-commands/writ-slash-commands.module.code.ts").registerSlashCommands
  server_name?: string
  DiscoverI18N?: (this: void) => undefined
  AQAddKeyBind?: unknown

  savedVariables?: TemperWritSavedVariables
  savedChariables?: TemperWritSavedChariables

  GOLD_UNKNOWN?: import("../writ-types/writ-types.module.code.ts").GoldAmount

  [key: string]: unknown
}

declare const TemperWrit: TemperWritGlobal
