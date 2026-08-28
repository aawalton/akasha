import { describe, expect, test } from "bun:test"
import { requireMatch } from "../../shared/utils-narrow/src/require-match"
import { z } from "zod"
import { PROMTAIL_CONFIG } from "./synth-configs"
import { promtailDaemonsetYaml } from "./synth-promtail"

const KERNEL_LINES = [
  {
    line: "kern:    info: [2026-07-25T09:19:58.802464523Z]: cni0: port 2(veth98016daf) entered forwarding state",
    ts: "2026-07-25T09:19:58.802464523Z",
  },
  {
    line: "kern:     err: [2026-07-25T14:23:17.527285605Z]: Memory cgroup out of memory: Killed process 109324 (bun) total-vm:79471988kB, anon-rss:5225576kB",
    ts: "2026-07-25T14:23:17.527285605Z",
  },
  {
    line: "kern:    info: [2026-07-25T14:23:17.527201795Z]: oom-kill:constraint=CONSTRAINT_MEMCG,nodemask=(null),task=bun,pid=109324,uid=1000",
    ts: "2026-07-25T14:23:17.527201795Z",
  },
  {
    line: 'user: warning: [2026-07-25T23:18:55.766105743Z]: [talos] time query error with server "142.248.192.33"',
    ts: "2026-07-25T23:18:55.766105743Z",
  },
]

function emittedKernelTimestampRegex(): RegExp {
  const { expr } = requireMatch(
    /expression: '(?<expr>.+)'/,
    z.object({ expr: z.string() }),
    PROMTAIL_CONFIG,
    "PROMTAIL_CONFIG node-kernel regex stage"
  )
  return new RegExp(expr.replaceAll("(?P<", "(?<"))
}

describe("promtail node-kernel scrape job", () => {
  test("emits regex metacharacters unescaped by the template literal", () => {
    expect(PROMTAIL_CONFIG).toContain(String.raw`^\w+:\s+\w+:\s+\[(?P<kernel_ts>[^\]]+)\]:`)
  })

  test.each(KERNEL_LINES)("captures the kernel timestamp from $ts", ({ line, ts }) => {
    const { kernel_ts } = requireMatch(
      emittedKernelTimestampRegex(),
      z.object({ kernel_ts: z.string() }),
      line,
      "captured kernel line"
    )
    expect(kernel_ts).toBe(ts)
  })

  test("stamps entries from kernel time, not ingest time", () => {
    expect(PROMTAIL_CONFIG).toContain("source: kernel_ts")
    expect(PROMTAIL_CONFIG).toContain("format: RFC3339Nano")
  })

  test("pins each pod to its own node's file", () => {
    expect(PROMTAIL_CONFIG).toContain("target_label: __host__")
    expect(PROMTAIL_CONFIG).toContain("replacement: /host/var/log/kernel.log")
  })

  test("keeps kernel stream labels to job and node", () => {
    const job = PROMTAIL_CONFIG.slice(PROMTAIL_CONFIG.indexOf("job_name: node-kernel"))
    expect(job).not.toContain("target_label: facility")
    expect(job).not.toContain("target_label: severity")
  })

  test("keeps the pod __path__ placeholder that env expansion would eat", () => {
    expect(PROMTAIL_CONFIG).toContain("replacement: /var/log/pods/*$1/*.log")
  })

  test("mounts the node's log DIRECTORY, never the rotating file itself", () => {
    const ds = promtailDaemonsetYaml()
    expect(ds).toContain("/host/var/log")
    expect(ds).not.toContain("type: File")
    expect(ds).not.toContain("expand-env")
    expect(promtailDaemonsetYaml()).toContain("serviceAccountName: promtail")
  })

  test("drops the journald job Talos can never populate", () => {
    expect(PROMTAIL_CONFIG).not.toContain("job_name: node-journal")
    expect(PROMTAIL_CONFIG).not.toContain("path: /var/log/journal")
  })
})
