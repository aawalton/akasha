import type { BuildInputTreeHash } from "akasha/alan/harness/mobile-cli/mobile-cuts/properties/build-input-tree-hash.text-property.types.ts"
import type { BuildNumber } from "akasha/alan/harness/mobile-cli/mobile-cuts/properties/build-number.number-property.types.ts"
import type { CutAt } from "akasha/alan/harness/mobile-cli/mobile-cuts/properties/cut-at.instant-property.types.ts"
import type { MainSha } from "akasha/alan/harness/mobile-cli/mobile-cuts/properties/main-sha.text-property.types.ts"
import type { ShellSha } from "akasha/alan/harness/mobile-cli/mobile-cuts/properties/shell-sha.text-property.types.ts"
import type { App } from "akasha/alan/harness/readouts/widgets/properties/app.relation-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type MobileCut = Page & {
  title: Title
  app: App
  buildNumber: BuildNumber
  mainSha: MainSha
  shellSha?: ShellSha
  buildInputTreeHash?: BuildInputTreeHash
  cutAt: CutAt
}
