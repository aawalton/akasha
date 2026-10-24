import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { sinceCommit } from "akasha/command/pages/deploy/modules/check-judging/deploy-check-judging.module.code.ts"
import { commitAt } from "akasha/command/pages/deploy/modules/commit-naming/deploy-commit-naming.module.code.ts"
import {
  commitRecordedIn,
  keepingFor,
} from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import { kindNamed } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { inCluster } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import { upAlreadyAt } from "akasha/infrastructure/service/akasha-service/modules/deploy-wanting/deploy-wanting.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export function saidOfUnchanged(slug: string, at: string): string {
  return `already\t${slug}\tup at ${at}, and no file it is built from changed since`
}

export async function unchangedSince(
  slug: string,
  named: boolean,
  given: Given,
  recording?: Fetcher,
  cluster: boolean = inCluster()
): Promise<readonly string[] | null> {
  if (named || cluster) return null
  const commit = commitAt(given.root, null)
  if (commit === null) return null
  const read = kindNamed(pagesAt(given.root, commit), slug)
  if ("refused" in read) return null
  const keeping = keepingFor(given.root, read.kind, recording)
  const was = sinceCommit(given.root, await commitRecordedIn(read.pagePath, keeping))
  const at = upAlreadyAt(given.root, slug, read, was, commit)
  return at === null ? null : [`commit\t${commit}`, saidOfUnchanged(slug, at)]
}
