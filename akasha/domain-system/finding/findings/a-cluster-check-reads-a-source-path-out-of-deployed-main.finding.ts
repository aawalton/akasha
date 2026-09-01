import type { Finding } from "../finding.page-type.ts"

export const aClusterCheckReadsASourcePathOutOfDeployedMain = {
  id: "01a05c94-17cd-7054-b1e9-95e02950110e",
  pageTypeSlug: "finding",
  slug: "a-cluster-check-reads-a-source-path-out-of-deployed-main",
  domainSlug: "domain/alan-harness",
  claim:
    "`check-workspaces-mainseam` reads a source path out of deployed `main` with `git show FETCH_HEAD:$SEAM_PATH`, so moving the file that path names breaks the check from the moment the move lands until the branch reaches `main`. Nothing in the repository says that a red result there can mean the branch is simply ahead, and every akasha move touching a path this check names has the same shape.",
  evidence:
    'Met moving `shared/workspace-paths` into akasha. Line 22 of `infra/cluster-checks/src/checks/check-workspaces-mainseam.ts` held `const SEAM_PATH = "shared/workspace-paths/src/index.ts"` and now holds `akasha/workspace-paths/workspace-dirs/workspace-dirs.module.code.ts`.\n\nThe check fetches `main` and reads that path out of it, so what it compares the working tree against is what is deployed rather than the tree it is running in. Between the move landing and the branch reaching `main` the read finds nothing, and the check fails over a file standing perfectly well beside it. It goes green again on a push and on nothing else, which makes it read as a real failure to anyone who did not make the move.\n\nTwo ways out. Read the seam out of the tree the check runs in, which is what every other check here does. Or hold the old path and the new one together and pass where either resolves, dropping the old once `main` carries the new. The second keeps whatever the check was guarding against across the move; the first drops it.\n\nNamed in commit 78be0e3bbc, which moved the path, and written down here.',
} as const satisfies Finding
