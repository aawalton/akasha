import { describe, expect, test } from "bun:test"
import { manifestClosureOf, markFor } from "./closure.ts"
import type { Manifest, Plan } from "../deploy/deploy.ts"
import type { ClusterService } from "../service/service.ts"

const AKASHA = "/repo"

const SERVICE: ClusterService = {
  where: "cluster",
  slug: "pod-janitor",
  title: "Pod janitor",
  resourceKind: "CronJob",
  namespace: "pod-janitor",
  resourceName: "pod-janitor",
}

function manifest(name: string, yaml: string): Manifest {
  return { name, path: `${AKASHA}/infra/${name}/generated/${name}.generated.yaml`, yaml, workloads: [] }
}

function planOf(manifests: readonly Manifest[]): Plan {
  return { service: SERVICE, synthPath: `${AKASHA}/infra/synth.ts`, manifests }
}

describe("manifestClosureOf", () => {
  test("names one input per manifest, at a path relative to the repository", () => {
    const closure = manifestClosureOf(AKASHA, planOf([manifest("one", "a: 1"), manifest("two", "b: 2")]))
    expect(closure.map((input) => input.path)).toEqual([
      "infra/one/generated/one.generated.yaml",
      "infra/two/generated/two.generated.yaml",
    ])
  })

  test("gives one body one oid, whatever manifest carries it", () => {
    const [one] = manifestClosureOf(AKASHA, planOf([manifest("one", "a: 1")]))
    const [other] = manifestClosureOf(AKASHA, planOf([manifest("two", "a: 1")]))
    expect(one?.oid).toBe(other?.oid)
  })
})

describe("markFor", () => {
  test("is the same mark for the same manifests", () => {
    const manifests = [manifest("one", "a: 1"), manifest("two", "b: 2")]
    expect(markFor(AKASHA, planOf(manifests))).toBe(markFor(AKASHA, planOf([...manifests])))
  })

  test("moves where a body moves", () => {
    expect(markFor(AKASHA, planOf([manifest("one", "a: 1")]))).not.toBe(
      markFor(AKASHA, planOf([manifest("one", "a: 2")]))
    )
  })

  test("moves where only a path moves", () => {
    expect(markFor(AKASHA, planOf([manifest("one", "a: 1")]))).not.toBe(
      markFor(AKASHA, planOf([manifest("two", "a: 1")]))
    )
  })

  test("moves where a manifest is added", () => {
    expect(markFor(AKASHA, planOf([manifest("one", "a: 1")]))).not.toBe(
      markFor(AKASHA, planOf([manifest("one", "a: 1"), manifest("two", "b: 2")]))
    )
  })

  test("holds still where the manifests are given in another order", () => {
    const one = manifest("one", "a: 1")
    const two = manifest("two", "b: 2")
    expect(markFor(AKASHA, planOf([one, two]))).toBe(markFor(AKASHA, planOf([two, one])))
  })

  test("moves where another service emits the same manifests", () => {
    const manifests = [manifest("one", "a: 1")]
    const other: Plan = {
      service: { ...SERVICE, slug: "other" },
      synthPath: `${AKASHA}/infra/synth.ts`,
      manifests,
    }
    expect(markFor(AKASHA, planOf(manifests))).not.toBe(markFor(AKASHA, other))
  })
})
