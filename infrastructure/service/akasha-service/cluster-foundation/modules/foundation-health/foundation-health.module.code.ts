import { foundationNamed } from "akasha/infrastructure/service/akasha-service/cluster-foundation/modules/foundation-applying/foundation-applying.module.code.ts"
import {
  planFor,
  type Ran,
  runKubectlOn,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"
import type { Verdict } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-wellness/service-wellness.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const CLUSTER_FOUNDATION_TYPE = "cluster-foundation"

const DOCUMENT_BREAK = "\n---\n"

export const PRESENCE_ASKED: readonly string[] = ["get", "-f", "-", "--output", "name"]

export type AskedOn = (argv: readonly string[], text: string) => Ran

type Emitted = { readonly yaml: string } | { readonly why: string }

export function presenceBrokenIn(ran: Ran): string | null {
  if (ran.code === 0) return null
  const said = ran.stderr
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
  return said.length > 0 ? said.join("; ") : `kubectl ${ran.argv.join(" ")} exited ${ran.code}`
}

async function emittedBy(root: string, slug: string): Promise<Emitted> {
  const read = foundationNamed(root, slug)
  if ("refused" in read) return { why: read.refused }
  const yaml: string[] = []
  for (const one of read.foundation.grounding) {
    const plan = await planFor(root, null, one.synthPath)
    if (typeof plan === "string") return { why: plan }
    for (const manifest of plan.manifests) yaml.push(manifest.yaml)
  }
  return { yaml: yaml.join(DOCUMENT_BREAK) }
}

export async function foundationHealthFor(
  root: string,
  ask: AskedOn = runKubectlOn
): Promise<readonly Verdict[]> {
  const verdicts: Verdict[] = []
  for (const one of valuesOfType(root, CLUSTER_FOUNDATION_TYPE)) {
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const emitted = await emittedBy(root, said.slug)
    const broken =
      "why" in emitted
        ? `its manifests could not be made: ${emitted.why}`
        : presenceBrokenIn(ask(PRESENCE_ASKED, emitted.yaml))
    verdicts.push({ slug: said.slug, pagePath: one.path, broken })
  }
  return verdicts
}
