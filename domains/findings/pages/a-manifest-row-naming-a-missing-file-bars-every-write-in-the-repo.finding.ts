import type { Finding } from "../finding.page-type.ts"

export const aManifestRowNamingAMissingFileBarsEveryWriteInTheRepo = {
  id: "01a0636f-dd7e-779f-911b-1de124975801",
  pageTypeSlug: "finding",
  slug: "a-manifest-row-naming-a-missing-file-bars-every-write-in-the-repo",
  domainSlug: "domain/akasha",
  claim:
    "An ablation that deletes a module's files but leaves the export row naming them in its package's manifest is a repo-wide write barrier rather than a local defect. `a83c53629a` deleted both `file-detail-config` files from `@akasha/pages-access` and left `./file-detail-config` naming them. For the 107 seconds until `41661ecc0d` removed the row, akasha refused every write in the repository, including writes sharing no package with pages-access.",
  evidence:
    '`a83c53629a` (2026-09-02 12:28:58), "the detail config file reader nothing calls goes", deleted `akasha/pages-system/pages-access/file-detail-config/file-detail-config.module.code.ts` and its `.module.ts` page, leaving `./file-detail-config` in `akasha/pages-system/pages-access/package.json` naming the first of them. A write of six paths under `akasha/temper/temper-watcher`, sharing no package and no folder with pages-access, was refused at HEAD `64f707df1b` with: names `@akasha/pages-access/file-detail-config`, which lands on `akasha/pages-system/pages-access/file-detail-config/file-detail-config.module.code.ts`, where no file is \u2014 a way into a package lands on a file the change leaves there. `41661ecc0d` (12:30:45), "the way in to the detail config reader goes with the reader", removed the row; the identical write then passed at HEAD `5f77e21433`, five commits later. The barrier therefore lasted 1 minute 47 seconds while about twelve seats were landing concurrently, and it refused them on a package none of them had touched. The row and the files were added together by `387a8ccb47` on 09-01 and were consistent for a day; only the deletion parted them. `akasha remove` does not repoint manifest rows, so a files-only ablation leaves exactly this state behind, and the seat that lands it is not the seat that is refused. Retrying rather than reaching into another package\'s manifest was enough here because a sibling cleared it, but nothing guarantees that.',
} as const satisfies Finding
