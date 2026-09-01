import type { Finding } from "../finding.page-type.ts"

export const aPackageMovingIntoAkashaLosesItsName = {
  id: "01a05b5a-708f-7b6d-b612-fd624e3435f7",
  pageTypeSlug: "finding",
  slug: "a-package-moving-into-akasha-loses-its-name",
  domainSlug: "domain/akasha-migration",
  claim:
    "A package moving into akasha cannot keep its name. `node_modules/@shared` is one symlink to `../shared`, so every `@shared/*` name resolves by that package's folder standing under `shared/`. A package that moves under `akasha/` and keeps its name resolves to nothing until bun rebuilds that scope as a directory of per-package links. Each move is therefore also a rename, and every importer outside must be repointed in the same change.",
  evidence:
    "`ls -la node_modules/` shows `@shared -> ../shared` and `@alanwalton -> ../alanwalton`, each a single symlink standing for a whole scope, while `@akasha` is a real directory holding twenty per-package symlinks, among them `pages-system -> ../../akasha/pages-system`, `indexes -> ../../akasha/pages-system/indexes` and `pages-query -> ../../akasha/pages-system/pages-query`. Bun collapses a scope to one link only while every package of that scope sits in one folder, which is why `@akasha` is not collapsed and `@shared` is. The precedent stands in the log: `094d71b8a1` deleted `shared/pages-query`, the package was rebuilt at `akasha/pages-system/pages-query`, and `4ac3e05531` reads `@akasha/pages-query joins the workspaces, so its name resolves`; its manifest at `akasha/pages-system/pages-query/package.json:2` names it `@akasha/pages-query`. Counting importers standing outside `akasha/`, `@shared/pages-url` is named in 85 files, `@shared/pages-access` in 164, and `@shared/pages-ui-store` in 44. The rename cannot be proved before it lands, because proving it needs `bun install`, which rewrites the 731 KB `bun.lock` that five lanes are editing at once tonight.",
} as const satisfies Finding
