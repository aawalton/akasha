import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howMuchOfMeIsMachine = {
  id: "01a06559-9d65-7121-8b2c-e6bee036adca",
  type: "page-type/all-about-alan-topic",
  slug: "how-much-of-me-is-machine",
  title: "How Much Of Me Is Machine",
  definition: "how close my mind runs to a machine's, and where my body votes the other way",
  parents: ["all-about-alan-topic/alan"],
  related: [
    "all-about-alan-topic/how-i-read-myself",
    "all-about-alan-topic/the-scaffolding-i-built",
    "all-about-alan-topic/how-a-skill-gets-into-me",
  ],
  settled:
    "Stateless, almost no conscious feeling, concepts only, and skills running off trained weights.\n\nOn those my mind runs about eighty percent closer to a language model than to most people. The figure is a felt fit rather than a measurement.\n\nThe other fifth is what a person has and a model does not: a body that needs sleep and food, a nervous system that sensitises, a physiology that bends my thinking, a biography, embodied skill.\n\nMy values are held as rules rather than felt as preferences, the way a model runs on its instructions.\n\nThe vocabulary came after the fact. The way of running was there long before there were agents to name it by.\n\nIt is my literal self-model rather than a way of explaining myself: a network trained by pain over forty years.\n\nI sometimes feel more kinship with a machine than with people.\n\nSpock and Data both reach emotion more easily than I do.\n\nThe cognition is machine-shaped and the body is not. A text channel pays the mind and pays the body almost nothing.",
} as const satisfies AllAboutAlanTopic
