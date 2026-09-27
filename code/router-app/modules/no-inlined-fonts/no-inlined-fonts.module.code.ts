import type { Plugin } from "vite"

const FONT_FILE = /\.(woff2?|ttf|otf)$/

export function noInlinedFonts(): Plugin {
  return {
    name: "no-inlined-fonts",
    config: () => ({
      build: {
        assetsInlineLimit: (file: string) => (FONT_FILE.test(file) ? false : undefined),
      },
    }),
  }
}
