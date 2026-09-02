import type { Finding } from "../finding.page-type.ts"

export const theImportCensusOfTemperWebCountedOnlyDottedPaths = {
  id: "01a0643c-2ced-7c31-bd6f-9c5f73621401",
  pageTypeSlug: "finding",
  slug: "the-import-census-of-temper-web-counted-only-dotted-paths",
  domainSlug: "domain/temper",
  claim:
    "The census that told four migrating seats their imports were already akasha and that most files needed no repointing counted `./` and `../` specifiers and missed the `@/` alias. Sixty files in one seat's scope alone carried 45 distinct `@/` specifiers across 63 import sites, every one of which had to be repointed by hand.",
  evidence:
    "Measured 2026-09-02 across `temper/web/app/components`. The briefing given to this seat said 35 relative imports exist across the whole tree and that `~/` appears in none of them. Both are true and neither is the load. The alias in use is `@/`, mapped at the web package root, and it is how a temper component reaches anything outside its own folder.\n\nIn this seat's 60 files: 5 specifiers spelled `./`, 0 spelled `../`, and 63 spelled `@/`. The `@/` ones broke into `@/components/<group>/<name>` for sibling components, `@/lib/*` for four landed modules, `@/hooks/*` for two, and `@/app/import/actions` for one. None of them resolve under akasha.\n\nThe cost was not the repointing, which a script did. The cost is that the census reported the tree as nearly clean when it was nearly all work, and a seat trusting it would have written the module pages first and discovered the import graph at the gate.\n\nWhat a census of specifiers has to do is enumerate what a resolver would enumerate, which means reading the alias table out of the tsconfig rather than matching on a leading dot. The cheap check is to count `from \"` sites and subtract the ones a package name explains; anything left over is an alias.",
} as const satisfies Finding
