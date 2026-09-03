import type { RustCrate } from "../../code-system/rust-crates/rust-crate.page-type.ts"

export const watcherTray = {
  id: "01a06034-87f1-70ce-9bb8-126ea33109ad",
  pageTypeSlug: "rust-crate",
  slug: "watcher-tray",
  definition: "the Windows tray program keeping Temper's SavedVariables worker running",
  cargoManifest: "toml",
  cargoBuildScript: "rs",
  icon: "json",
  moduleSlugs: [
    "rust-module/watcher-tray-installer",
    "rust-module/watcher-tray-logger",
    "rust-module/watcher-tray-main",
    "rust-module/watcher-tray-supervisor",
    "rust-module/watcher-tray-tray",
    "rust-module/watcher-tray-updater",
  ],
  partSlugs: [
    "rust-module/watcher-tray-installer",
    "rust-module/watcher-tray-logger",
    "rust-module/watcher-tray-main",
    "rust-module/watcher-tray-supervisor",
    "rust-module/watcher-tray-tray",
    "rust-module/watcher-tray-updater",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The binary Cargo builds is named `temper-watcher` rather than named for the crate.",
    },
    {
      invariantKind: "departure",
      statement: "The version the tray reports itself as is fixed when the tray is built.",
    },
    {
      invariantKind: "departure",
      statement: "The server the tray reaches is fixed when the tray is built.",
    },
    {
      invariantKind: "departure",
      statement: "A release build opens no console window.",
    },
    {
      invariantKind: "departure",
      statement: "Every dependency is drawn from crates.io rather than from this repository.",
    },
  ],
} as const satisfies RustCrate
