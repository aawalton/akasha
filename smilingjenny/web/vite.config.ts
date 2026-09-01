import { reactRouter } from "@react-router/dev/vite"
import { supabaseClientEnvDefine } from "@shared/supabase-rr/vite"
import { buildShaDefine } from "@akasha/web-build-sha/build-sha-define"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  define: { ...supabaseClientEnvDefine(), ...buildShaDefine() },
})
