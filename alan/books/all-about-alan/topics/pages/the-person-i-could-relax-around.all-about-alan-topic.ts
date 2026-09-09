import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const thePersonICouldRelaxAround = {
  id: "01a06559-9d65-7ad2-a705-97034fc95e80",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-person-i-could-relax-around",
  title: "The Person I Could Relax Around",
  definition:
    "the one warm, always-there person my alarm could lie down around, and what it took to have one",
  parents: ["living-with-jen"],
  related: [
    "being-alone-at-the-centre",
    "what-it-costs-someone-to-know-me",
    "waiting-until-i-can-afford-people",
  ],
  settled:
    "Warmth is not the gate; a stranger's kindness reaches me. What a stranger cannot be is there tomorrow.\n\nThe third thing was an agreement: unconditional acceptance, belief in good intent, every hurt read as misunderstanding.\n\nThat agreement starved the alarm of its fuel, which is why she could settle me and a stranger could not.\n\nIt broke because she had been funding it by deferring her own needs on a bet retirement would pay them.\n\nSolitude avoids the damage and gives none of the settling.",
} as const satisfies AllAboutAlanTopic
