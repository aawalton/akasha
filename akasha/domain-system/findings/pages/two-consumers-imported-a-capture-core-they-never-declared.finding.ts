import type { Finding } from "../finding.page-type.ts"

export const twoConsumersImportedACaptureCoreTheyNeverDeclared = {
  id: "01a06093-3559-7fb0-8f50-5c0e6a3ce096",
  pageTypeSlug: "finding",
  slug: "two-consumers-imported-a-capture-core-they-never-declared",
  domainSlug: "domain/temper",
  claim:
    "`temper/scripts` and `tools/lib` both imported `@temper/shared-capture-errors-core/types` while declaring no dependency on it. Node found the package in the hoisted `node_modules`, and the root tsconfig reference to the source folder kept the typecheck legal. Reading manifests would have found neither importer. A grep for the specifier found both, which is the only reason the errors core could be deleted without quietly breaking two workspaces.",
  evidence:
    "Measured on 2026-09-01 while tearing down `temper/shared-capture-errors-core`.\n\nA grep for the specifier across every tracked file returned five importers. Three sat inside packages that declared the dependency, under `temper/shared-capture-errors-addon` and `temper/shared-capture-errors-decision-core`. Two did not.\n\n`temper/scripts/src/watcher/import-errors.ts:9` and `temper/scripts/src/watcher/import-errors-decide.ts:3` each import `ErrorEntry` from `@temper/shared-capture-errors-core/types`. The `temper/scripts` manifest declared `@temper/shared-capture-errors-decision-core` and reached the errors core through it, and the root `tsconfig.json` carried a reference to `./temper/shared-capture-errors-core` at line 208, which is what made the two imports typecheck. `temper/scripts` now declares `@akasha/temper-capture-errors` outright.\n\n`tools/lib/temper-errors-code.ts:3` imports the same type. `tools/lib/package.json` carries no `dependencies` field at all, while files under `tools/lib` name fifty-five distinct `@akasha/*` packages the same way, `@akasha/agents`, `@akasha/pages-core` and `@akasha/file-system` among them. One declaration added there would have been the odd one out, so the specifier was repointed and the manifest was left alone.\n\nDropping the root reference is what would have surfaced the `temper/scripts` pair as `TS6059` had the repoint come later. It was dropped in the same change as the repoint, and the whole tree typechecked afterwards with only the pre-existing `temper/web` react-router failure left.",
} as const satisfies Finding
