import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { AppearanceExperimentDay } from "./properties/appearance-experiment-day.calendar-date-property.ts"
import type { AppearanceVerdict } from "./properties/appearance-verdict.select-property.ts"
import type { ExperimentPersona } from "./properties/experiment-persona.relation-property.ts"
import type { EyeRead } from "./properties/eye-read.file-property.ts"
import type { FeltRead } from "./properties/felt-read.file-property.ts"
import type { WhatTried } from "./properties/what-tried.file-property.ts"

export type AppearanceExperiment = Page & {
  title: Title
  persona: ExperimentPersona
  date: AppearanceExperimentDay
  verdict: AppearanceVerdict
  whatTried: WhatTried
  eyeRead: EyeRead
  feltRead: FeltRead
}

export const appearanceExperiment = {
  id: "01a06826-794a-7da2-8027-9f143d989e3d",
  pageTypeSlug: "page-type",
  slug: "appearance-experiment",
  definition: "one thing Alan tried wearing and how it read",
  pluralSlug: "appearance-experiments",
  extends: ["page-type/page"],
  partSlugs: [
    "calendar-date-property/appearance-experiment-day",
    "file-property/eye-read",
    "file-property/felt-read",
    "file-property/what-tried",
    "relation-property/experiment-persona",
    "select-property/appearance-verdict",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "relation-property/experiment-persona", required: true, many: false },
    {
      pagePropertySlug: "calendar-date-property/appearance-experiment-day",
      required: true,
      many: false,
    },
    { pagePropertySlug: "select-property/appearance-verdict", required: true, many: false },
    { pagePropertySlug: "file-property/what-tried", required: true, many: false },
    { pagePropertySlug: "file-property/eye-read", required: true, many: false },
    { pagePropertySlug: "file-property/felt-read", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An experiment is one thing put on rather than a whole day's dress.",
    },
    {
      invariantKind: "departure",
      statement: "An experiment names the persona who read the experiment rather than Alan.",
    },
    {
      invariantKind: "departure",
      statement:
        "How a try read to the persona and how that try landed on Alan are kept as two separate readings.",
    },
    {
      invariantKind: "departure",
      statement:
        "An experiment ends in a verdict of keeping or tweaking or dropping the appearance.",
    },
    {
      invariantKind: "departure",
      statement: "Shaestrel's persona points are counted from these experiments.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each reading is in a file beside the experiment rather than inside the experiment page.",
    },
  ],
} as const satisfies PageType
