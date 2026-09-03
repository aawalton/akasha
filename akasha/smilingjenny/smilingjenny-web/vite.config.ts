import { supabaseClientEnvDefine } from "@akasha/supabase-rr/client-env-define"
import { buildShaDefine } from "@akasha/web-build-version/build-sha-define"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  define: { ...supabaseClientEnvDefine(), ...buildShaDefine() },
})
