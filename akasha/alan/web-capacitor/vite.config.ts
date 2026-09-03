import path from "node:path"
import { supabaseClientEnvDefine } from "@akasha/supabase-rr/client-env-define"
import { buildShaDefine } from "@akasha/web-build-version/build-sha-define"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
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

// A `pages-query-remote-in-client` plugin sat here and in `../web/vite.config.ts`, aliasing
// `@shared/pages-query` and its `/ask` onto their remote halves so the phone bundle would not
// drag `checkout-roots` and the `tools/lib` query engine — and the node builtins under them —
// into the SPA, which is exactly what the guard above refuses a build for.
//
// The local half is gone: `@shared/pages-query` asks and writes over HTTP on every path, and
// `./ask` and `./ask-remote` name one file, so both rules resolved a module onto itself. The
// guard above is what says this is still true, and it says it about every module in the bundle
// rather than about the two specifiers this named.

export default defineConfig({
  base: "/",
  // `@akasha/alanwalton-web` is where the env file the client bundle is built against stands,
  // and the two apps are built against one set of names.
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
