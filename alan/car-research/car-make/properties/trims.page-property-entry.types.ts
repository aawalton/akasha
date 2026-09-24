import type { ExclusionReason } from "akasha/alan/car-research/car/properties/exclusion-reason.text-property.types.ts"
import type { ShortList } from "akasha/alan/car-research/car/properties/short-list.boolean-property.types.ts"
import type { Sources } from "akasha/alan/car-research/car/properties/sources.text-property.types.ts"
import type { AdasOptional } from "akasha/alan/car-research/car-trim/properties/adas-optional.text-property.types.ts"
import type { AdasStandard } from "akasha/alan/car-research/car-trim/properties/adas-standard.text-property.types.ts"
import type { AndroidAutoWireless } from "akasha/alan/car-research/car-trim/properties/android-auto-wireless.boolean-property.types.ts"
import type { BatteryChemistry } from "akasha/alan/car-research/car-trim/properties/battery-chemistry.select-property.types.ts"
import type { BatteryKwhGross } from "akasha/alan/car-research/car-trim/properties/battery-kwh-gross.number-property.types.ts"
import type { BatteryKwhUsable } from "akasha/alan/car-research/car-trim/properties/battery-kwh-usable.number-property.types.ts"
import type { CarYear } from "akasha/alan/car-research/car-trim/properties/car-year.relation-property.types.ts"
import type { CargoBehindRow1Cuft } from "akasha/alan/car-research/car-trim/properties/cargo-behind-row1-cuft.number-property.types.ts"
import type { CargoBehindRow2Cuft } from "akasha/alan/car-research/car-trim/properties/cargo-behind-row2-cuft.number-property.types.ts"
import type { CarplayWireless } from "akasha/alan/car-research/car-trim/properties/carplay-wireless.boolean-property.types.ts"
import type { ChargingPort } from "akasha/alan/car-research/car-trim/properties/charging-port.select-property.types.ts"
import type { CurbWeightLb } from "akasha/alan/car-research/car-trim/properties/curb-weight-lb.number-property.types.ts"
import type { DcFastChargePeakKw } from "akasha/alan/car-research/car-trim/properties/dc-fast-charge-peak-kw.number-property.types.ts"
import type { DcFastCharge10To80Min } from "akasha/alan/car-research/car-trim/properties/dc-fast-charge10-to80-min.number-property.types.ts"
import type { DestinationFee } from "akasha/alan/car-research/car-trim/properties/destination-fee.number-property.types.ts"
import type { DriveLayout } from "akasha/alan/car-research/car-trim/properties/drive-layout.select-property.types.ts"
import type { DriverAssistBrand } from "akasha/alan/car-research/car-trim/properties/driver-assist-brand.text-property.types.ts"
import type { DrmNotes } from "akasha/alan/car-research/car-trim/properties/drm-notes.text-property.types.ts"
import type { EpaRangeElectricMi } from "akasha/alan/car-research/car-trim/properties/epa-range-electric-mi.number-property.types.ts"
import type { EpaRangeTotalMi } from "akasha/alan/car-research/car-trim/properties/epa-range-total-mi.number-property.types.ts"
import type { FederalTaxCreditAmount } from "akasha/alan/car-research/car-trim/properties/federal-tax-credit-amount.number-property.types.ts"
import type { FederalTaxCreditEligible } from "akasha/alan/car-research/car-trim/properties/federal-tax-credit-eligible.boolean-property.types.ts"
import type { GroundClearanceIn } from "akasha/alan/car-research/car-trim/properties/ground-clearance-in.number-property.types.ts"
import type { HeightIn } from "akasha/alan/car-research/car-trim/properties/height-in.number-property.types.ts"
import type { Horsepower } from "akasha/alan/car-research/car-trim/properties/horsepower.number-property.types.ts"
import type { IihsRating } from "akasha/alan/car-research/car-trim/properties/iihs-rating.select-property.types.ts"
import type { Infotainment } from "akasha/alan/car-research/car-trim/properties/infotainment.text-property.types.ts"
import type { KillSwitchNotes } from "akasha/alan/car-research/car-trim/properties/kill-switch-notes.text-property.types.ts"
import type { KillSwitchPresent } from "akasha/alan/car-research/car-trim/properties/kill-switch-present.boolean-property.types.ts"
import type { KnownIssues } from "akasha/alan/car-research/car-trim/properties/known-issues.text-property.types.ts"
import type { L2HomeChargeHr } from "akasha/alan/car-research/car-trim/properties/l2-home-charge-hr.number-property.types.ts"
import type { LengthIn } from "akasha/alan/car-research/car-trim/properties/length-in.number-property.types.ts"
import type { MotorCount } from "akasha/alan/car-research/car-trim/properties/motor-count.number-property.types.ts"
import type { MpgCombined } from "akasha/alan/car-research/car-trim/properties/mpg-combined.number-property.types.ts"
import type { MpgeCombined } from "akasha/alan/car-research/car-trim/properties/mpge-combined.number-property.types.ts"
import type { Msrp } from "akasha/alan/car-research/car-trim/properties/msrp.number-property.types.ts"
import type { NhtsaOverallStars } from "akasha/alan/car-research/car-trim/properties/nhtsa-overall-stars.number-property.types.ts"
import type { PayloadCapacityLb } from "akasha/alan/car-research/car-trim/properties/payload-capacity-lb.number-property.types.ts"
import type { PowertrainType } from "akasha/alan/car-research/car-trim/properties/powertrain-type.select-property.types.ts"
import type { RearViewCameraNotes } from "akasha/alan/car-research/car-trim/properties/rear-view-camera-notes.text-property.types.ts"
import type { Recalls } from "akasha/alan/car-research/car-trim/properties/recalls.text-property.types.ts"
import type { RunsOffline } from "akasha/alan/car-research/car-trim/properties/runs-offline.boolean-property.types.ts"
import type { SeatingCapacity } from "akasha/alan/car-research/car-trim/properties/seating-capacity.number-property.types.ts"
import type { SideViewCameraNotes } from "akasha/alan/car-research/car-trim/properties/side-view-camera-notes.text-property.types.ts"
import type { StateIncentives } from "akasha/alan/car-research/car-trim/properties/state-incentives.text-property.types.ts"
import type { SubscriptionFeatures } from "akasha/alan/car-research/car-trim/properties/subscription-features.text-property.types.ts"
import type { TcoAnnualMiles } from "akasha/alan/car-research/car-trim/properties/tco-annual-miles.number-property.types.ts"
import type { TcoDepreciation } from "akasha/alan/car-research/car-trim/properties/tco-depreciation.number-property.types.ts"
import type { TcoFinancing } from "akasha/alan/car-research/car-trim/properties/tco-financing.number-property.types.ts"
import type { TcoFuel } from "akasha/alan/car-research/car-trim/properties/tco-fuel.number-property.types.ts"
import type { TcoInsurance } from "akasha/alan/car-research/car-trim/properties/tco-insurance.number-property.types.ts"
import type { TcoMaintenance } from "akasha/alan/car-research/car-trim/properties/tco-maintenance.number-property.types.ts"
import type { TcoRepairs } from "akasha/alan/car-research/car-trim/properties/tco-repairs.number-property.types.ts"
import type { TcoSource } from "akasha/alan/car-research/car-trim/properties/tco-source.text-property.types.ts"
import type { TcoTaxesFees } from "akasha/alan/car-research/car-trim/properties/tco-taxes-fees.number-property.types.ts"
import type { TcoYears } from "akasha/alan/car-research/car-trim/properties/tco-years.number-property.types.ts"
import type { TopSpeedMph } from "akasha/alan/car-research/car-trim/properties/top-speed-mph.number-property.types.ts"
import type { TorqueLbft } from "akasha/alan/car-research/car-trim/properties/torque-lbft.number-property.types.ts"
import type { TowingCapacityLb } from "akasha/alan/car-research/car-trim/properties/towing-capacity-lb.number-property.types.ts"
import type { TransactionPrice } from "akasha/alan/car-research/car-trim/properties/transaction-price.number-property.types.ts"
import type { WarrantyBasic } from "akasha/alan/car-research/car-trim/properties/warranty-basic.text-property.types.ts"
import type { WarrantyBattery } from "akasha/alan/car-research/car-trim/properties/warranty-battery.text-property.types.ts"
import type { WarrantyPowertrain } from "akasha/alan/car-research/car-trim/properties/warranty-powertrain.text-property.types.ts"
import type { WheelbaseIn } from "akasha/alan/car-research/car-trim/properties/wheelbase-in.number-property.types.ts"
import type { WidthIn } from "akasha/alan/car-research/car-trim/properties/width-in.number-property.types.ts"
import type { ZeroToSixtySec } from "akasha/alan/car-research/car-trim/properties/zero-to-sixty-sec.number-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Trims = "jsonl"

export type TrimsRow = {
  id: Id
  slug: Slug
  title: Title
  shortList: ShortList
  sources: Sources
  exclusionReason?: ExclusionReason
  msrp?: Msrp
  powertrainType: PowertrainType
  driveLayout: DriveLayout
  chargingPort?: ChargingPort
  batteryChemistry?: BatteryChemistry
  iihsRating?: IihsRating
  killSwitchPresent: KillSwitchPresent
  runsOffline: RunsOffline
  carplayWireless?: CarplayWireless
  androidAutoWireless?: AndroidAutoWireless
  federalTaxCreditEligible?: FederalTaxCreditEligible
  carYear: CarYear
  adasStandard: AdasStandard
  adasOptional?: AdasOptional
  driverAssistBrand?: DriverAssistBrand
  infotainment: Infotainment
  rearViewCameraNotes: RearViewCameraNotes
  sideViewCameraNotes: SideViewCameraNotes
  killSwitchNotes: KillSwitchNotes
  drmNotes: DrmNotes
  subscriptionFeatures: SubscriptionFeatures
  warrantyBasic: WarrantyBasic
  warrantyPowertrain?: WarrantyPowertrain
  warrantyBattery?: WarrantyBattery
  knownIssues?: KnownIssues
  recalls?: Recalls
  stateIncentives?: StateIncentives
  tcoSource?: TcoSource
  motorCount?: MotorCount
  horsepower?: Horsepower
  batteryKwhGross?: BatteryKwhGross
  batteryKwhUsable?: BatteryKwhUsable
  epaRangeElectricMi?: EpaRangeElectricMi
  epaRangeTotalMi?: EpaRangeTotalMi
  mpgCombined?: MpgCombined
  mpgeCombined?: MpgeCombined
  dcFastChargePeakKw?: DcFastChargePeakKw
  dcFastCharge10To80Min?: DcFastCharge10To80Min
  l2HomeChargeHr?: L2HomeChargeHr
  lengthIn?: LengthIn
  widthIn?: WidthIn
  heightIn?: HeightIn
  groundClearanceIn?: GroundClearanceIn
  cargoBehindRow1Cuft?: CargoBehindRow1Cuft
  cargoBehindRow2Cuft?: CargoBehindRow2Cuft
  curbWeightLb?: CurbWeightLb
  destinationFee?: DestinationFee
  federalTaxCreditAmount?: FederalTaxCreditAmount
  transactionPrice?: TransactionPrice
  seatingCapacity: SeatingCapacity
  wheelbaseIn?: WheelbaseIn
  payloadCapacityLb?: PayloadCapacityLb
  towingCapacityLb?: TowingCapacityLb
  torqueLbft?: TorqueLbft
  topSpeedMph?: TopSpeedMph
  zeroToSixtySec?: ZeroToSixtySec
  nhtsaOverallStars?: NhtsaOverallStars
  tcoYears: TcoYears
  tcoAnnualMiles: TcoAnnualMiles
  tcoDepreciation?: TcoDepreciation
  tcoFinancing?: TcoFinancing
  tcoFuel?: TcoFuel
  tcoInsurance?: TcoInsurance
  tcoMaintenance?: TcoMaintenance
  tcoRepairs?: TcoRepairs
  tcoTaxesFees?: TcoTaxesFees
}
