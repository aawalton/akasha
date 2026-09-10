import type { Page } from "../../../pages/page.page-type.ts"
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
