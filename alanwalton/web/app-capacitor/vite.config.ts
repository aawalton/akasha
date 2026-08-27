import { reactRouter } from "@react-router/dev/vite"
import { buildShaDefine } from "@shared/pages-ui/vite"
import { supabaseClientEnvDefine } from "@shared/supabase-rr/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  base: "/",
  envDir: "..",
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["rrule", "lucide-react"],
  },
  define: { ...supabaseClientEnvDefine(), ...buildShaDefine() },
})
