import type { CarYear } from "../car-year.page-type.ts"

export const landRoverDefender2025 = {
  id: "019e4ae8-0a0a-7d42-b329-67073411294c",
  pageTypeSlug: "car-year",
  slug: "land-rover-defender-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 Defender lineup retained the P400 MHEV inline-6 as the volume electrified powertrain across 90 (2-door), 110 (4-door), and 130 (long-wheelbase) bodies. Trim ladder spanned S, SE, X-Dynamic SE, X, and X-Dynamic X with P400 across most positions. Defender 90 P400 X-Dynamic SE started at $68,500; Defender 110 P400 S at $68,100 and P400 X-Dynamic SE at $72,100. The 5.0L supercharged P525 V8 returned (not electrified, excluded). The Defender Octa (twin-turbo V8) was new for 2025 at the top of the range (excluded as ICE-only V8). Sources: https://www.edmunds.com/land-rover/defender/2025/90/ , https://www.landroverwesthouston.com/research/2025-defender-110-trim-levels.htm",
  shortList: false,
  sources:
    "- https://www.edmunds.com/land-rover/defender/2025/90/\n- https://www.landroverwesthouston.com/research/2025-defender-110-trim-levels.htm\n- https://www.landroverbethesda.com/research/2025-defender-90-trim-levels.htm\n- https://www.landroverbethesda.com/research/2025-defender-130-trim-levels.htm",
  exclusionReason: "All trims excluded",
  carModelSlug: "land-rover-defender",
} as const satisfies CarYear
