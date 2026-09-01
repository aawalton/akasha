import { reactRouter } from "@react-router/dev/vite"
import { buildShaDefine } from "@akasha/web-build-version/build-sha-define"
import { supabaseClientEnvDefine } from "@akasha/supabase-rr/client-env-define"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"
import { defineConfig, type Plugin } from "vite"

/**
 * ONE-LINE SWITCH: flip to `false` to downgrade the guard below to a loud warning.
 * Fatal is the correct setting — a bundle that reaches node cannot execute on the phone.
 */
const NODE_IN_CLIENT_IS_FATAL = true

const repoRoot = path.resolve(import.meta.dirname ?? process.cwd(), "../../..")

/** How vite spells a node builtin it has swapped for a throwing browser Proxy. */
const browserExternalPrefix = "__vite-browser-external:"

/** The builtin a client import landed on, or undefined if the import is fine. */
function nodeBuiltinReached(dep: string): string | undefined {
  const id = dep.replace(/^\0/, "")
  if (id.startsWith(browserExternalPrefix)) {
    return id.slice(browserExternalPrefix.length) || "node"
  }
  // Belt and braces: some resolver paths hand back the bare specifier instead.
  if (id.startsWith("node:") || id.startsWith("bun:")) return id
  return undefined
}

/**
 * Fails the CLIENT build when a module in the in-shell SPA imports a node builtin.
 *
 * Vite does not error on these — it substitutes a Proxy that throws on first property
 * access, so the module dies at module-evaluation time in the browser and hydration
 * never begins. The build stays green and the .ipa ships a bundle that cannot run.
 * (TestFlight 197: a loading skeleton forever.) This turns that silence into a stop.
 *
 * Never add an allowlist here. The fix is to sever the reach, not to hide it.
 */
const noNodeInClient: Plugin = {
  name: "no-node-in-client",
  // The server build legitimately uses node builtins; only the browser bundle is held to this.
  applyToEnvironment: (environment) => environment.name === "client",
  buildEnd() {
    if (this.environment?.name !== "client") return

    const builtinsByImporter = new Map<string, Set<string>>()
    let importCount = 0
    for (const id of this.getModuleIds()) {
      const info = this.getModuleInfo(id)
      if (!info) continue
      for (const dep of [
        ...(info.importedIds ?? []),
        ...(info.dynamicallyImportedIds ?? []),
      ]) {
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

/**
 * See the same alias in `../vite.config.ts` for why. In short: `@shared/pages-query` is a
 * local-first facade whose local half reads the checkout through `checkout-roots` and the
 * `tools/lib` query engine. The phone has no checkout, so that half is dead code here, but
 * importing it drags node builtins into the SPA and the guard above rightly refuses the build.
 * `/ask-remote` is the facade's own remote branch, keeping the key-spelling adapter that
 * `@akasha/pages-query/ask` lacks, so this severs the reach without changing what a query means.
 */
const pagesQueryRemoteInClient: Plugin = {
  name: "pages-query-remote-in-client",
  // Must beat vite's own resolver, and must leave the server build's local reads alone.
  enforce: "pre",
  applyToEnvironment: (environment) => environment.name === "client",
  resolveId(source, importer, options) {
    if (source === "@shared/pages-query/ask") {
      return this.resolve("@shared/pages-query/ask-remote", importer, options)
    }
    if (source === "@shared/pages-query") {
      return this.resolve("@akasha/pages-query", importer, options)
    }
    return null
  },
}

export default defineConfig({
  base: "/",
  envDir: "..",
  plugins: [pagesQueryRemoteInClient, tailwindcss(), reactRouter(), noNodeInClient],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["rrule", "lucide-react"],
  },
  define: { ...supabaseClientEnvDefine(), ...buildShaDefine() },
})
