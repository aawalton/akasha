import type { RustModule } from "../../../../code-system/rust-modules/rust-module.page-type.ts"

export const watcherTrayUpdater = {
  id: "01a06034-87f3-7066-9d50-14fe57f95672",
  pageTypeSlug: "rust-module",
  slug: "watcher-tray-updater",
  definition: "how the tray replaces its own executable from the server",
  rust: "rs",
  moduleName: "updater",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A replacement is triggered where the server's version differs from the built version.",
    },
    {
      invariantKind: "departure",
      statement:
        "The running executable is renamed aside before the downloaded executable takes that name.",
    },
    {
      invariantKind: "departure",
      statement: "The renamed old executable is deleted at the next start.",
    },
    {
      invariantKind: "departure",
      statement: "A replaced tray waits for the next login rather than restarting itself.",
    },
  ],
} as const satisfies RustModule
