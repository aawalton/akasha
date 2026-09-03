import { z } from "zod"
import {
  loadPoolConfig,
  type PoolConfig,
  type PoolService,
} from "../pool-config/pool-config.module.code.ts"
import { createMutex, type LockPriority } from "../pool-mutex/pool-mutex.module.code.ts"
import { proxyToService } from "../pool-proxy/pool-proxy.module.code.ts"
import { createSwapController } from "../pool-swap/pool-swap.module.code.ts"

const PRIORITY_HEADER = "x-cop-priority"

function readPriority(request: Request): LockPriority {
  return request.headers.get(PRIORITY_HEADER) === "high" ? "high" : "normal"
}

const HEARTBEAT_MS = 60_000
const POOL_CONFIG_PATH = "./pool.json"

const ActivateBodySchema = z.object({ name: z.string().min(1) }).strict()

function jsonResponse(value: unknown, status: number): Response {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  })
}

function makeAdminHandler(
  swap: ReturnType<typeof createSwapController>,
  byName: Map<string, PoolService>
): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    const url = new URL(request.url)
    if (request.method === "GET" && url.pathname === "/health") {
      const resident = swap.getResident()
      return new Response(`ok resident=${resident.length > 0 ? resident.join(",") : "none"}\n`, {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" },
      })
    }
    if (request.method === "GET" && url.pathname === "/active") {
      return jsonResponse({ resident: swap.getResident() }, 200)
    }
    if (request.method === "POST" && url.pathname === "/activate") {
      let parsed: { name: string }
      try {
        parsed = ActivateBodySchema.parse(await request.json())
      } catch {
        return jsonResponse({ error: "body must be { name: string }" }, 400)
      }
      const target = byName.get(parsed.name)
      if (target === undefined) {
        return jsonResponse({ error: `unknown service: ${parsed.name}` }, 404)
      }
      const result = await swap.ensureLive(target)
      if (!result.ok) {
        return jsonResponse({ error: result.message }, 504)
      }
      return jsonResponse({ resident: swap.getResident() }, 200)
    }
    return jsonResponse({ error: "not found" }, 404)
  }
}

export function makePoolHandler(
  service: PoolService,
  swap: ReturnType<typeof createSwapController>,
  proxy: (service: PoolService, request: Request) => Promise<Response> = proxyToService
): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    const outcome = await swap.runWithPool(
      service,
      () => proxy(service, request),
      readPriority(request)
    )
    if (!outcome.ok) {
      return new Response(`[traffic-cop] ${outcome.message}\n`, {
        status: 504,
        headers: { "content-type": "text/plain; charset=utf-8" },
      })
    }
    return outcome.value
  }
}

async function main(): Promise<void> {
  const config: PoolConfig = await loadPoolConfig(POOL_CONFIG_PATH)
  const byName = new Map(config.services.map((s) => [s.name, s]))
  const mutex = createMutex()
  const swap = createSwapController(config, mutex)

  await swap.bootReconcile()
  console.error(
    `[traffic-cop] boot reconcile complete — ${config.services.length} pool service(s), warm set [${config.warmSet.length > 0 ? config.warmSet.join(", ") : "none"}], nothing resident`
  )

  for (const service of config.services) {
    const handle = makePoolHandler(service, swap)
    Bun.serve({
      hostname: service.publicHost,
      port: service.publicPort,
      idleTimeout: 0,
      fetch: handle,
    })
    console.error(
      `[traffic-cop] fronting ${service.name} on ${service.publicHost}:${service.publicPort} → 127.0.0.1:${service.internalPort}`
    )
  }

  const adminHandle = makeAdminHandler(swap, byName)
  Bun.serve({ hostname: "127.0.0.1", port: config.adminPort, fetch: adminHandle })
  console.error(`[traffic-cop] admin on 127.0.0.1:${config.adminPort}`)

  setInterval(() => {
    const resident = swap.getResident()
    console.error(
      `[traffic-cop] heartbeat resident=${resident.length > 0 ? resident.join(",") : "none"}`
    )
  }, HEARTBEAT_MS)
}

if (import.meta.main) {
  void main()
}
