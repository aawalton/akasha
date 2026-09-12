import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const desktopWallpaperSetting = {
  id: "01a0786b-2a28-7d50-91e5-a54586893638",
  type: "module",
  slug: "desktop-wallpaper-setting",
  definition: "how Alan's desktop wallpaper is set to a persona's own picture",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The persona shown is the persona Alan messaged most recently.",
    },
    {
      invariantKind: "departure",
      statement:
        "The personas are ordered by the shared wallpaper order rather than by a rule here.",
    },
    {
      invariantKind: "departure",
      statement: "A persona with no desktop wallpaper is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A persona whose wallpaper file is absent is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The wallpaper Plasma is pointed at is the file beside the persona's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A run finding no wallpaper on disk exits non-zero and says so.",
    },
    {
      invariantKind: "departure",
      statement: "The command setting the wallpaper is handed in so that a test sets nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here copies a wallpaper's bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A persona's last-messaged stamp is read from the file beside her page.",
    },
    {
      invariantKind: "departure",
      statement: "The wallpaper is set the moment a persona's page or the file beside it changes.",
    },
    {
      invariantKind: "departure",
      statement: "A round is passed over while the key is holding the desktop black.",
    },
    {
      invariantKind: "departure",
      statement:
        "The desktop is black or a persona's picture, and the key alone moves between them.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks on a schedule what the wallpaper should be.",
    },
  ],
} as const satisfies Module
