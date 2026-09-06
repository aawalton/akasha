import type { Question } from "../question.page-type.ts"

export const collectionsSuiteLicensing15663TheSkyshardsLorebooksSo = {
  id: "019f71e2-fbf1-75eb-bb32-e59daf2cd5ee",
  pageTypeSlug: "question",
  slug: "collections-suite-licensing-15663-the-skyshards-lorebooks-so",
  ask: "Collections suite licensing (#15663): the SkyShards + LoreBooks sources are dual-licensed MIT / CC BY-NC-SA 4.0 — the NC (non-commercial) + SA (share-alike copyleft) terms go beyond simple attribution. What licensing posture do you want for the Temper suite?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "Repo-doc provenance is sufficient (personal use, not distributed — lightest posture)",
    "Add formal NOTICE/LICENSE in the addon dir carrying both licenses (belt-and-suspenders)",
    "Full SA compliance: derivative carries CC BY-NC-SA + NOTICE (strictest)",
  ],
  answer: "Repo-doc provenance is sufficient (personal use, not distributed — lightest posture)",
  closedAt: "2026-07-17T21:02:55.772Z",
  context: "txt",
} as const satisfies Question
