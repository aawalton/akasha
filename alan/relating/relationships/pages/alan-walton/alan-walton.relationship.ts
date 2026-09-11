import type { Relationship } from "akasha/alan/relating/relationships/relationship.page-type.types.ts"

export const alanWalton = {
  id: "019db533-f384-7d1e-bdc3-11c0b0ce3d74",
  type: "relationship",
  slug: "alan-walton",
  title: "Alan Walton",
  relationshipAccountUserId: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  relationshipCommitment: 5,
  relationshipConnection: 5,
  relationshipImpact: 5,
  relationshipInterest: 5,
  relationshipSmsHandlerTarget: "alan",
} as const satisfies Relationship
