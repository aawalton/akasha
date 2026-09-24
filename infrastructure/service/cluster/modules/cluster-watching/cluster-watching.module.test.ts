import { expect, test } from "bun:test"
import {
  ownPageIn,
  sayingOf,
  ticking,
} from "akasha/infrastructure/service/cluster/modules/cluster-watching/cluster-watching.module.code.ts"

const WELL = { slug: "held-web", pagePath: "pages/held-web.service-cluster.ts", broken: null }

const BROKE = {
  slug: "held-sweep",
  pagePath: "pages/held-sweep.service-cluster.ts",
  broken: "CronJob held/sweep is not in the cluster",
}

test("a run says each verdict it wrote, with why a broken one is broken", () => {
  expect(sayingOf([WELL, BROKE], ["held-web", "held-sweep"])).toEqual([
    "held-web is well",
    "held-sweep is broken: CronJob held/sweep is not in the cluster",
  ])
})

test("a run says nothing of a verdict it left as it was", () => {
  expect(sayingOf([WELL, BROKE], [])).toEqual([])
})

test("a cluster that will not answer ends the run rather than leaving any verdict", () => {
  expect(() =>
    ticking({
      root: process.cwd(),
      now: new Date("2026-09-24T18:32:10.000Z"),
      ask: () => ({ argv: ["get"], code: 1, stdout: "", stderr: "refused" }),
    })
  ).toThrow("the cluster could not be read, so nothing is judged: kubectl get exited 1: refused")
})

test("the run's own page is the workstation service page carrying its slug", () => {
  expect(ownPageIn(process.cwd())).toEndWith("cluster-watching.service-workstation.ts")
})
