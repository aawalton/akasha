import type { Finding } from "../finding.page-type.ts"

export const aTemperPackageHidItsOnlyTemperDependencyInDevDependencies = {
  id: "01a0607a-9cbd-7269-a290-d0b24204e2fc",
  pageTypeSlug: "finding",
  slug: "a-temper-package-hid-its-only-temper-dependency-in-dev-dependencies",
  domainSlug: "domain/temper",
  claim:
    "temper/shared-formula-framework names @temper/shared-foundation-misc-dungeons in devDependencies and carries a tsconfig reference to it, yet no file under src imports it. Reading dependencies alone says the package has no temper dependency; reading devDependencies alone says it has one that blocks the move. Neither is right. A package closure is the set of specifiers its own files import.",
  evidence:
    "temper/shared-formula-framework/package.json puts @akasha/day and @akasha/utils-narrow under dependencies and @temper/shared-foundation-misc-dungeons under devDependencies. tsconfig.json lists a reference to ../shared-foundation-misc-dungeons. Every from in the 37 files under src resolves to one of: a sibling in the package, @akasha/day/eso-day, @akasha/utils-narrow/assert-never, @akasha/utils-narrow/create-data-file or @akasha/utils-narrow/require-first. So the package was movable the whole time, and the declared dependency and the tsconfig reference are both stray. The same reading catches a phantom the other way: temper/game-companions-addon/package.json declares @temper/shared-formula-framework and no file under its src imports it.",
} as const satisfies Finding
