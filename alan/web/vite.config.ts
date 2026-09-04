import { supabaseClientEnvDefine } from "@akasha/supabase-rr/client-env-define"
import { buildShaDefine } from "@akasha/web-build-version/build-sha-define"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// A `pages-query-remote-in-client` plugin sat here, aliasing `@shared/pages-query` and its
// `/ask` onto their remote halves for the browser bundle only. `@shared/pages-query` was a
// local-first facade whose local half read the checkout standing on this machine through
// `./here.ts` -> `@akasha/pages-system/checkout-roots` and the `tools/lib` query engine. A
// browser has no checkout, so that half was dead code there, but importing it dragged node
// builtins in — and vite answers a browser-side `node:fs` with a Proxy that throws on first
// property access, so the module died at module-evaluation time and hydration never began.
// Aliasing severed the reach once, at the root, for every importer.
//
// The local half is gone. `@shared/pages-query` asks and writes over HTTP on every path now, and
// `./ask` and `./ask-remote` name one file, so both alias rules resolved a module onto itself.
// This app asks `@akasha/pages-system-service` directly for what it reads; what still reaches
// `@shared/pages-query` reaches it through `@akasha/pages-access`, and reaches nothing node-only
// on the way. `alan/web-capacitor`'s `no-node-in-client` guard is what holds that true.

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["rrule", "lucide-react"],
  },
  define: { ...supabaseClientEnvDefine(), ...buildShaDefine() },
})
