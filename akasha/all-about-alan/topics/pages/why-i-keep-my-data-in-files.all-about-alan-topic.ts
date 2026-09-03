import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whyIKeepMyDataInFiles = {
  id: "01a04615-305e-763d-b28f-bedf12d64461",
  pageTypeSlug: "all-about-alan-topic",
  slug: "why-i-keep-my-data-in-files",
  title: "Why I Keep My Data In Files",
  definition: "why my context lives in files an agent can grep rather than in a database",
  parentSlugs: ["the-scaffolding-i-built"],
  relatedSlugs: [
    "why-i-rebuilt-everything",
    "what-i-gave-up-leaving-postgres",
    "what-i-invented-and-what-i-read",
  ],
  settled:
    "A database assumes you know exactly what you are looking for.\n\nA file system with grep assumes you do not know exactly what you are looking for, which is a much better fit for this case.\n\nI built a fully file-backed database from scratch and did a lift and shift of about three hundred tables out of Postgres into it.\n\nAll that context is now just a grep away.",
  unsettled: "Whether the win is grep itself or the shape I gave the files is not separated.",
} as const satisfies AllAboutAlanTopic
