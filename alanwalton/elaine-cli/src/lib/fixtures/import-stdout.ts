const WATCH_DAY = [
  '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan’s Apple Watch" unit="Cal" startDate="2024-01-13 09:00:00 -0800" endDate="2024-01-13 09:05:00 -0800" value="4.21"/>',
  '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan’s Apple Watch" unit="Cal" startDate="2024-01-13 09:05:00 -0800" endDate="2024-01-13 09:10:00 -0800" value="3.88"/>',
  '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan’s Apple Watch" unit="Cal" startDate="2024-01-13 09:10:00 -0800" endDate="2024-01-13 09:15:00 -0800" value="5.02"/>',
]

const PHONE_DAY = [
  '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan’s iPhone" unit="Cal" startDate="2024-01-14 00:00:00 -0800" endDate="2024-01-14 23:59:00 -0800" value="212.5"/>',
]

const WITH_CHILDREN =
  '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan’s Apple Watch" unit="Cal" startDate="2024-01-15 07:00:00 -0800" endDate="2024-01-15 07:05:00 -0800" value="6.5">'

const NO_SOURCE =
  '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" unit="Cal" startDate="2024-01-15 08:00:00 -0800" endDate="2024-01-15 08:05:00 -0800" value="2.75"/>'

const WRONG_UNIT =
  '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan’s Apple Watch" unit="kJ" startDate="2024-01-15 09:00:00 -0800" endDate="2024-01-15 09:05:00 -0800" value="30"/>'

const INVERTED_SPAN =
  '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan’s Apple Watch" unit="Cal" startDate="2024-01-15 10:05:00 -0800" endDate="2024-01-15 10:00:00 -0800" value="1"/>'

const BAD_VALUE =
  '<Record type="HKQuantityTypeIdentifierStepCount" sourceName="Alan’s iPhone" unit="count" startDate="2024-01-15 11:00:00 -0800" endDate="2024-01-15 11:10:00 -0800" value="lots"/>'

const BAD_DATE =
  '<Record type="HKQuantityTypeIdentifierStepCount" sourceName="Alan’s iPhone" unit="count" startDate="bad-date" endDate="2024-01-15 11:10:00 -0800" value="9"/>'

const STEPS = [
  '<Record type="HKQuantityTypeIdentifierStepCount" sourceName="Alan’s iPhone" unit="count" startDate="2024-01-13 09:00:00 -0800" endDate="2024-01-13 09:10:00 -0800" value="100"/>',
  '<Record type="HKQuantityTypeIdentifierStepCount" sourceName="Alan’s Apple Watch" unit="count" startDate="2024-01-13 09:00:00 -0800" endDate="2024-01-13 09:10:00 -0800" value="104"/>',
  '<Record type="HKQuantityTypeIdentifierStepCount" sourceName="Alan’s iPhone" unit="count" startDate="2024-01-14 09:00:00 -0800" endDate="2024-01-14 09:10:00 -0800" value="420"/>',
]

export const IMPORT_RECORD_LINES: readonly string[] = [
  ...WATCH_DAY,
  ...STEPS,
  ...PHONE_DAY,
  WITH_CHILDREN,
  NO_SOURCE,
  WRONG_UNIT,
  INVERTED_SPAN,
  BAD_VALUE,
  BAD_DATE,
]

export const CONVERTIBLE_COUNT = 9

export const IMPORT_STDOUT_LINES: readonly string[] = [
  "FILE\t/Users/walton/Downloads/export.zip",
  ' <ExportDate value="2024-01-16 08:30:00 -0800"/>',
  ...IMPORT_RECORD_LINES,
]
