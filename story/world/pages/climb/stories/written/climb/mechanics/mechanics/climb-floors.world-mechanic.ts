import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const climbFloors = {
  id: "01a0f953-d88d-7b78-9a03-efc1edd91ecf",
  type: "page-type/world-mechanic",
  slug: "climb-floors",
  title: "Floors",
  world: "world/climb",
  description:
    'Alan woke on floor 1 of a sealed tower with no known top, among other people the tower took, and the only way out is the stairs up. The climbers pass on a rumor that whoever passes the 100th floor is granted a wish, and nobody in the tower knows if it is true. Every floor is a staged world, a bathhouse, a masquerade, a throne room, with one sexual task set for the climbers on it, such as every climber on this floor comes at once. A floor holds nobody of its own: the only people on it are climbers. The task is said plainly the moment the climbers arrive, by a voice, a placard or words on the wall, in plain sexual words. Nobody knows the floors above. There is no failure and nothing is rolled: the climbers keep at the task until it is done, and the stairs open the moment it is met, never before. A floor is never skipped or hurried: the task is met in the prose, act by act. The world builder designs each floor, its staging, its task and any new climber met on it, and lands it as lore on a place page, `story/world/pages/climb/places/climb-floor-<n>.place.ts`, by the chapter Alan reaches it. The mechanics story recorder files each floor the chapter its task is first stated, at `story/world/pages/climb/stories/written/climb/mechanics/floors/pages/climb-floor-<n>.climb-floor.ts`, titled `Floor <n>: <the staging>`, with `character: "character-player/climb-alan"`, `objective` the task as the prose states it, and `status: "active"`; the chapter the prose shows the task met and the stairs open, it changes that floor\'s `status` to `complete`.',
} as const satisfies WorldMechanic
