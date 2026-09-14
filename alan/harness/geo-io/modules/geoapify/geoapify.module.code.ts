const GEOAPIFY_AUTOCOMPLETE_URL = "https://api.geoapify.com/v1/geocode/autocomplete"

export function buildGeoapifyAutocompleteUrl(text: string, apiKey: string, limit: number): string {
  const params = new URLSearchParams({ text, apiKey, limit: String(limit), format: "geojson" })
  return `${GEOAPIFY_AUTOCOMPLETE_URL}?${params.toString()}`
}
