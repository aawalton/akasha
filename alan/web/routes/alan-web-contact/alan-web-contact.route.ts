import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebContact = {
  id: "01a08828-5d45-7bd8-a16d-6e8d242d8a4c",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-contact",
  definition: "how a reader reaches Alan Walton",
  code: "tsx",
  urlPath: "contact",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The contact page states the business address the SMS submission declares.",
    },
    {
      invariantKind: "absence",
      statement: "No phone number is stated on the contact page.",
    },
  ],
} as const satisfies Route
