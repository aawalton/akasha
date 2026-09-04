import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const musicCommands = {
  id: "01a062f5-7bb2-750a-ba0b-8e132d65105f",
  pageTypeSlug: "workspace-package",
  slug: "music-commands",
  definition: "what an agent runs by name over Alan's music",
  manifest: "json",
  partSlugs: [
    "command/music-capture",
    "command/music-import-artist",
    "command/music-listening",
    "command/music-next",
    "command/music-now-playing",
    "command/music-play",
    "command/music-queue",
    "command/music-rate",
    "command/music-search",
    "module/play-row",
  ],
} as const satisfies WorkspacePackage
