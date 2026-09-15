import type { AppearanceExperimentDay } from "akasha/alan/style/appearance-experiment/properties/appearance-experiment-day.calendar-date-property.types.ts"
import type { AppearanceVerdict } from "akasha/alan/style/appearance-experiment/properties/appearance-verdict.select-property.types.ts"
import type { ExperimentPersona } from "akasha/alan/style/appearance-experiment/properties/experiment-persona.relation-property.types.ts"
import type { EyeRead } from "akasha/alan/style/appearance-experiment/properties/eye-read.file-property.types.ts"
import type { FeltRead } from "akasha/alan/style/appearance-experiment/properties/felt-read.file-property.types.ts"
import type { WhatTried } from "akasha/alan/style/appearance-experiment/properties/what-tried.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type AppearanceExperiment = Page & {
  title: Title
  persona: ExperimentPersona
  date: AppearanceExperimentDay
  verdict: AppearanceVerdict
  whatTried: WhatTried
  eyeRead: EyeRead
  feltRead: FeltRead
}
