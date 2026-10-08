import type { Relationship } from "akasha/alan/relationships/relationship/relationship.page-type.types.ts"

export const rickWalton = {
  id: "019db533-f382-7989-aa89-a6b545b5372a",
  type: "page-type/relationship",
  slug: "rick-walton",
  title: "Rick Walton",
  relationshipCommitment: 3,
  relationshipConnection: 3,
  relationshipCurrentCircle: "deceased",
  email: "rick@rickwalton.com",
  relationshipImpact: 5,
  relationshipInterest: 4,
  relationshipLinkedinUrl: "https://www.linkedin.com/in/rick-walton-1458ab41",
  createdAt: "2026-04-22T12:39:34.018Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies Relationship
