import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theUmbrellaIHaveNotBought = {
  id: "01a0c593-a6c2-7711-bb25-768730c50560",
  type: "page-type/all-about-alan-topic",
  slug: "the-umbrella-i-have-not-bought",
  title: "The Umbrella I Have Not Bought",
  definition: "the liability cover above my other policies, and what it would be protecting",
  parents: ["all-about-alan-topic/what-i-am-insured-for"],
  related: ["all-about-alan-topic/putting-two-things-with-one-company"],
  settled:
    "Nothing of ours covers a liability bigger than the caps on the house and car policies.\n\nWhat a creditor could reach is about two point two million: about five hundred thousand of home equity and about one point seven million of liquid stock. The startup stock I cofounded, about a tenth of what we hold, sits outside that, because nobody can readily reach it.\n\nOne to two million of cover typically runs two to five hundred a year, which is nothing against that. It is the highest-leverage move open to me here.\n\nI would add it regardless of State Farm's D. It widens what is covered rather than putting me under anyone I am not already under.\n\nSo it goes to State Farm unless a B-rated carrier turns up, and then getting off the bundle flips the call.",
} as const satisfies AllAboutAlanTopic
