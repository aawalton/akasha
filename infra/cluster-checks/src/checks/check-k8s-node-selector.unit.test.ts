import { describe, expect, test } from "bun:test"
import { GPU_VRAM_USABLE_MIB_KEY, gpuVramUsableMinKey } from "@infra/k8s-types/hostnames"
import {
  HOSTNAME_SELECTOR_KEY,
  WORKLOAD_CLASS_SELECTOR_KEY,
} from "@infra/k8s-types/k8s-manifest-scanner"
import {
  evaluateManifestNode,
  type ManifestNodeAttrs,
  scanTsContent,
  scanTsNodeName,
} from "../lib/k8s-node-selector.ts"

const baseAttrs = (over: Partial<ManifestNodeAttrs>): ManifestNodeAttrs => ({
  path: "foo/k8s/dep.yaml",
  kind: "Deployment",
  name: "app",
  hasPodTemplate: true,
  nodeSelectorKeys: [],
  nodeName: null,
  nodeAffinityKeys: [],
  startLine: 1,
  ...over,
})

describe("evaluateManifestNode — closeout of #11595 (hostname pins rejected)", () => {
  test("hostname-only pin: role-selector only (closeout #11813 — hostname no longer accepted)", () => {
    const v = evaluateManifestNode(
      baseAttrs({
        nodeSelectorKeys: [HOSTNAME_SELECTOR_KEY],
      })
    )
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("role-selector")
    expect(v[0]?.key).toBe(HOSTNAME_SELECTOR_KEY)
  })

  test("capability-only pin: no violations (new behavior)", () => {
    const v = evaluateManifestNode(
      baseAttrs({
        nodeSelectorKeys: [WORKLOAD_CLASS_SELECTOR_KEY],
      })
    )
    expect(v).toEqual([])
  })

  test("both hostname and capability pinned: a single role-selector for the hostname key (closeout #11813)", () => {
    const v = evaluateManifestNode(
      baseAttrs({
        nodeSelectorKeys: [HOSTNAME_SELECTOR_KEY, WORKLOAD_CLASS_SELECTOR_KEY],
      })
    )
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("role-selector")
    expect(v[0]?.key).toBe(HOSTNAME_SELECTOR_KEY)
  })

  test("no pin on a pin-required kind: no violations (pins are now optional)", () => {
    const v = evaluateManifestNode(baseAttrs({}))
    expect(v).toEqual([])
  })

  test("forbidden nodeSelector key on a non-DaemonSet emits role-selector only", () => {
    const v = evaluateManifestNode(
      baseAttrs({
        nodeSelectorKeys: ["disktype"],
      })
    )
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("role-selector")
    expect(v[0]?.key).toBe("disktype")
  })

  test("DaemonSet is exempt from both rules even with no pin and an extra key", () => {
    const v = evaluateManifestNode(
      baseAttrs({
        kind: "DaemonSet",
        hasPodTemplate: true,
        nodeSelectorKeys: ["disktype"],
      })
    )
    expect(v).toEqual([])
  })

  test("membership key on a StatefulSet: no violations (new #11608 behavior)", () => {
    const v = evaluateManifestNode(
      baseAttrs({
        kind: "StatefulSet",
        nodeSelectorKeys: [["alanwalton.com", "workload-class.database"].join("/")],
      })
    )
    expect(v).toEqual([])
  })

  test("membership key for a non-WorkloadClass still emits role-selector only", () => {
    const v = evaluateManifestNode(
      baseAttrs({
        kind: "StatefulSet",
        nodeSelectorKeys: [["alanwalton.com", "workload-class.garbage"].join("/")],
      })
    )
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("role-selector")
  })
})

const HOSTNAME_LITERAL = `"${["kubernetes.io", "hostname"].join("/")}"`
const WORKLOAD_CLASS_LITERAL = `"${["alanwalton.com", "workload-class"].join("/")}"`
const WORKLOAD_CLASS_MEMBER_LITERAL = `"${["alanwalton.com", "workload-class.database"].join("/")}"`
const WORKLOAD_CLASS_HYPHENATED_MEMBER_LITERAL = `"${["alanwalton.com", "workload-class.eso-rig"].join("/")}"`

describe("scanTsContent — ts-literal rule (extended to workload-class key)", () => {
  test("flags the hostname literal outside hostnames.ts (existing behavior)", () => {
    const content = `const x = { ${HOSTNAME_LITERAL}: "node-02" }\n`
    const v = scanTsContent(content, "foo/synth.ts")
    expect(v.map((violation) => violation.kind)).toEqual(["ts-literal"])
  })

  test("flags the workload-class literal outside hostnames.ts (new behavior)", () => {
    const content = `const x = { ${WORKLOAD_CLASS_LITERAL}: "database" }\n`
    const v = scanTsContent(content, "foo/synth.ts")
    expect(v.map((violation) => violation.kind)).toEqual(["ts-literal"])
  })

  test("allows both literals inside infra/k8s-types/src/hostnames.ts", () => {
    const content = `const x = ${HOSTNAME_LITERAL}\nconst y = ${WORKLOAD_CLASS_LITERAL}\n`
    const v = scanTsContent(content, "infra/k8s-types/src/hostnames.ts")
    expect(v).toEqual([])
  })

  test("flags the dotted membership literal outside hostnames.ts (new #11608 behavior)", () => {
    const content = `const x = ${WORKLOAD_CLASS_MEMBER_LITERAL}\n`
    const v = scanTsContent(content, "infra/k8s/src/postgres-cnpg/cnpg-cluster.ts")
    expect(v.map((violation) => violation.kind)).toEqual(["ts-literal"])
  })

  test("allows the dotted membership literal inside hostnames.ts (canonical file)", () => {
    const content = `const x = ${WORKLOAD_CLASS_MEMBER_LITERAL}\n`
    const v = scanTsContent(content, "infra/k8s-types/src/hostnames.ts")
    expect(v).toEqual([])
  })

  test("flags a hyphenated membership literal outside hostnames.ts", () => {
    const content = `const x = { ${WORKLOAD_CLASS_HYPHENATED_MEMBER_LITERAL}: "true" }\n`
    const v = scanTsContent(content, "foo/synth.ts")
    expect(v.map((violation) => violation.kind)).toEqual(["ts-literal"])
  })

  test("allows the hyphenated membership literal inside hostnames.ts (canonical file)", () => {
    const content = `const x = ${WORKLOAD_CLASS_HYPHENATED_MEMBER_LITERAL}\n`
    const v = scanTsContent(content, "infra/k8s-types/src/hostnames.ts")
    expect(v).toEqual([])
  })
})

describe("evaluateManifestNode — nodeName (#16049, the spelling the ban missed)", () => {
  test("a pod-spec nodeName is a violation", () => {
    const v = evaluateManifestNode(baseAttrs({ kind: "Job", nodeName: "node-06" }))
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("node-name")
    expect(v[0]?.key).toBe("node-06")
  })

  test("DaemonSets are NOT exempt from the nodeName rule", () => {
    const v = evaluateManifestNode(baseAttrs({ kind: "DaemonSet", nodeName: "node-06" }))
    expect(v.map((x) => x.kind)).toEqual(["node-name"])
  })

  test("a doc with no pod template is untouched", () => {
    const v = evaluateManifestNode(
      baseAttrs({ kind: "PersistentVolume", hasPodTemplate: false, nodeName: "node-04" })
    )
    expect(v).toEqual([])
  })

  test("the tracked voice-infer exception is allowed, and only at its exact path", () => {
    const allowed = evaluateManifestNode(
      baseAttrs({
        path: "infra/voice-infer/generated/deployment.generated.yaml",
        nodeName: "node-02",
      })
    )
    expect(allowed).toEqual([])

    const sibling = evaluateManifestNode(
      baseAttrs({
        path: "infra/voice-infer/generated/other.generated.yaml",
        nodeName: "node-02",
      })
    )
    expect(sibling.map((x) => x.kind)).toEqual(["node-name"])
  })
})

describe("evaluateManifestNode — nodeAffinity keys (#16049, the other spelling)", () => {
  test("a hostname key in pod-spec nodeAffinity is rejected", () => {
    const v = evaluateManifestNode(baseAttrs({ nodeAffinityKeys: [HOSTNAME_SELECTOR_KEY] }))
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("affinity-selector")
    expect(v[0]?.key).toBe(HOSTNAME_SELECTOR_KEY)
  })

  test("an accepted key in nodeAffinity passes", () => {
    const v = evaluateManifestNode(baseAttrs({ nodeAffinityKeys: [WORKLOAD_CLASS_SELECTOR_KEY] }))
    expect(v).toEqual([])
  })
})

describe("evaluateManifestNode — GPU capacity keys (#16049)", () => {
  test("a declared usable-VRAM tier membership key is accepted", () => {
    const v = evaluateManifestNode(baseAttrs({ nodeSelectorKeys: [gpuVramUsableMinKey("8gi")] }))
    expect(v).toEqual([])
  })

  test("the raw usable-VRAM scalar is REJECTED as a selector", () => {
    const v = evaluateManifestNode(baseAttrs({ nodeSelectorKeys: [GPU_VRAM_USABLE_MIB_KEY] }))
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("role-selector")
    expect(v[0]?.key).toBe(GPU_VRAM_USABLE_MIB_KEY)
  })

  test("an undeclared tier is rejected", () => {
    const bogus = `${["alanwalton.com", "gpu-vram-usable-min.99gi"].join("/")}`
    const v = evaluateManifestNode(baseAttrs({ nodeSelectorKeys: [bogus] }))
    expect(v.map((x) => x.kind)).toEqual(["role-selector"])
  })
})

describe("scanTsNodeName — the TS surface (builders that emit no yaml)", () => {
  const POD_SPEC = [
    "        spec: {",
    "          nodeName: NODE,",
    "          containers: [",
    "        },",
  ].join("\n")

  test("flags a pod-spec nodeName in a module that builds a pod spec", () => {
    const v = scanTsNodeName(POD_SPEC, "infra/upscale/k8s/serving-job.ts")
    expect(v.map((x) => x.kind)).toEqual(["ts-node-name"])
  })

  test("reaches a module outside infra/, judged like the platform's", () => {
    const v = scanTsNodeName(POD_SPEC, "alanwalton/web/alanwalton-web-deployment.cluster-service.code.attachment.ts")
    expect(v.map((x) => x.kind)).toEqual(["ts-node-name"])
  })

  test("ignores a module that builds no pod spec", () => {
    const v = scanTsNodeName(
      "          nodeName: NODE,",
      "tools/lib/ci-pod-dispatcher/launch-builder.ts"
    )
    expect(v).toEqual([])
  })

  test("pod-spec YAML TEXT is not a TS pod spec", () => {
    const yamlText = [
      "  spec:",
      "    nodeName: node-04",
      "    containers:",
      "      - name: c",
    ].join("\n")
    const v = scanTsNodeName(yamlText, "infra/k8s-types/src/fixture-source.ts")
    expect(v).toEqual([])
  })

  test("a fixture pod spec in a test module is out of scope", () => {
    const v = scanTsNodeName(
      POD_SPEC,
      "tools/lib/ci-pod-dispatcher/node-capacity.unit.test.ts"
    )
    expect(v).toEqual([])
  })

  test("ignores the tracked voice-infer exception", () => {
    const v = scanTsNodeName(POD_SPEC, "infra/voice-infer/voice-infer.cluster-service.code.attachment.ts")
    expect(v).toEqual([])
  })

  test("does not match comments or value positions", () => {
    const content = [
      "// nodeName: pins the pod",
      " * nodeName is forbidden here",
      '          { name: "NODE", valueFrom: { fieldRef: { fieldPath: "spec.nodeName" } } },',
      "          containers: [",
    ].join("\n")
    const v = scanTsNodeName(content, "infra/loki-service/k8s/synth-promtail.ts")
    expect(v).toEqual([])
  })
})
