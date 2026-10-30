import type { DefaultDifficulty } from "akasha/alan/track/session-activity/properties/default-difficulty.number-property.types.ts"
import type { Term } from "akasha/domain/plain-language/standard-agent-english/term/term.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type SessionActivity = Term & {
  title: Title
  defaultDifficulty: DefaultDifficulty
}
