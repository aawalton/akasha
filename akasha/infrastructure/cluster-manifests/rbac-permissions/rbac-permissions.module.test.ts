import { expect, test } from "bun:test"
import {
  buildPermissions,
  isCovered,
  patchRuleWhitelist,
  tupleSet,
} from "./rbac-permissions.module.code.ts"

const unrestricted = { apiGroups: ["apps"], resources: ["deployments"], verbs: ["get", "patch"] }

const named = {
  apiGroups: ["rbac.authorization.k8s.io"],
  resources: ["clusterroles"],
  verbs: ["patch"],
  resourceNames: ["prometheus"],
}

test("a rule naming no resource name covers every object of that resource", () => {
  const perms = buildPermissions([unrestricted])
  expect(isCovered(perms, { apiGroup: "apps", resource: "deployments", verb: "get" })).toBe(true)
  expect(isCovered(perms, { apiGroup: "apps", resource: "deployments", verb: "delete" })).toBe(
    false
  )
})

test("a rule naming resource names covers only the objects it names", () => {
  const perms = buildPermissions([named])
  const req = { apiGroup: "rbac.authorization.k8s.io", resource: "clusterroles", verb: "patch" }
  expect(isCovered(perms, { ...req, resourceName: "prometheus" })).toBe(true)
  expect(isCovered(perms, { ...req, resourceName: "promtail" })).toBe(false)
  expect(isCovered(perms, req)).toBe(false)
})

test("skipNamed drops the triples a resourceNames rule restricts", () => {
  expect([...tupleSet([unrestricted, named], { skipNamed: true })]).toEqual([
    "apps|deployments|get",
    "apps|deployments|patch",
  ])
  expect(tupleSet([unrestricted, named], { skipNamed: false }).size).toBe(3)
})

test("the patch whitelist is the cluster-scoped rbac names a patch rule restricts itself to", () => {
  expect([...patchRuleWhitelist([unrestricted, named])]).toEqual(["prometheus"])
})
