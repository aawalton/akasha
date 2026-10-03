import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const fairweatherSystem = {
  id: "01a10217-60b3-725d-9145-89f9253d5959",
  type: "page-type/world-mechanic",
  slug: "fairweather-system",
  title: "The System",
  world: "world/fairweather",
  description:
    "The power that gives every person a class at the coming-of-age ceremony and shows each person windows of their own: name, class, level, experience, skills, and bonds. A bond is shown plainly, as a person's name and a number for how strong it is. The System says nothing beyond what it tracks: it never explains, judges or advises. In the prose a window is a few short boxed lines of text.",
} as const satisfies WorldMechanic
