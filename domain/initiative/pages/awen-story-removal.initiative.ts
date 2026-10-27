import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenStoryRemoval = {
  id: "01a17ebd-c381-7555-a2f4-8725060e8d3a",
  type: "page-type/initiative",
  slug: "awen-story-removal",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "No played story remains under `story/world/pages/`.",
      workingMemory:
        "Alan chose to remove all 20 played stories and the thornford, blue-boxes and personas worlds, written stories in them included. The personas world holds anthology, come-here, the-violet-hour, date-night-free-play and date-night-the-reading-room. Story-only panels such as tower-hud and the otherwhere-the-library ones may be left with no story.\n",
    },
    {
      statement:
        "The thornford, blue-boxes and personas worlds are gone, with every story in them.",
    },
    { statement: "No page names a removed story or world." },
  ],
  constraints: ["Every other world stays, with its lore and its read and written stories."],
  createdAt: "2026-10-27T19:02:08.001Z",
  updatedAt: "2026-10-27T19:02:08.001Z",
} as const satisfies Initiative
