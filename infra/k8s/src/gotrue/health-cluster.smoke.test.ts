import { describe, test } from "bun:test"
import { z } from "zod"

const disabled = z.string().optional().parse(process.env.GOTRUE_SMOKE_DISABLED) !== undefined

if (disabled) {
  console.log("[smoke skip] @infra/k8s gotrue health-cluster: GOTRUE_SMOKE_DISABLED set")
}

describe.skipIf(disabled)("gotrue cluster health smoke", () => {
  test("/health returns 200", async () => {
    for (let i = 1; i <= 5; i++) {
      try {
        const res = await fetch("http://gotrue.gotrue.svc.cluster.local:9999/health", {
          signal: AbortSignal.timeout(5_000),
        })
        if (res.status === 200) return
        console.log(`attempt ${i}: ${res.status}`)
      } catch (err) {
        console.log(`attempt ${i}: ${err instanceof Error ? err.message : "unknown"}`)
      }
      if (i < 5) await new Promise((r) => setTimeout(r, 3_000))
    }
    throw new Error("gotrue /health did not return 200 after 5 attempts")
  }, 45_000)
})
