import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereMyImmuneSystemComesIn = {
  id: "01a0c591-a7a0-7494-b447-82c36e16ef6c",
  type: "page-type/all-about-alan-topic",
  slug: "where-my-immune-system-comes-in",
  title: "Where My Immune System Comes In",
  definition: "how immune activation reaches my symptoms, by the long way round",
  parents: ["all-about-alan-topic/what-comes-with-it"],
  related: ["all-about-alan-topic/what-wears-my-body-down"],
  settled:
    "The working hypothesis is that my immune system runs activated and that the activation adds to the load my body is carrying.\n\nWhat I feel comes from the load rather than from my immune system attacking my own tissue. That is a different shape from the usual autoimmune story.\n\nSo the activation is real and the route is long: it goes through the regulatory nervous system and shows up there rather than as damage anywhere I could point to.",
} as const satisfies AllAboutAlanTopic
