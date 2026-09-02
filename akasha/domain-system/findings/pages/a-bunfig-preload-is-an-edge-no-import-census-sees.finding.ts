import type { Finding } from "../finding.page-type.ts"

export const aBunfigPreloadIsAnEdgeNoImportCensusSees = {
  id: "01a06345-7ad4-7c09-bca9-82df0928c833",
  pageTypeSlug: "finding",
  slug: "a-bunfig-preload-is-an-edge-no-import-census-sees",
  domainSlug: "domain/temper",
  claim:
    "`temper/player-inventory-management-ui` reaches `shared/utils-test` from `bunfig.toml` rather than from any TypeScript file, so a census over its source calls the package clear while a workspace dependency and a tsconfig reference still land outside `akasha/`. That is the one bar left on the eight `-ui` packages, and `@shared/utils-test/setup/happydom` has no akasha twin.",
  evidence:
    'Measured at `245325b9b4`. Parsing all 143 tracked `.ts` and `.tsx` files of the eight leaves 0 import edges landing outside `akasha/` and outside the eight; the same instrument over `temper/web` finds 99, so a zero here is an answer rather than a silence. Auditing the eight manifests and tsconfigs instead of their sources leaves two things, both in one package: `devDependencies.@shared/utils-test` in `temper/player-inventory-management-ui/package.json`, and a reference to `../../shared/utils-test` in its `tsconfig.json`. Line 2 of `temper/player-inventory-management-ui/bunfig.toml` is `preload = ["@shared/utils-test/setup/happydom"]`, the only reach the eight make on that package. `shared/utils-test` is 8 tracked files, among them `src/render.ts`, `src/component-dom-guard.ts` and `src/setup/happydom.ts`, and nothing under `akasha/` exports a happydom setup. The four `@shared/pages-ui` dependencies and five tsconfig references the eight also carried were reached by no file of theirs and were taken away at `726dc4ffa1`, after which the eight typecheck at 0 errors over the same 143 own files.',
} as const satisfies Finding
