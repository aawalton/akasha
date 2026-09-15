import type { BuildInputTreeHash } from "akasha/alan/harness/mobile-cli/mobile-cut/properties/build-input-tree-hash.text-property.types.ts"
import type { BuildNumber } from "akasha/alan/harness/mobile-cli/mobile-cut/properties/build-number.number-property.types.ts"
import type { CutAt } from "akasha/alan/harness/mobile-cli/mobile-cut/properties/cut-at.instant-property.types.ts"
import type { MainSha } from "akasha/alan/harness/mobile-cli/mobile-cut/properties/main-sha.text-property.types.ts"
import type { ShellSha } from "akasha/alan/harness/mobile-cli/mobile-cut/properties/shell-sha.text-property.types.ts"
import type { App } from "akasha/alan/harness/readout/widget/properties/app.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type MobileCut = Page & {
  title: Title
  app: App
  buildNumber: BuildNumber
  mainSha: MainSha
  shellSha?: ShellSha
  buildInputTreeHash?: BuildInputTreeHash
  cutAt: CutAt
}
