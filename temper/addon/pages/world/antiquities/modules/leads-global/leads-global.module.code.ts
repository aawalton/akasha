import { getAntiquityDigZoneName } from "akasha/temper/addon/pages/world/antiquities/modules/leads-active-leads/leads-active-leads.module.code.ts"
import {
  dropdownHideTooltip,
  dropdownShowTooltip,
  setupDropdown,
} from "akasha/temper/addon/pages/world/antiquities/modules/leads-dropdowns/leads-dropdowns.module.code.ts"
import { toggleLeadsWindow } from "akasha/temper/addon/pages/world/antiquities/modules/leads-toggle/leads-toggle.module.code.ts"
import {
  alertsMouseEnter,
  alertsMouseExit,
  headerMouseEnter,
  headerMouseExit,
  locationBoxMouseEnter,
  locationBoxMouseExit,
  rowMouseEnter,
  rowMouseExit,
  rowMouseUp,
} from "akasha/temper/addon/pages/world/antiquities/modules/leads-tooltips/leads-tooltips.module.code.ts"
import { STRINGS } from "akasha/temper/addon/pages/world/antiquities/modules/leads-ui-strings/leads-ui-strings.module.code.ts"
import "akasha/temper/addon/pages/world/antiquities/leads-global-declarations/leads-global-declarations.type-declaration.d.ts"

globalThis.TemperWorldLeads = {
  toggleRDL: toggleLeadsWindow,
  SetupDropdown: setupDropdown,
  DropdownShowTooltip: dropdownShowTooltip,
  DropdownHideTooltip: dropdownHideTooltip,
  HeaderMouseEnter: headerMouseEnter,
  HeaderMouseExit: headerMouseExit,
  RowMouseEnter: rowMouseEnter,
  RowMouseExit: rowMouseExit,
  RowMouseUp: rowMouseUp,
  AlertsMouseEnter: alertsMouseEnter,
  AlertsMouseExit: alertsMouseExit,
  LocationBoxMouseEnter: locationBoxMouseEnter,
  LocationBoxMouseExit: locationBoxMouseExit,
  SORTHEADER_NAMES: STRINGS.SORTHEADER_NAMES,
  getAntiquityDigZoneName,
}
