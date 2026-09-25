import type { Relationship } from "akasha/alan/relationships/relationship/relationship.page-type.types.ts"

export const alanWalton = {
  id: "019db533-f384-7d1e-bdc3-11c0b0ce3d74",
  type: "page-type/relationship",
  slug: "alan-walton",
  title: "Alan Walton",
  relationshipAccountUserId: "01a053fe-00ef-7d9b-9231-0340262cf86e",
  relationshipCommitment: 5,
  relationshipConnection: 5,
  relationshipImpact: 5,
  relationshipInterest: 5,
  relationshipPhone: "+16085122510",
  relationshipSmsAllowed: true,
  relationshipSmsHandlerTarget: "person/alan",
} as const satisfies Relationship
