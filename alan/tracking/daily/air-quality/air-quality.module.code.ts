import { z } from "zod"

export type AqiCategory =
  | "good"
  | "moderate"
  | "unhealthy-sensitive"
  | "unhealthy"
  | "very-unhealthy"
  | "hazardous"

export type Pollutant = "pm2_5" | "pm10" | "o3" | "no2" | "so2" | "co"

export type OutdoorVerdict = "clear" | "caution" | "indoor-only"

export interface ResolvedLocation {
  readonly label: string
  readonly latitude: number
  readonly longitude: number
}

export interface AirQualityReading {
  readonly aqi: number
  readonly category: AqiCategory
  readonly dominantPollutant: Pollutant
  readonly subIndices: Readonly<Record<Pollutant, number>>
  readonly source: string
  readonly location: ResolvedLocation
  readonly observedAt: string
}

export interface OutdoorAssessment {
  readonly verdict: OutdoorVerdict
  readonly indoorOnly: boolean
  readonly pm25Driven: boolean
  readonly headline: string
}

export const PROVO: ResolvedLocation = {
  label: "Provo, UT",
  latitude: 40.2338,
  longitude: -111.6585,
}

export const LOCATION_PRESETS: Readonly<Record<string, ResolvedLocation>> = {
  provo: PROVO,
}

export const CATEGORY_LABEL: Readonly<Record<AqiCategory, string>> = {
  good: "Good",
  moderate: "Moderate",
  "unhealthy-sensitive": "Unhealthy for Sensitive Groups",
  unhealthy: "Unhealthy",
  "very-unhealthy": "Very Unhealthy",
  hazardous: "Hazardous",
}

export const POLLUTANT_LABEL: Readonly<Record<Pollutant, string>> = {
  pm2_5: "PM2.5",
  pm10: "PM10",
  o3: "ozone",
  no2: "NO₂",
  so2: "SO₂",
  co: "CO",
}

const POLLUTANT_PRIORITY: readonly Pollutant[] = ["pm2_5", "pm10", "o3", "no2", "so2", "co"]

const SOURCE_LABEL = "Open-Meteo (US AQI, EPA breakpoints)"

export function aqiCategory(aqi: number): AqiCategory {
  if (aqi <= 50) return "good"
  if (aqi <= 100) return "moderate"
  if (aqi <= 150) return "unhealthy-sensitive"
  if (aqi <= 200) return "unhealthy"
  if (aqi <= 300) return "very-unhealthy"
  return "hazardous"
}

export function dominantPollutant(subIndices: Readonly<Record<Pollutant, number>>): Pollutant {
  let best: Pollutant = "pm2_5"
  let bestVal = Number.NEGATIVE_INFINITY
  for (const pollutant of POLLUTANT_PRIORITY) {
    const value = subIndices[pollutant]
    if (value > bestVal) {
      bestVal = value
      best = pollutant
    }
  }
  return best
}

export function assessOutdoor(reading: AirQualityReading): OutdoorAssessment {
  const pm25Driven = reading.dominantPollutant === "pm2_5"
  const moderateOrWorse = reading.aqi >= 51
  const usgOrWorse = reading.aqi >= 101
  const indoorOnly = usgOrWorse || (pm25Driven && moderateOrWorse)
  const verdict: OutdoorVerdict = indoorOnly ? "indoor-only" : moderateOrWorse ? "caution" : "clear"

  const categoryLabel = CATEGORY_LABEL[reading.category]
  const pollutantLabel = POLLUTANT_LABEL[reading.dominantPollutant]
  const headline = buildHeadline(verdict, reading.aqi, categoryLabel, pollutantLabel, pm25Driven)

  return { verdict, indoorOnly, pm25Driven, headline }
}

function buildHeadline(
  verdict: OutdoorVerdict,
  aqi: number,
  categoryLabel: string,
  pollutantLabel: string,
  pm25Driven: boolean
): string {
  if (verdict === "clear") {
    return `Air is clear — AQI ${aqi} (${categoryLabel}). Outdoor exertion is a green light.`
  }
  if (verdict === "caution") {
    return `AQI ${aqi} (${categoryLabel}, ${pollutantLabel}-driven). Outdoor exertion is okay but not pristine — ease off if you feel it.`
  }
  const driver = pm25Driven ? `${categoryLabel}, PM2.5-driven` : categoryLabel
  return `AQI ${aqi} (${driver}). INDOOR ONLY today — skip outdoor exertion; pivot to respiratory-safe indoor work.`
}

const OpenMeteoCurrentSchema = z.object({
  time: z.string(),
  us_aqi: z.number(),
  us_aqi_pm2_5: z.number().nullable(),
  us_aqi_pm10: z.number().nullable(),
  us_aqi_o3: z.number().nullable(),
  us_aqi_no2: z.number().nullable(),
  us_aqi_so2: z.number().nullable(),
  us_aqi_co: z.number().nullable(),
})

const OpenMeteoResponseSchema = z.object({
  current: OpenMeteoCurrentSchema,
})

export function buildAirQualityUrl(location: ResolvedLocation): string {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "us_aqi,us_aqi_pm2_5,us_aqi_pm10,us_aqi_o3,us_aqi_no2,us_aqi_so2,us_aqi_co",
    timezone: "auto",
  })
  return `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`
}

function coalesceSubIndex(value: number | null): number {
  return value === null ? -1 : value
}

export function parseOpenMeteoResponse(
  body: unknown,
  location: ResolvedLocation
): AirQualityReading {
  const { current } = OpenMeteoResponseSchema.parse(body)
  const subIndices: Record<Pollutant, number> = {
    pm2_5: coalesceSubIndex(current.us_aqi_pm2_5),
    pm10: coalesceSubIndex(current.us_aqi_pm10),
    o3: coalesceSubIndex(current.us_aqi_o3),
    no2: coalesceSubIndex(current.us_aqi_no2),
    so2: coalesceSubIndex(current.us_aqi_so2),
    co: coalesceSubIndex(current.us_aqi_co),
  }
  const aqi = Math.round(current.us_aqi)
  return {
    aqi,
    category: aqiCategory(aqi),
    dominantPollutant: dominantPollutant(subIndices),
    subIndices,
    source: SOURCE_LABEL,
    location,
    observedAt: current.time,
  }
}
