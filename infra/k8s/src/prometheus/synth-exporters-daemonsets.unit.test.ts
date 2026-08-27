import { describe, expect, test } from "bun:test"
import { parse } from "yaml"
import { z } from "zod"
import {
  CGROUP_HIER_PATH,
  CGROUP_LOCAL_PATH,
  COLLECTOR_CONTAINER_NAME,
  METRIC_HIER_OOM_KILL,
  METRIC_LOCAL_OOM_KILL,
  PROM_FILE_PATH,
  PROM_FILENAME,
  TEXTFILE_DIR,
} from "./kubepods-oom-constants"
import { dcgmExporterDaemonsetYaml, nodeExporterDaemonsetYaml } from "./synth-exporters-daemonsets"

const containerSchema = z.object({
  name: z.string(),
  image: z.string(),
  args: z.array(z.string()).optional(),
  command: z.array(z.string()).optional(),
  resources: z.object({
    requests: z.record(z.string(), z.string()),
    limits: z.record(z.string(), z.string()),
  }),
  securityContext: z.record(z.string(), z.unknown()),
  volumeMounts: z.array(
    z.object({
      name: z.string(),
      mountPath: z.string(),
      readOnly: z.boolean().optional(),
    })
  ),
})

const daemonsetSchema = z.object({
  kind: z.literal("DaemonSet"),
  spec: z.object({
    template: z.object({
      spec: z.object({
        containers: z.array(containerSchema),
        volumes: z.array(z.record(z.string(), z.unknown())),
      }),
    }),
  }),
})

function podSpec(yaml: string): z.infer<typeof daemonsetSchema>["spec"]["template"]["spec"] {
  return daemonsetSchema.parse(parse(yaml)).spec.template.spec
}

function container(yaml: string, name: string): z.infer<typeof containerSchema> {
  const found = podSpec(yaml).containers.find((c) => c.name === name)
  if (found === undefined) throw new Error(`no container named ${name}`)
  return found
}

function collectorScript(): string {
  const cmd = container(nodeExporterDaemonsetYaml(), COLLECTOR_CONTAINER_NAME).command ?? []
  expect(cmd.slice(0, 2)).toEqual(["sh", "-c"])
  return cmd[2] ?? ""
}

describe("node-exporter kubepods-OOM textfile collector (#16219)", () => {
  test("node-exporter reads the textfile dir the collector writes to", () => {
    const args = container(nodeExporterDaemonsetYaml(), "node-exporter").args ?? []
    expect(args).toContain(`--collector.textfile.directory=${TEXTFILE_DIR}`)
  })

  test("the textfile dir is a shared emptyDir — node-exporter's rootfs is read-only", () => {
    const volume = podSpec(nodeExporterDaemonsetYaml()).volumes.find((v) => v.name === "textfile")
    expect(volume?.emptyDir).toEqual({ sizeLimit: "1Mi" })
    const scraperMount = container(nodeExporterDaemonsetYaml(), "node-exporter").volumeMounts.find(
      (m) => m.name === "textfile"
    )
    expect(scraperMount).toEqual({ name: "textfile", mountPath: TEXTFILE_DIR, readOnly: true })
    const writerMount = container(
      nodeExporterDaemonsetYaml(),
      COLLECTOR_CONTAINER_NAME
    ).volumeMounts.find((m) => m.name === "textfile")
    expect(writerMount?.readOnly).toBeUndefined()
  })

  test("the collector reads the host cgroup files through the existing read-only /sys mount", () => {
    const mount = container(
      nodeExporterDaemonsetYaml(),
      COLLECTOR_CONTAINER_NAME
    ).volumeMounts.find((m) => m.name === "sys")
    expect(mount).toEqual({ name: "sys", mountPath: "/host/sys", readOnly: true })
    expect(CGROUP_LOCAL_PATH.startsWith("/host/sys/")).toBe(true)
    expect(CGROUP_HIER_PATH.startsWith("/host/sys/")).toBe(true)
  })

  test("the collector runs hardened, non-root, Guaranteed QoS", () => {
    const c = container(nodeExporterDaemonsetYaml(), COLLECTOR_CONTAINER_NAME)
    expect(c.securityContext).toEqual({
      runAsNonRoot: true,
      runAsUser: 65534,
      runAsGroup: 65534,
      allowPrivilegeEscalation: false,
      capabilities: { drop: ["ALL"] },
      readOnlyRootFilesystem: true,
    })
    expect(c.resources.requests.memory).toBe(c.resources.limits.memory)
    expect(c.resources.requests.cpu).toBe(c.resources.limits.cpu)
  })

  test("emits BOTH series with counter type — hierarchical is the local zero's proof-of-life", () => {
    const script = collectorScript()
    for (const metric of [METRIC_LOCAL_OOM_KILL, METRIC_HIER_OOM_KILL]) {
      expect(script).toContain(`# HELP ${metric} `)
      expect(script).toContain(`# TYPE ${metric} counter`)
    }
    expect(METRIC_LOCAL_OOM_KILL).not.toBe(METRIC_HIER_OOM_KILL)
  })

  test("extracts oom_kill from both cgroup files", () => {
    const script = collectorScript()
    for (const path of [CGROUP_LOCAL_PATH, CGROUP_HIER_PATH]) {
      expect(script).toContain(`awk '/^oom_kill /{print $2}' ${path}`)
    }
  })

  test("publishes by atomic rename onto the path the alert selector names", () => {
    const script = collectorScript()
    expect(script).toContain(`mv "$tmp" "${PROM_FILE_PATH}"`)
    expect(script).toContain(`tmp="${TEXTFILE_DIR}/.${PROM_FILENAME}.tmp"`)
    expect(script).not.toContain(`> "${PROM_FILE_PATH}"`)
    expect(script.includes(`.${PROM_FILENAME}.tmp`)).toBe(true)
    expect(PROM_FILE_PATH.endsWith(".prom")).toBe(true)
  })

  test("a failed or empty read skips the cycle rather than writing a zero", () => {
    const script = collectorScript()
    expect(script).toContain(`if [ -n "$local_kills" ] && [ -n "$hier_kills" ]; then`)
    expect(script).not.toContain("touch")
    expect(script).toContain("sleep 30")
  })

  test("dcgm-exporter is untouched by the collector change", () => {
    const dcgm = dcgmExporterDaemonsetYaml()
    expect(dcgm).not.toContain("textfile")
    expect(dcgm).not.toContain(COLLECTOR_CONTAINER_NAME)
    expect(podSpec(dcgm).containers.map((c) => c.name)).toEqual(["dcgm-exporter"])
  })
})
