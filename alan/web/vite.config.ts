import { supabaseClientEnvGuard } from "akasha/alan/harness/supabase-rr/client-env-guard/client-env-guard.module.code.ts"
import { buildShaDefine } from "akasha/alan/harness/web-build-version/build-sha-define/build-sha-define.module.code.ts"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), supabaseClientEnvGuard()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["rrule", "lucide-react"],
  },
  define: { ...buildShaDefine() },
})
