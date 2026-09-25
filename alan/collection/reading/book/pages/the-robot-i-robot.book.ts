import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theRobotIRobot = {
  id: "019db533-f38b-7159-957e-961814603d32",
  type: "page-type/book",
  slug: "the-robot-i-robot",
  title: "The Robot: I, Robot",
  status: "not-started",
  author: "Isaac Asimov",
  unit: "unit/words",
  position: 1,
  ownLength: 76000,
  publishedAt: "2004-06-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FC1PW0",
      externalLink: "https://amazon.com/dp/B000FC1PW0",
    },
  ],
} as const satisfies Book
