import { noInlinedFonts } from "akasha/code/router-app/modules/no-inlined-fonts/no-inlined-fonts.module.code.ts"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [noInlinedFonts(), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["rrule"],
  },
})
