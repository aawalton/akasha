import { aggressive } from "akasha/temper/catalog/companion/trait/pages/aggressive/aggressive.temper-companion-trait.ts"
import { augmented } from "akasha/temper/catalog/companion/trait/pages/augmented/augmented.temper-companion-trait.ts"
import { bolstered } from "akasha/temper/catalog/companion/trait/pages/bolstered/bolstered.temper-companion-trait.ts"
import { focused } from "akasha/temper/catalog/companion/trait/pages/focused/focused.temper-companion-trait.ts"
import { noTrait } from "akasha/temper/catalog/companion/trait/pages/no-trait/no-trait.temper-companion-trait.ts"
import { prolific } from "akasha/temper/catalog/companion/trait/pages/prolific/prolific.temper-companion-trait.ts"
import { quickened } from "akasha/temper/catalog/companion/trait/pages/quickened/quickened.temper-companion-trait.ts"
import { shattering } from "akasha/temper/catalog/companion/trait/pages/shattering/shattering.temper-companion-trait.ts"
import { soothing } from "akasha/temper/catalog/companion/trait/pages/soothing/soothing.temper-companion-trait.ts"
import { vigorous } from "akasha/temper/catalog/companion/trait/pages/vigorous/vigorous.temper-companion-trait.ts"
import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

const UNORDERED: readonly TemperCompanionTrait[] = [
  noTrait,
  aggressive,
  augmented,
  bolstered,
  focused,
  prolific,
  quickened,
  shattering,
  soothing,
  vigorous,
]

export const COMPANION_TRAIT_PAGES: readonly TemperCompanionTrait[] = [...UNORDERED].sort(
  (a, b) => a.hashPlace - b.hashPlace
)
