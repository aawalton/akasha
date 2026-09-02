import {
  SAVED_VAR_VERSION,
  SAVED_VARIABLES_NAME,
} from "../writ-constants/writ-constants.module.code.ts"
import { str } from "../writ-i18n/writ-i18n.module.code.ts"

export const WW_DEFAULT: {
  log?: unknown
} = {}

export const WW_DEFAULT_CHAR: {
  writ_unique_id: Record<string, WritSavedChariable | undefined>
  enable_mat_price_tooltip: boolean
  enable_mat_list_chat: string | undefined
  enable_mm_price: boolean
  enable_att_price: boolean
  enable_ttc_price: boolean
  enable_station_colors: boolean
  enable_banked_vouchers: boolean
  lang: boolean
  enable_mat_list_tooltip: string | undefined
} = {
  writ_unique_id: {},
  enable_mat_price_tooltip: true,
  enable_mat_list_chat: str("lam_mat_list_off"),
  enable_mm_price: true,
  enable_att_price: true,
  enable_ttc_price: true,
  enable_station_colors: false,
  enable_banked_vouchers: false,
  lang: false,
  enable_mat_list_tooltip: str("lam_mat_tooltip_off"),
}

export function initSavedVariables(): undefined {
  const savedVariables = ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    SAVED_VAR_VERSION,
    undefined,
    WW_DEFAULT
  )
  TemperWrit.savedVariables = savedVariables

  if (savedVariables.log !== undefined) {
    savedVariables.log = undefined
  }

  TemperWrit.savedChariables = ZO_SavedVars.New(
    SAVED_VARIABLES_NAME,
    SAVED_VAR_VERSION,
    undefined,
    WW_DEFAULT_CHAR
  )
}
