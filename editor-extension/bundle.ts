export const summary = "Write the editor extension's source out as the one file the editor loads"

import { join } from "node:path"
import esbuild from "esbuild"

export const help = {
  description:
    "Bundle `src/extension.ts` into `dist/extension.js`, with its sourcemap beside it. The editor reads that file through the symlink at `code-editor/extensions/ops`, so a window reload draws what this wrote — in the checkout, in the build worktree and in the artefact Alan runs alike.",
  flags: [
    {
      name: "--watch",
      description:
        "Bundle again on every change under `src`, and hold the terminal until interrupted.",
    },
  ],
  exits: [
    { code: 0, meaning: "the bundle was written" },
    { code: 1, meaning: "the source does not bundle, and what stood in `dist` was left alone" },
  ],
  examples: ["ops editor-extension bundle", "ops editor-extension bundle --watch"],
}

const HERE = import.meta.dirname

const SOURCE = join(HERE, "src")

const OUT = join(HERE, "dist")

const WATCH = "--watch"

const OPTIONS: esbuild.BuildOptions = {
  platform: "node",
  format: "cjs",
  mainFields: ["module", "main"],
  bundle: true,
  minify: true,
  treeShaking: true,
  sourcemap: true,
  target: ["es2024"],
  external: ["vscode"],
  entryPoints: [join(SOURCE, "extension.ts")],
  outdir: OUT,
  logOverride: { "import-is-undefined": "error" },
}

export const BUNDLE = join(OUT, "extension.js")

export async function written(): Promise<string> {
  await esbuild.build(OPTIONS)
  const bytes = Bun.file(BUNDLE).size
  return `${BUNDLE} — ${bytes.toLocaleString("en-US")} bytes`
}

export default async function bundle(argv: readonly string[]): Promise<void> {
  if (!argv.includes(WATCH)) {
    console.log(await written())
    return
  }
  const again = async (): Promise<void> => {
    try {
      console.log(await written())
    } catch (err) {
      console.error(String(err))
    }
  }
  await again()
  const watcher = await import("@parcel/watcher")
  await watcher.subscribe(SOURCE, () => {
    void again()
  })
  console.log(`watching ${SOURCE}`)
  await new Promise(() => {})
}
