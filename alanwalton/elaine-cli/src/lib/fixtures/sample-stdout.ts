const RECORDS = [
  '<Record type="HKQuantityTypeIdentifierHeartRateVariabilitySDNN" unit="ms" startDate="2024-01-13 07:00:00 -0800" endDate="2024-01-13 07:01:00 -0800" value="40">',
  '<Record type="HKQuantityTypeIdentifierHeartRateVariabilitySDNN" unit="ms" startDate="2024-01-14 07:00:00 -0800" endDate="2024-01-14 07:01:00 -0800" value="50"/>',
  '<Record type="HKQuantityTypeIdentifierRestingHeartRate" unit="count/min" startDate="2024-01-13 12:00:00 -0800" endDate="2024-01-13 12:00:00 -0800" value="60"/>',
  '<Record type="HKQuantityTypeIdentifierRestingHeartRate" unit="count/min" startDate="2024-01-14 12:00:00 -0800" endDate="2024-01-14 12:00:00 -0800" value="58"/>',
  '<Record type="HKQuantityTypeIdentifierOxygenSaturation" unit="%" startDate="2024-01-13 02:00:00 -0800" endDate="2024-01-13 02:01:00 -0800" value="0.95">',
  '<Record type="HKQuantityTypeIdentifierOxygenSaturation" unit="%" startDate="2024-01-14 02:00:00 -0800" endDate="2024-01-14 02:01:00 -0800" value="0.97"/>',
  '<Record type="HKQuantityTypeIdentifierStepCount" unit="count" startDate="2024-01-13 09:00:00 -0800" endDate="2024-01-13 09:10:00 -0800" value="100"/>',
  '<Record type="HKQuantityTypeIdentifierStepCount" unit="count" startDate="2024-01-13 10:00:00 -0800" endDate="2024-01-13 10:10:00 -0800" value="200"/>',
  '<Record type="HKQuantityTypeIdentifierStepCount" unit="count" startDate="2024-01-14 09:00:00 -0800" endDate="2024-01-14 09:10:00 -0800" value="400"/>',
  '<Record type="HKQuantityTypeIdentifierStepCount" unit="count" startDate="2024-01-14 10:00:00 -0800" endDate="2024-01-14 10:10:00 -0800" value="600"/>',
  '<Record type="HKCategoryTypeIdentifierSleepAnalysis" startDate="2024-01-13 01:00:00 -0800" endDate="2024-01-13 02:00:00 -0800" value="HKCategoryValueSleepAnalysisAsleepCore"/>',
  '<Record type="HKCategoryTypeIdentifierSleepAnalysis" startDate="2024-01-13 02:00:00 -0800" endDate="2024-01-13 03:00:00 -0800" value="HKCategoryValueSleepAnalysisAsleepDeep"/>',
  '<Record type="HKCategoryTypeIdentifierSleepAnalysis" startDate="2024-01-14 01:00:00 -0800" endDate="2024-01-14 03:00:00 -0800" value="HKCategoryValueSleepAnalysisAsleepCore"/>',
  '<Record type="HKCategoryTypeIdentifierSleepAnalysis" startDate="2024-01-14 03:00:00 -0800" endDate="2024-01-14 04:30:00 -0800" value="HKCategoryValueSleepAnalysisAsleepREM"/>',
  '<Record type="HKCategoryTypeIdentifierSleepAnalysis" startDate="2024-01-14 00:30:00 -0800" endDate="2024-01-14 06:00:00 -0800" value="HKCategoryValueSleepAnalysisInBed"/>',
  '<Record type="HKCategoryTypeIdentifierSleepAnalysis" startDate="2024-01-14 04:30:00 -0800" endDate="2024-01-14 04:45:00 -0800" value="HKCategoryValueSleepAnalysisAwake"/>',
]

const BAD_RECORD =
  '<Record type="HKQuantityTypeIdentifierStepCount" startDate="bad-date" endDate="2024-01-14 10:00:00 -0800" value="9"/>'

export const PROTOCOL_STDOUT = [
  "FILE\t/Users/walton/Downloads/export.zip",
  ' <ExportDate value="2024-01-15 08:30:00 -0800"/>',
  ...RECORDS,
  BAD_RECORD,
].join("\n")
