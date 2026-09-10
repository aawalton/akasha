import { supabaseClientEnvDefine } from "akasha/alan/harness/supabase-rr/client-env-define/client-env-define.module.code.ts"
import { buildShaDefine } from "akasha/alan/harness/web-build-version/build-sha-define/build-sha-define.module.code.ts"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

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
