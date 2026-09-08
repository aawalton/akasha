import {
  type AirQualityReading,
  buildAirQualityUrl,
  parseOpenMeteoResponse,
  type ResolvedLocation,
} from "../air-quality/air-quality.module.code.ts"

export async function fetchAirQuality(location: ResolvedLocation): Promise<AirQualityReading> {
  const url = buildAirQualityUrl(location)
  const res = await fetch(url, {
    signal: AbortSignal.timeout(20_000),
    headers: { accept: "application/json" },
  })
  if (!res.ok) {
    throw new Error(`air-quality source returned HTTP ${res.status} ${res.statusText}`)
  }
  const body: unknown = await res.json()
  return parseOpenMeteoResponse(body, location)
}
