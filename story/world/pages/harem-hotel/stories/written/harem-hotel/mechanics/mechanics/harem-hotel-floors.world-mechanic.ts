import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const haremHotelFloors = {
  id: "01a0e823-0b06-77c0-9c33-6b1cb0e67934",
  type: "page-type/world-mechanic",
  slug: "harem-hotel-floors",
  title: "Floors",
  world: "world/harem-hotel",
  description:
    'Alan woke on floor 1 of a sealed tower with no top, and the only way out is the stairs up. Every floor is a staged world, a bathhouse, a masquerade, a throne room, with one sexual task, such as bring all three attendants to climax together. The task is said plainly the moment he arrives, by a voice, a placard, or a woman of the floor saying it outright, and it is said in plain sexual words. The women of the floor play parts in its staging, and the task sets how many women the floor holds. There is no failure and nothing is rolled: Alan keeps at the task until it is done, however long that takes, and the stairs open the moment it is met, never before. A floor is never skipped or hurried: the task is met in the prose, act by act, before the stairs open. The world builder designs each floor, its staging, its task and the women dealt into it, and lands it as lore on a place page for the floor, `story/world/pages/harem-hotel/places/harem-hotel-floor-<n>.place.ts`, by the chapter Alan reaches it. The mechanics story recorder files each floor the chapter its task is first stated, at `story/world/pages/harem-hotel/stories/written/harem-hotel/mechanics/floors/pages/harem-hotel-floor-<n>.harem-hotel-floor.ts`, titled `Floor <n>: <the staging>`, with `character: "character-player/harem-hotel-alan"`, `objective` the task as the prose states it, and `status: "active"`; the chapter the prose shows the task met and the stairs open, it changes that floor\'s `status` to `complete`.',
} as const satisfies WorldMechanic
