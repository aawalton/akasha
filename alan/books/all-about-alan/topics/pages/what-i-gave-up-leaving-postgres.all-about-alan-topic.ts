import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatIGaveUpLeavingPostgres = {
  id: "01a04615-305f-7b56-995d-0efcc02c79c6",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-i-gave-up-leaving-postgres",
  title: "What I Gave Up Leaving Postgres",
  definition: "the trade I actually made moving my data out of a database and into files",
  parentSlugs: ["why-i-keep-my-data-in-files"],
  settled:
    "I have not really given up anything so far, except the convenience of having things like indexes and caching already built.\n\nPostgres is ultimately built on files anyway, so I am effectively rebuilding a similar system with a different set of constraints.\n\nIn most cases performance has improved overall.\n\nGetting full version history from git by default has been really nice, and we have built an opt-out for cases that do not need it and move too fast.\n\nReusing the git content caches is also really nice.",
  unsettled:
    "Robust indexing and caching, a formula expression language, a query language and a service to make the store reachable from outside are all still being built.\n\nThe query language is there to replace what a traditional database does well without holding the data in two separate places and taking the skew risk. Whether one store serves both the known-item question and the search at scale is not yet shown.\n\nWhich cases take the version-history opt-out, and what makes them too fast for it, is unwritten.",
} as const satisfies AllAboutAlanTopic
