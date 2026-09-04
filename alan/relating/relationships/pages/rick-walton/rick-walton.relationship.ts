import type { Relationship } from "../../relationship.page-type.ts"

export const rickWalton = {
  id: "019db533-f382-7989-aa89-a6b545b5372a",
  pageTypeSlug: "relationship",
  slug: "rick-walton",
  title: "Rick Walton",
  relationshipCommitment: 3,
  relationshipConnection: 3,
  relationshipCurrentCircle: "deceased",
  email: "rick@rickwalton.com",
  relationshipImpact: 5,
  relationshipInterest: 4,
  relationshipLinkedinUrl: "https://www.linkedin.com/in/rick-walton-1458ab41",
} as const satisfies Relationship
