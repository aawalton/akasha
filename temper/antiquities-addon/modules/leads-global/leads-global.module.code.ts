import { getAntiquityDigZoneName } from "akasha/temper/antiquities-addon/modules/leads-active-leads/leads-active-leads.module.code.ts"
import {
  dropdownHideTooltip,
  dropdownShowTooltip,
  setupDropdown,
} from "akasha/temper/antiquities-addon/modules/leads-dropdowns/leads-dropdowns.module.code.ts"
import { transmogrify } from "akasha/temper/antiquities-addon/modules/leads-reporting/leads-reporting.module.code.ts"
import { toggleLeadsWindow } from "akasha/temper/antiquities-addon/modules/leads-toggle/leads-toggle.module.code.ts"
import {
  alertsMouseEnter,
  alertsMouseExit,
  headerMouseEnter,
  headerMouseExit,
  leadFoundMouseEnter,
  leadFoundMouseExit,
  locationBoxMouseEnter,
  locationBoxMouseExit,
  rowMouseEnter,
  rowMouseExit,
  rowMouseUp,
} from "akasha/temper/antiquities-addon/modules/leads-tooltips/leads-tooltips.module.code.ts"
import { STRINGS } from "akasha/temper/antiquities-addon/modules/leads-ui-strings/leads-ui-strings.module.code.ts"

globalThis.TemperLeads = {
  toggleRDL: toggleLeadsWindow,
  SetupDropdown: setupDropdown,
  DropdownShowTooltip: dropdownShowTooltip,
  DropdownHideTooltip: dropdownHideTooltip,
  HeaderMouseEnter: headerMouseEnter,
  HeaderMouseExit: headerMouseExit,
  RowMouseEnter: rowMouseEnter,
  RowMouseExit: rowMouseExit,
  RowMouseUp: rowMouseUp,
  LeadfoundMouseEnter: leadFoundMouseEnter,
  LeadfoundMouseExit: leadFoundMouseExit,
  AlertsMouseEnter: alertsMouseEnter,
  AlertsMouseExit: alertsMouseExit,
  LocationBoxMouseEnter: locationBoxMouseEnter,
  LocationBoxMouseExit: locationBoxMouseExit,
  transmogrify,
  SORTHEADER_NAMES: STRINGS.SORTHEADER_NAMES,
  getAntiquityDigZoneName,
}
