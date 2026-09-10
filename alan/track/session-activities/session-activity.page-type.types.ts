import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Icon } from "../../../temper/things/properties/icon.text-property.ts"
import type { Seq } from "../daily/days/properties/seq.number-property.ts"
import type { DefaultDifficulty } from "./properties/default-difficulty.number-property.ts"

export type SessionActivity = Page & {
  title: Title
  defaultDifficulty: DefaultDifficulty
  icon?: Icon
  seq?: Seq
}
