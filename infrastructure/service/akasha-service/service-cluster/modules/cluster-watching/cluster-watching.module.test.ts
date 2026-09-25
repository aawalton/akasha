import { expect, test } from "bun:test"
import { ticking } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/cluster-watching/cluster-watching.module.code.ts"

test("a cluster that will not answer ends the run rather than leaving any verdict", async () => {
  const asked: string[] = []
  await expect(
    ticking({
      root: process.cwd(),
      now: new Date("2026-09-24T18:32:10.000Z"),
      ask: () => ({ argv: ["get"], code: 1, stdout: "", stderr: "refused" }),
      askOn: (argv) => {
        asked.push(argv.join(" "))
        return { argv, code: 0, stdout: "", stderr: "" }
      },
      fetched: (url) => {
        asked.push(url)
        return Promise.resolve({ status: 200 })
      },
    })
  ).rejects.toThrow(
    "the cluster could not be read, so nothing is judged: kubectl get exited 1: refused"
  )
  expect(asked).toEqual([])
})
