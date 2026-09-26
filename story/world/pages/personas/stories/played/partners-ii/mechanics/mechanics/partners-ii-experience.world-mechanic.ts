import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const partnersIiExperience = {
  id: "01a0de09-7e12-72f7-8413-4cef2f8c26bf",
  type: "page-type/world-mechanic",
  slug: "partners-ii-experience",
  title: "Experience and Growth",
  description:
    "Experience comes from adventure, discovery and clever play, and is awarded per scene, never per kill. A scene's award is one of four: a standard scene, a significant obstacle, a major arc beat, or a bonus for discovery or clever play. The numbers and the level curve are hidden; experience totals show on the sheet only, and a level-up is the event a window marks. A level raises attribute points and skill capacity. There are six attributes: Might, Grace, Vitality, Mind, Essence and Presence; they grow at level-up and through training, deeds and bonds. Skills are learned by doing and deepened by training; their ranks show, and the thresholds between ranks do not.",
} as const satisfies WorldMechanic
