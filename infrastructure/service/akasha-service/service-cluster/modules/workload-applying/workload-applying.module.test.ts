import { afterAll, expect, test } from "bun:test"
import {
  SYNTH_AT,
  seededWorld,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.test-fixtures.ts"
import {
  placingBetween,
  saidOfPlacing,
  servableNamed,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-applying/workload-applying.module.code.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

test("a slug no cluster service page carries is read as no workload", () => {
  const read = servableNamed(WORLD.root, "no-such-service-here")

  expect(read).toHaveProperty("refused")
})

test("a slug no cluster service page carries is refused by naming that slug", () => {
  const read = servableNamed(WORLD.root, "no-such-service-here")

  expect("refused" in read ? read.refused : "").toContain("no-such-service-here")
})

const DEMANDING = [
  "apiVersion: apps/v1",
  "kind: Deployment",
  "metadata:",
  "  name: web",
  "  namespace: one",
  "spec:",
  "  template:",
  "    spec:",
  "      containers:",
  "        - name: web",
  "          env:",
  "            - name: TOKEN",
  "              valueFrom:",
  "                secretKeyRef:",
  "                  name: cloudflare-api-token",
  "                  key: api-token",
  "",
].join("\n")

const DEMANDING_PLAN = {
  workload: { kind: "Deployment", name: "web", namespace: "one" },
  synthPath: SYNTH_AT,
  manifests: [
    {
      name: "web-deployment",
      path: "one/web/generated/web-deployment.generated.yaml",
      yaml: DEMANDING,
      kind: "Deployment",
      resourceName: "web",
      namespace: "one",
    },
  ],
}

test("a secret placed is reported by the keys the Secret carries", () => {
  const said = saidOfPlacing({
    placed: [{ name: "gotrue-secrets", keys: ["DATABASE_URL", "GOTRUE_JWT_KEYS"] }],
    unplaced: [],
    consulted: 2,
    ran: [],
  })

  expect(said).toEqual(["secret\tgotrue-secrets\tDATABASE_URL, GOTRUE_JWT_KEYS"])
})

test("a demand no secret page answers is reported rather than refused", () => {
  const said = saidOfPlacing({
    placed: [],
    unplaced: [{ name: "pipeline-engine-secrets", key: "CLOUDFLARE_API_TOKEN" }],
    consulted: 1,
    ran: [],
  })

  expect(said[0]).toContain("pipeline-engine-secrets")
  expect(said[0]).toContain("CLOUDFLARE_API_TOKEN")
  expect(said[0]).toContain("no secret page")
})

test("a demand the pages answer with nothing places no secret and refuses nothing", () => {
  const report: string[] = []

  const ran = placingBetween(WORLD.root, report)(DEMANDING_PLAN)

  expect(ran).toEqual([])
  expect(report).toHaveLength(1)
  expect(report[0]).toContain("cloudflare-api-token")
  expect(report[0]).toContain("api-token is answered by no secret page")
})
