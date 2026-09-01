import { reactRouter } from "@react-router/dev/vite"
import { buildShaDefine } from "@akasha/web-build-sha/build-sha-define"
import { supabaseClientEnvDefine } from "@akasha/supabase-rr/client-env-define"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"

/**
 * `@shared/pages-query` is a local-first facade: it reads the checkout standing on this machine
 * when the page type is backed there, and otherwise asks the store over HTTP. A browser has no
 * checkout, so the local half is dead code there — but importing it still pulls `./here.ts` ->
 * `@akasha/pages-system/checkout-roots` and the `tools/lib` query engine, and with them node
 * builtins. Vite answers a browser-side `node:fs` with a Proxy that throws on first property
 * access, so the module dies at module-evaluation time and hydration never begins.
 *
 * Aliasing the facade to its remote half severs that reach once, at the root, for every importer
 * — including the `@akasha/pages-access/*` modules that components legitimately share with the
 * server and so cannot simply stop importing.
 *
 * `/ask-remote` is the facade's own `there` branch, not `@akasha/pages-query/ask` directly: it
 * keeps `askedAsSpelled`, which camelizes declared keys on the way in (the store holds
 * `valueSlug` where a page type declares `value-slug`) and answers both spellings on the way
 * back. Aliasing past it would swap the transport AND silently change what a query matches.
 */
const pagesQueryRemoteInClient: Plugin = {
  name: "pages-query-remote-in-client",
  // Must beat vite's own resolver, and must leave the SSR build's local reads alone — the server
  // does stand on a checkout, and the loaders that read it are the whole point of the local half.
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
  plugins: [pagesQueryRemoteInClient, tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["rrule", "lucide-react"],
  },
  define: { ...supabaseClientEnvDefine(), ...buildShaDefine() },
})
