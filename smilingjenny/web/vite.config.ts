import { reactRouter } from "@react-router/dev/vite"
import { supabaseClientEnvDefine } from "@shared/supabase-rr/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  define: { ...supabaseClientEnvDefine() },
})
