import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theChildhoodIHaveWrittenDown = {
  id: "01a0c5a9-bc5f-78c3-8252-6fc86e7c884f",
  type: "page-type/all-about-alan-topic",
  slug: "the-childhood-i-have-written-down",
  title: "The Childhood I Have Written Down",
  definition: "what the preschool and elementary chapters actually hold",
  parents: ["all-about-alan-topic/the-chapters-of-my-life"],
  related: [
    "all-about-alan-topic/the-years-with-my-parents",
    "all-about-alan-topic/what-i-take-in",
    "all-about-alan-topic/reaching-out-to-kerry",
  ],
  settled:
    "Preschool was southern Provo, dim and distant and still formative. I learned maths up through algebra there and first got my hands on a computer.\n\nAt six we moved to northern Provo and I started at Rock Canyon Elementary. I was a year too young for first grade, so they gave me readiness tests. I scored at fourth grade or above in every category, and would have scored higher except that I only knew my times tables up to four.\n\nI expanded socially until I wanted twenty friends at my tenth birthday. I met Rusty, Micah, David and Kerry. I trusted easily, connected easily, and felt well liked.\n\nThen I found social pressure. In fourth grade I told my mother I did not want to learn any more maths until my classmates caught up, and she registered me as a homeschool student. I kept going to the classes in term and studied through the summers as well.\n\nThat is where I learned to love reading, and I read voraciously.",
} as const satisfies AllAboutAlanTopic
