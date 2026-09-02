import type { RustModule } from "../../../../code-system/rust-modules/rust-module.page-type.ts"

export const watcherTrayTray = {
  id: "01a06034-87f2-76b4-8069-614fc1aa1871",
  pageTypeSlug: "rust-module",
  slug: "watcher-tray-tray",
  definition: "the notification area icon and the menu behind it",
  rust: "rs",
  moduleName: "tray",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The icon is compiled into the binary rather than read at run time.",
    },
    {
      invariantKind: "departure",
      statement: "The menu opens the log file and the SavedVariables folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A SavedVariables folder under OneDrive is preferred over the folder under the profile.",
    },
    {
      invariantKind: "departure",
      statement: "Quitting kills the worker before the event loop exits.",
    },
  ],
} as const satisfies RustModule
