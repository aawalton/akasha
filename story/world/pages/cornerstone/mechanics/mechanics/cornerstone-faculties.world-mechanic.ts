import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const cornerstoneFaculties = {
  id: "01a0dee5-5ff9-7451-8bd4-98d07f06bae3",
  type: "page-type/world-mechanic",
  slug: "cornerstone-faculties",
  title: "Faculties",
  world: "world/cornerstone",
  description:
    "The Waking Stone has no classes, HP or skills. It has six Faculties, senses and powers that wake one structure at a time, so its mind and its domain grow together: the stronger the town, the more of the core is awake. Touch (Presence) is innate: direct physical contact with the bound soil, such as footsteps, digging, the weight of a wagon or a foundation laid, and it caps at Depth 3. The other five are dormant until a structure awakens them. Sight is awakened by a vantage (watch-cairn, lookout, tower) and governs perception beyond the soil: the land, approaching figures, weather, the horizon. Warmth is awakened by a gathering-hearth (common fire, hearth-hall) and governs the inner state of people: moods, needs, health, who is content and who is quietly leaving. Provision is awakened by a surface store (storehouse, granary, larder, cellar, shallow draw-well) and governs resources and scarcity: what the land yields above and what is held, the dwindle of stores, the coming of want. Memory is awakened by a keeping-place (marker-stone, shrine, archive) and governs the core's own continuity: holding what it learns across time, recalling the dead and the town's story, and the thread back toward who it once was. Reach is awakened by a deep-driven work (borehole, mineshaft, deep foundation, delvings) and governs the extent of the bound land: how far the core's body stretches underground and out, so deepening Reach grows the domain. A structure whose signature is what is gathered above and stored awakens Provision, and one whose signature is downward or outward extent awakens Reach: a shallow draw-well wakes Provision, and a borehole wakes Reach.",
} as const satisfies WorldMechanic
