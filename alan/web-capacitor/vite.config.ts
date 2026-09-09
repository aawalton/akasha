import path from "node:path"
import { supabaseClientEnvDefine } from "@akasha/supabase-rr/client-env-define"
import { buildShaDefine } from "akasha/alan/harness/web-build-version/build-sha-define/build-sha-define.module.code.ts"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"

const NODE_IN_CLIENT_IS_FATAL = true

const repoRoot = path.resolve(import.meta.dirname ?? process.cwd(), "../../..")

const browserExternalPrefix = "__vite-browser-external:"

function nodeBuiltinReached(dep: string): string | undefined {
  const id = dep.replace(/^\0/, "")
  if (id.startsWith(browserExternalPrefix)) {
    return id.slice(browserExternalPrefix.length) || "node"
  }
  if (id.startsWith("node:") || id.startsWith("bun:")) return id
  return undefined
}

const noNodeInClient: Plugin = {
  name: "no-node-in-client",
  applyToEnvironment: (environment) => environment.name === "client",
  buildEnd() {
    if (this.environment?.name !== "client") return

    const builtinsByImporter = new Map<string, Set<string>>()
    let importCount = 0
    for (const id of this.getModuleIds()) {
      const info = this.getModuleInfo(id)
      if (!info) continue
      for (const dep of [...(info.importedIds ?? []), ...(info.dynamicallyImportedIds ?? [])]) {
        const builtin = nodeBuiltinReached(dep)
        if (!builtin) continue
        importCount++
        const seen = builtinsByImporter.get(id) ?? new Set<string>()
        seen.add(builtin)
        builtinsByImporter.set(id, seen)
      }
    }
    if (builtinsByImporter.size === 0) return

    const maxLines = 40
    const lines = [...builtinsByImporter]
      .map(([id, builtins]) => {
        const where = id.startsWith(repoRoot) ? path.relative(repoRoot, id) : id
        return `  ${where} -> ${[...builtins].sort().join(", ")}`
      })
      .sort()
    const shown = lines.slice(0, maxLines)
    if (lines.length > maxLines) {
      shown.push(`  ... and ${lines.length - maxLines} more module(s)`)
    }

    const message =
      `the in-shell SPA reaches ${builtinsByImporter.size} node-only module(s) ` +
      `across ${importCount} import(s); the phone has no node.\n` +
      "vite swaps each builtin for a Proxy that throws on first access, so these modules " +
      "die at module-evaluation time and the app never hydrates. " +
      "Sever the reach — do not stub the builtin.\n" +
      shown.join("\n")

    if (NODE_IN_CLIENT_IS_FATAL) this.error(message)
    else this.warn(message)
  },
}

export default defineConfig({
  base: "/",
  envDir: "../web",
  plugins: [tailwindcss(), reactRouter(), noNodeInClient],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["rrule", "lucide-react"],
  },
  define: { ...supabaseClientEnvDefine(), ...buildShaDefine() },
})
