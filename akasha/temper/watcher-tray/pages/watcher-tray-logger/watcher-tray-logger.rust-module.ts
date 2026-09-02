import type { RustModule } from "../../../../code-system/rust-modules/rust-module.page-type.ts"

export const watcherTrayLogger = {
  id: "01a06034-87f3-7e8f-8172-3c3603e9bb0c",
  pageTypeSlug: "rust-module",
  slug: "watcher-tray-logger",
  definition: "the rotating log file the tray writes its lines to",
  rust: "rs",
  moduleName: "logger",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A log line carries an instant and a level before the message.",
    },
    {
      invariantKind: "departure",
      statement: "The live log is rotated once it reaches a megabyte.",
    },
    {
      invariantKind: "departure",
      statement: "Three log files are kept.",
    },
    {
      invariantKind: "departure",
      statement: "A log that could not be written is dropped rather than thrown on.",
    },
    {
      invariantKind: "departure",
      statement: "The instant is worked out here rather than drawn from a date library.",
    },
  ],
} as const satisfies RustModule
