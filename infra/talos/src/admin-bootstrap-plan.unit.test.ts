import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, test } from "bun:test"
import { workloadClassMemberKey } from "@infra/k8s-types/hostnames"
import {
  type ApplyFileStep,
  type ApplyGeneratedStep,
  buildAdminBootstrapPlan,
  type PatchNodeSelectorStep,
} from "./admin-bootstrap-plan"

function applyFiles(plan = buildAdminBootstrapPlan()): readonly ApplyFileStep[] {
  return plan.steps.filter((s): s is ApplyFileStep => s.kind === "apply-file")
}

function patches(plan = buildAdminBootstrapPlan()): readonly PatchNodeSelectorStep[] {
  return plan.steps.filter((s): s is PatchNodeSelectorStep => s.kind === "patch-nodeselector")
}

describe("buildAdminBootstrapPlan", () => {
  test("applies the five native manifests in dependency order", () => {
    const paths = applyFiles().map((s) => s.manifestPath)
    expect(paths).toEqual([
      "packages/infra/k8s/src/metallb/k8s/metallb-native.yaml",
      "packages/infra/k8s/src/cert-manager/k8s/cert-manager-native.yaml",
      "packages/infra/k8s/src/cloudnative-pg/k8s/cloudnative-pg-native.yaml",
      "packages/infra/k8s/src/cloudnative-pg/k8s/plugin-barman-cloud.yaml",
      "packages/infra/k8s/src/metrics-server/k8s/metrics-server-native.yaml",
    ])
  })

  test("server-side-applies only the CloudNativePG manifest (oversized CRD annotations)", () => {
    for (const s of applyFiles()) {
      const isCnpg =
        s.manifestPath === "packages/infra/k8s/src/cloudnative-pg/k8s/cloudnative-pg-native.yaml"
      expect(s.serverSide ?? false).toBe(isCnpg)
    }
  })

  test("retargets every node-01-pinned admin Deployment to control workload-class membership", () => {
    const targets = patches().map((s) => `${s.namespace}/${s.deployment}`)
    expect(targets).toEqual([
      "metallb-system/controller",
      "cert-manager/cert-manager",
      "cert-manager/cert-manager-webhook",
      "cert-manager/cert-manager-cainjector",
      "cnpg-system/cnpg-controller-manager",
      "kube-system/metrics-server",
    ])
    for (const p of patches()) {
      expect(p.selector).toEqual({ [workloadClassMemberKey("control")]: "true" })
    }
  })

  test("does not patch the Barman plugin (it already ships class-targeted)", () => {
    const target = patches().find((s) => s.deployment === "barman-cloud")
    expect(target).toBeUndefined()
  })

  test("applies the pipeline-engine-escalate RBAC from a generator that stands on disk", () => {
    const generated = buildAdminBootstrapPlan().steps.filter(
      (s): s is ApplyGeneratedStep => s.kind === "apply-generated"
    )
    expect(generated).toHaveLength(1)
    const script = generated[0]?.generatorScript ?? ""
    expect(script).toBe("tools/lib/cluster-rbac/escalate-manifest.ts")
    const instructionsRepoRoot = resolve(import.meta.dir, "..", "..", "..", "..")
    expect(existsSync(resolve(instructionsRepoRoot, script))).toBe(true)
  })

  test("controlClass override changes the patched selector value", () => {
    for (const p of patches(buildAdminBootstrapPlan({ controlClass: "serve" }))) {
      expect(p.selector).toEqual({ [workloadClassMemberKey("serve")]: "true" })
    }
  })

  test('controlClass "none" emits empty selectors that unpin every Deployment', () => {
    const noPin = buildAdminBootstrapPlan({ controlClass: "none" })
    const ps = patches(noPin)
    expect(ps.map((s) => `${s.namespace}/${s.deployment}`)).toEqual([
      "metallb-system/controller",
      "cert-manager/cert-manager",
      "cert-manager/cert-manager-webhook",
      "cert-manager/cert-manager-cainjector",
      "cnpg-system/cnpg-controller-manager",
      "cnpg-system/barman-cloud",
      "kube-system/metrics-server",
    ])
    for (const p of ps) {
      expect(p.selector).toEqual({})
      expect(p.description).toContain("unpin")
    }
  })
})
