import type { Location } from "../location.page-type.ts"

export const londonBridge = {
  id: "019f1aec-0e7d-7414-aa8e-2175ed12e9d8",
  pageTypeSlug: "location",
  slug: "london-bridge",
  title: "London Bridge",
  latitude: 51.508049,
  longitude: -0.0876715,
  sourcePlaceId: "gmaps:0xa61e28267c3563ac",
  sourceUrl:
    "https://www.google.com/maps/place/London+Bridge/data=!4m2!3m1!1s0x4876035159bb13c5:0xa61e28267c3563ac",
  locationSource: "saved:London, England",
} as const satisfies Location
