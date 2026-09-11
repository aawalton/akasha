import type { Seq } from "akasha/alan/track/daily/days/properties/seq.number-property.types.ts"
import type { DefaultDifficulty } from "akasha/alan/track/session-activities/properties/default-difficulty.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"

export type SessionActivity = Page & {
  title: Title
  defaultDifficulty: DefaultDifficulty
  icon?: Icon
  seq?: Seq
}
