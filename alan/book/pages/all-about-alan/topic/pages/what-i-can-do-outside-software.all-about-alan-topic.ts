import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatICanDoOutsideSoftware = {
  id: "01a0c5a0-a31f-7bf3-88d6-eeabbe93ac23",
  type: "page-type/all-about-alan-topic",
  slug: "what-i-can-do-outside-software",
  title: "What I Can Do Outside Software",
  definition:
    "the hands-on skills I hold at amateur level, and what turns them into real capability",
  parents: ["all-about-alan-topic/what-doing-it-myself-looks-like"],
  related: ["all-about-alan-topic/what-i-spend-on-compute"],
  settled:
    "Decent amateur across a spread of them. Cooking, medicine and first aid, money and investing, fixing cars, fixing the house through plumbing, electrical, heating and carpentry, gardening, sewing, and negotiating a contract.\n\nJen is professional level at the cooking. Mine is amateur.\n\nKeeping animals is out. Not an interest, and not a route I will take.\n\nWhat turns decent amateur into something I can act on is AI. Knowing roughly how a heating system works and being able to diagnose and repair one in the moment are different things, and the reasoning I get from a model is most of that gap.\n\nWhich is what makes that one dependency load-bearing in a way the rest are not. It multiplies everything else I can do.\n\nI have a lot of hand tools and power tools, garden tools, and a laser engraver. The garage is free and could be a workshop.",
} as const satisfies AllAboutAlanTopic
