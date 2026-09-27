import { expect, test } from "bun:test"
import { NO_CODE } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  foundationHealthFor,
  PRESENCE_ASKED,
  PRESENCE_AT_MOST_MS,
  presenceBrokenIn,
} from "akasha/infrastructure/service/akasha-service/cluster-foundation/modules/foundation-health/foundation-health.module.code.ts"
import type { Ran } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"

const HELD: Ran = { argv: PRESENCE_ASKED, code: 0, stdout: "namespace/temper\n", stderr: "" }

const LACKING: Ran = {
  argv: PRESENCE_ASKED,
  code: 1,
  stdout: "namespace/temper\n",
  stderr:
    'Error from server (NotFound): namespaces "audhdalan" not found\n' +
    'Error from server (NotFound): clusterissuers.cert-manager.io "letsencrypt-prod" not found\n',
}

test("a foundation whose every resource the cluster holds is well", () => {
  expect(presenceBrokenIn(HELD)).toBe(null)
})

test("a foundation the cluster lacks part of is broken with each thing the cluster said it lacks", () => {
  expect(presenceBrokenIn(LACKING)).toBe(
    'Error from server (NotFound): namespaces "audhdalan" not found; ' +
      'Error from server (NotFound): clusterissuers.cert-manager.io "letsencrypt-prod" not found'
  )
})

test("a cluster refusing with nothing said is broken with how kubectl exited", () => {
  expect(presenceBrokenIn({ ...LACKING, stderr: "" })).toBe(
    "kubectl get -f - --output name exited 1"
  )
})

test("a cluster answering nothing within the bound is broken, named as killed", () => {
  expect(presenceBrokenIn({ ...LACKING, code: NO_CODE, stderr: "" })).toBe(
    `kubectl get -f - --output name was killed after ${PRESENCE_AT_MOST_MS / 1000}s and said nothing`
  )
})

test("every foundation page is asked after once, handed every manifest the page names", async () => {
  const handed: string[] = []
  const health = await foundationHealthFor(process.cwd(), (argv, text) => {
    handed.push(text)
    return { ...HELD, argv }
  })
  const one = health.find((verdict) => verdict.slug === "cluster-foundations")
  expect(one?.broken).toBe(null)
  expect(one?.pagePath).toEndWith("cluster-foundations.cluster-foundation.ts")
  expect(handed.length).toBe(health.length)
  expect(handed.join("")).toContain("kind: Namespace")
  expect(handed.join("")).toContain("kind: ClusterIssuer")
})

test("a foundation page is left carrying what the cluster said it lacks", async () => {
  const health = await foundationHealthFor(process.cwd(), () => LACKING)
  const one = health.find((verdict) => verdict.slug === "cluster-foundations")
  expect(one?.broken).toContain('namespaces "audhdalan" not found')
})
