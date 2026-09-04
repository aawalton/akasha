import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingAirQuality = {
  id: "01a06904-524f-7608-9c62-da2d464f8aec",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-air-quality",
  definition:
    "the current air reading for a location, and the outdoor-exertion verdict drawn from it.",
  opsPath: "tracking air-quality",
  opsEntryFile: "alan/tracking/daily/air-quality-command/air-quality-command.module.code.ts",
  opsHelp: "txt",
  flags: [
    {
      name: "--location",
      argLabel: "<name>",
      valueShape: "token",
      description: "A named preset, `provo` where none is given.",
    },
    {
      name: "--lat",
      argLabel: "<n>",
      valueShape: "token",
      description: "The latitude, given with --lon, and taken over --location.",
    },
    {
      name: "--lon",
      argLabel: "<n>",
      valueShape: "token",
      description: "The longitude, given with --lat, and taken over --location.",
    },
    {
      name: "--json",
      description: "Answer one JSON envelope rather than lines of tab-parted text.",
    },
  ],
  exclusions: [{ names: ["--location", "--lat"] }],
  exits: [
    { code: 0, meaning: "the reading was fetched and the verdict reported" },
    { code: 1, meaning: "the flags were bad, or the air-quality source was unreachable" },
  ],
  examples: [
    "ops tracking air-quality",
    "ops tracking air-quality --location provo --json",
    "ops tracking air-quality --lat 40.76 --lon -111.89",
  ],
} as const satisfies OpsCommand
