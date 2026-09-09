import type { Page } from "../../../../pages/page.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { App } from "../../../../readouts/widgets/properties/app.relation-property.ts"
import type { BuildInputTreeHash } from "./properties/build-input-tree-hash.text-property.ts"
import type { BuildNumber } from "./properties/build-number.number-property.ts"
import type { CutAt } from "./properties/cut-at.instant-property.ts"
import type { MainSha } from "./properties/main-sha.text-property.ts"
import type { ShellSha } from "./properties/shell-sha.text-property.ts"

export type MobileCut = Page & {
  title: Title
  app: App
  buildNumber: BuildNumber
  mainSha: MainSha
  shellSha?: ShellSha
  buildInputTreeHash?: BuildInputTreeHash
  cutAt: CutAt
}
