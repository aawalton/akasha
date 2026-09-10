import type { Finding } from "../finding.page-type.types.ts"

export const foldingAPackageMoreThanAFewHundredBodiesReachRunsPastTheApplyCeiling = {
  id: "01a088aa-70c3-7546-9642-ed970139de37",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "folding-a-package-more-than-a-few-hundred-bodies-reach-runs-past-the-apply-ceiling",
  domain: "domain/change",
  claim:
    "A package too many bodies reach cannot be folded into the root, because the one landing that respells every body runs past the ceiling `akasha change apply` allows.",
  evidence:
    "`remove-package-manifest` at `utils/package.json` drafted 613 changed bodies, and `akasha change apply` was killed at the 120 seconds its page allows, writing nothing. The folds that landed the same day carried 91 bodies (`change`), 142 (`domain`), 21 (`plain-language`), 33 (`agent`) and 17 (`editor-extension`). `@akasha/code` is reached by 5291 bodies. A fold answers every edit as one change and lands them together or not at all, so there is no way to carry a fold in parts.",
} as const satisfies Finding
