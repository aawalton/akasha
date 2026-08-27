import { join } from "node:path"
import { type EndpointDescriptor, endpointDescriptorSchema } from "./endpoints/types"
import { readToken } from "./token-store"

const ENDPOINTS_DIR = join(import.meta.dir, "endpoints")

export interface DiscoveredEndpoint {
  readonly file: string
  readonly descriptor: EndpointDescriptor
}

async function discoverEndpoints(): Promise<DiscoveredEndpoint[]> {
  const glob = new Bun.Glob("*.ts")
  const discovered: DiscoveredEndpoint[] = []
  for await (const file of glob.scan({ cwd: ENDPOINTS_DIR })) {
    if (file === "types.ts" || file.endsWith(".test.ts")) continue
    const mod = await import(join(ENDPOINTS_DIR, file))
    const descriptor = endpointDescriptorSchema.parse(mod.default)
    discovered.push({ file, descriptor })
  }
  return discovered.sort((a, b) => a.file.localeCompare(b.file))
}

interface ProbeResult {
  readonly endpoint: string
  readonly probe: string
  readonly ok: boolean
  readonly detail: string
}

async function runProbe(endpointName: string, probeName: string, run: () => Promise<unknown>) {
  try {
    await run()
    return { endpoint: endpointName, probe: probeName, ok: true, detail: "ok" }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    return { endpoint: endpointName, probe: probeName, ok: false, detail }
  }
}

export function parseOnlyFilter(argv: readonly string[]): ReadonlySet<string> | null {
  const idx = argv.indexOf("--only")
  if (idx === -1) return null
  const raw = argv[idx + 1] ?? ""
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
  )
}

export function selectEndpoints(
  discovered: readonly DiscoveredEndpoint[],
  only: ReadonlySet<string> | null
): readonly DiscoveredEndpoint[] {
  if (only === null) return [...discovered]
  return discovered.filter((d) => only.has(d.descriptor.name))
}

async function main(): Promise<void> {
  const token = readToken()
  if (token == null) {
    console.error(
      "No stored token — run the consent CLI first:\n  bun run --cwd collections/music-spotify auth"
    )
    process.exit(1)
  }
  const granted = new Set(token.scopes)

  const includeManual = process.argv.includes("--include-manual")

  const only = parseOnlyFilter(process.argv)
  const allEndpoints = await discoverEndpoints()
  const endpoints = selectEndpoints(allEndpoints, only)
  if (only !== null) {
    const found = new Set(endpoints.map((e) => e.descriptor.name))
    const unmatched = [...only].filter((n) => !found.has(n))
    if (unmatched.length > 0) {
      console.error(`❌  --only: no family matches: ${unmatched.join(", ")}`)
      process.exit(1)
    }
  }
  console.log(
    `Discovered ${allEndpoints.length} endpoint famil${allEndpoints.length === 1 ? "y" : "ies"}; running ${endpoints.length}${only !== null ? ` (--only ${[...only].join(",")})` : ""}.`
  )

  const results: ProbeResult[] = []
  let skipped = 0
  for (const { descriptor } of endpoints) {
    const missing = descriptor.scopes.filter((s) => !granted.has(s))
    if (missing.length > 0) {
      console.warn(`⚠️  ${descriptor.name}: missing granted scopes: ${missing.join(", ")}`)
    }
    for (const probe of descriptor.probes) {
      if (probe.manual === true && !includeManual) {
        skipped++
        console.log(
          `⏭️  ${descriptor.name} › ${probe.name} — skipped (manual / active-device; pass --include-manual)`
        )
        continue
      }
      const result = await runProbe(descriptor.name, probe.name, probe.run)
      results.push(result)
      console.log(
        `${result.ok ? "✅" : "❌"} ${descriptor.name} › ${probe.name}${result.ok ? "" : ` — ${result.detail}`}`
      )
    }
  }

  const failed = results.filter((r) => !r.ok)
  const skipNote = skipped > 0 ? `, ${skipped} skipped (manual)` : ""
  console.log(`\n${results.length - failed.length}/${results.length} probes passed${skipNote}.`)
  process.exit(failed.length > 0 ? 1 : 0)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("Harness failed:", err)
    process.exit(1)
  })
}
