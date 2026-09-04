import type { Book } from "../../book.page-type.ts"

export const theRobotRobotsAndEmpire = {
  id: "019db533-f38b-7151-88df-8e1dc5179834",
  pageTypeSlug: "book",
  slug: "the-robot-robots-and-empire",
  title: "The Robot: Robots and Empire",
  status: "not-started",
  author: "Isaac Asimov",
  unitSlug: "words",
  position: 5,
  ownLength: 110250,
  publishedAt: "2023-09-14",
  source: "kindle",
  externalId: "B07GKW24B9",
  externalLink: "https://amazon.com/dp/B07GKW24B9",
} as const satisfies Book
