import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatIGaveUpLeavingPostgres = {
  id: "01a04615-305f-7b56-995d-0efcc02c79c6",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-i-gave-up-leaving-postgres",
  title: "What I Gave Up Leaving Postgres",
  definition: "the trade I actually made moving my data out of a database and into files",
  parents: ["why-i-keep-my-data-in-files"],
  settled:
    "I have not really given up anything so far, except the convenience of having things like indexes and caching already built.\n\nPostgres is ultimately built on files anyway, so I am effectively rebuilding a similar system with a different set of constraints.\n\nIn most cases performance has improved overall.\n\nGetting full version history from git by default has been really nice, and we have built an opt-out for cases that do not need it and move too fast.\n\nReusing the git content caches is also really nice.",
} as const satisfies AllAboutAlanTopic
