import type { AppearanceExperimentDay } from "akasha/alan/style/appearance-experiments/properties/appearance-experiment-day.calendar-date-property.types.ts"
import type { AppearanceVerdict } from "akasha/alan/style/appearance-experiments/properties/appearance-verdict.select-property.types.ts"
import type { ExperimentPersona } from "akasha/alan/style/appearance-experiments/properties/experiment-persona.relation-property.types.ts"
import type { EyeRead } from "akasha/alan/style/appearance-experiments/properties/eye-read.file-property.types.ts"
import type { FeltRead } from "akasha/alan/style/appearance-experiments/properties/felt-read.file-property.types.ts"
import type { WhatTried } from "akasha/alan/style/appearance-experiments/properties/what-tried.file-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type AppearanceExperiment = Page & {
  title: Title
  persona: ExperimentPersona
  date: AppearanceExperimentDay
  verdict: AppearanceVerdict
  whatTried: WhatTried
  eyeRead: EyeRead
  feltRead: FeltRead
}
