import type { Relationship } from "akasha/alan/relationships/relationship/relationship.page-type.types.ts"

export const brianHawks = {
  id: "019db533-f385-7111-a1e4-f497ebfeb475",
  type: "page-type/relationship",
  slug: "brian-hawks",
  title: "Brian Hawks",
  relationshipCommitment: 3,
  relationshipConnection: 3,
  relationshipImpact: 2,
  relationshipInterest: 2,
} as const satisfies Relationship
