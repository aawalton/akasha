import { describe, expect, test } from "bun:test"
import { parse } from "yaml"
import { z } from "zod"
import { PROMETHEUS_YML } from "./synth-prometheus-configs"

const scrapeJobSchema = z.looseObject({ job_name: z.string() })
const prometheusSchema = z.object({ scrape_configs: z.array(scrapeJobSchema) })

type ScrapeJob = z.infer<typeof scrapeJobSchema>

function scrapeJob(jobName: string): ScrapeJob | undefined {
  return prometheusSchema
    .parse(parse(PROMETHEUS_YML))
    .scrape_configs.find((j) => j.job_name === jobName)
}

describe("synth-prometheus-configs scrape config", () => {
  test("cloudflared is scraped via pod service-discovery on :2000, not a bare Service-DNS static target", () => {
    const job = scrapeJob("cloudflared")
    expect(job).toBeDefined()
    expect(job?.["kubernetes_sd_configs"]).toBeDefined()
    expect(job?.["static_configs"]).toBeUndefined()
    const serialized = JSON.stringify(job)
    expect(serialized).toContain(":2000")
    expect(serialized).not.toContain("cloudflared.cloudflared.svc.cluster.local")
    expect(serialized).toContain("app_kubernetes_io_component")
    expect(serialized).toContain("tunnel")
  })

  test("loki server is scraped on :3100 as a job distinct from promtail's :3101", () => {
    const loki = scrapeJob("loki")
    expect(loki).toBeDefined()
    expect(loki?.["kubernetes_sd_configs"]).toBeDefined()
    expect(loki?.["static_configs"]).toBeUndefined()
    const serialized = JSON.stringify(loki)
    expect(serialized).toContain("app_kubernetes_io_name")
    expect(serialized).toContain(":3100")
    expect(serialized).not.toContain(":3101")
    expect(serialized).not.toContain("personal")
  })

  test("promtail keeps its own :3101 job — loki is added alongside, not by repointing it", () => {
    const promtail = scrapeJob("promtail")
    expect(promtail).toBeDefined()
    expect(JSON.stringify(promtail)).toContain(":3101")
    expect(scrapeJob("loki")?.job_name).toBe("loki")
    expect(promtail?.job_name).not.toBe(scrapeJob("loki")?.job_name)
  })

  test("cert-manager is scraped on :9402 and carries no tier=personal label", () => {
    const job = scrapeJob("cert-manager")
    expect(job).toBeDefined()
    const serialized = JSON.stringify(job)
    expect(serialized).toContain("cert-manager.cert-manager.svc.cluster.local:9402")
    expect(serialized).not.toContain("personal")
  })

  test("seaweedfs scrapes master/volume/filer on :9327 with component labels, no tier=personal", () => {
    const job = scrapeJob("seaweedfs")
    expect(job).toBeDefined()
    const serialized = JSON.stringify(job)
    expect(serialized).toContain("master.seaweedfs.svc.cluster.local:9327")
    expect(serialized).toContain("volume.seaweedfs.svc.cluster.local:9327")
    expect(serialized).toContain("filer.seaweedfs.svc.cluster.local:9327")
    expect(serialized).toContain("component")
    expect(serialized).toContain("volume")
    expect(serialized).not.toContain("personal")
  })
})
