import { expect, test } from "bun:test"
import { webAppSourceKeys } from "akasha/infrastructure/cluster/manifest/modules/orphan-resource-audit/orphan-resource-audit.module.code.ts"
import {
  deployableNamed,
  WEB_APP_TYPE,
  type Workload,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.code.ts"
import {
  readingIn,
  slugsOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const ROOT = akashaRoot()

const KEYS = [...webAppSourceKeys(ROOT)]

function deployedFromAFile(): readonly Workload[] {
  const pages = readingIn(ROOT)
  return slugsOfType(pages, WEB_APP_TYPE).flatMap((slug) => {
    const read = deployableNamed(pages, slug)
    if ("refused" in read || read.deployable.manifestsPath === null) return []
    return [read.deployable.workload]
  })
}

test("a web app deployed from its manifests file has its workload counted as sourced", () => {
  const workloads = deployedFromAFile()
  expect(workloads.length).toBeGreaterThan(0)
  for (const one of workloads) expect(KEYS).toContain(`${one.kind}/${one.namespace}/${one.name}`)
})

test("the Service a web app's manifests file puts up beside its workload is counted as sourced", () => {
  for (const one of deployedFromAFile()) {
    expect(KEYS).toContain(`Service/${one.namespace}/${one.name}`)
  }
})

test("the alanwalton web app, the first reported as an orphan, is counted as sourced", () => {
  expect(KEYS).toContain("Deployment/alanwalton/web")
  expect(KEYS).toContain("Service/alanwalton/web")
})
