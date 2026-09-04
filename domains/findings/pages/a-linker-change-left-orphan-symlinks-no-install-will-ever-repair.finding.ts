import type { Finding } from "../finding.page-type.ts"

export const aLinkerChangeLeftOrphanSymlinksNoInstallWillEverRepair = {
  id: "01a05cc3-f730-76f9-85a0-f8929ccf6329",
  pageTypeSlug: "finding",
  slug: "a-linker-change-left-orphan-symlinks-no-install-will-ever-repair",
  domainSlug: "domain/akasha-check",
  claim:
    "Switching the workspace to the hoisted linker orphaned every per-package `node_modules/<dep>` symlink an earlier isolated install had written. A hoisted install does not manage those entries, so `bun install` reports no changes and leaves them dangling forever, while each one shadows the resolution that would otherwise succeed. 190 packages could not resolve `typescript` at all. 260 such orphans still stand.",
  evidence:
    '`bunfig.toml` states `linker = "hoisted"`. Under it `node_modules/typescript` is a real directory at 5.9.3 and `node_modules/.bun/` is dead weight from an isolated install dated Aug 26-27. 190 packages held `node_modules/typescript -> ../../../node_modules/.bun/typescript@5.9.3/node_modules/typescript`, every one dangling, plus 382 dangling `.bin/tsc` and `.bin/tsserver` pointing through them. `bun install --frozen-lockfile` answered `Checked 1058 installs across 1153 packages (no changes)` and left all 832 dangling links untouched, so no install repairs this. Every typescript range declared anywhere in the workspace is 5.x — 190 at `^5.8.3`, 5 at `5.9.3`, 3 at `^5.9.3`, 1 at `^5.7.3` — and `bun.lock` resolves `typescript@5.9.3`. Nothing declares typescript 7; the `typescript@7.0.2` in the store is a dependency of `@typescript/native-preview`, a different package, left by `bunx`. So there was no version bump to reconcile: deleting the orphans restores resolution to the 5.9.3 the lockfile already names. I deleted the 572 typescript-class orphans and `typescript` now resolves at 5.9.3 from every package. 34 of the 88 cluster checks had been dying at module load with `ENOENT reading .../node_modules/typescript` before any check logic ran; 0 do now. The remaining 260 orphans name moved workspace packages — 53 `utils-narrow`, 16 `errors-core`, 15 `pages-access` and others — and belong to migrations still in flight, so I left them. They will bite the same way.',
} as const satisfies Finding
