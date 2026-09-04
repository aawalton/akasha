import type { Finding } from "../finding.page-type.ts"

export const temperSortsPackagesByAFunctionalTypeAkashaDoesNotCarry = {
  id: "01a06039-93e3-76d6-96fc-6a1a2e92a8e3",
  pageTypeSlug: "finding",
  slug: "temper-sorts-packages-by-a-functional-type-akasha-does-not-carry",
  domainSlug: "domain/temper",
  claim:
    "Every temper package states a `functionalType` in its manifest — addon 70, pure 61, io 13, next-ui 8, service 1 — and akasha's workspace-package page type carries nothing that says it. The value is what tells a reader whether a package may touch the disk, and losing it loses the only declared line between an addon package the game sandboxes and a package that opens files.",
  evidence:
    'Reading the 153 package.json files under `temper/` for `functionalType` answers addon 70, pure 61, io 13, next-ui 8 and service 1, with 153 of 153 stating one. temper/game-codec/package.json states `"functionalType": "pure"`; temper/shared-build-deploy-tstl states `io`; temper/shared-addon-libraries-lib-zone states `addon`. akasha/code-system/workspace-package/workspace-package.page-type.ts declares exactly one property, `manifest`, and its eight invariants are all about what the manifest names — nothing about what a package may reach for. akasha/code-system/module/module.page-type.ts declares `code`, `test` and `test-fixtures` and nothing else. So the value has no home on either the package page or the module page. It is not obviously worth a property either: `addon` is now said by the `eso-addon` page type, `next-ui` by whether a module\'s code is `tsx`, and `service` by the service page types, which would leave `pure` against `io` as the only fact needing a new property. Filed rather than decided.',
} as const satisfies Finding
