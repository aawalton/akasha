import type { Finding } from "../finding.page-type.ts"

export const aPackageTypecheckConfigHasNoPageType = {
  id: "01a06039-93e3-7761-a2c5-61068b3f330c",
  pageTypeSlug: "finding",
  slug: "a-package-typecheck-config-has-no-page-type",
  domainSlug: "domain/temper",
  claim:
    "Every one of temper's 152 packages carries a `tsconfig.json`, and akasha carries none. A workspace package's only named file is `package.json`, so a `tsconfig.json` beside a package page is a file no page answers for and `file-has-its-page` refuses it. Temper's configs are not decoration: each names the sibling packages it builds against, which is how 153 packages typecheck incrementally.",
  evidence:
    "`git ls-files temper` answers 152 paths ending `tsconfig.json`. Tallying `git ls-files akasha` by extension answers 96 `.json`, of which 90 are `package.json` and the rest are two capacitor configs and four completion files — no tsconfig. akasha/code-system/workspace-package/workspace-package.page-type.ts declares one property, `manifest`, and akasha/code-system/workspace-package/properties/manifest.named-file-property.ts fixes its name to `package.json`. akasha/day and akasha/geo-io each hold exactly one json file, their package.json. temper/game-codec/tsconfig.json is typical: it extends ../../tsconfig.base.json, sets composite, emitDeclarationOnly and declarationDir, and names ten `references` paths. The pathfinder package akasha/temper/temper-dungeons landed with no tsconfig at all and 37 checks judged it without refusing, so akasha's own packages evidently typecheck from the root config — which means the 152 configs are dropped rather than carried, and whatever incremental build they bought is dropped with them.",
} as const satisfies Finding
