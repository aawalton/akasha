import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveVelraFamily = {
  id: "01a0e9f1-bb29-7f26-97a7-6e76b37fe8ae",
  type: "page-type/world-organization",
  slug: "super-supportive-velra-family",
  title: "Velra family",
  world: "world/super-supportive",
  aliases: ["the Velras"],
  description: "An Anesidoran family that keeps the Chainer class.",
} as const satisfies WorldOrganization
