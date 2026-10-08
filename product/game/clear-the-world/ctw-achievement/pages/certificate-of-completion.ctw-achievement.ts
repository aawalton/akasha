import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const certificateOfCompletion = {
  id: "019dbb6d-9cb9-7e22-8ce9-c014b4ff7ec2",
  type: "page-type/ctw-achievement",
  slug: "certificate-of-completion",
  title: "Certificate of Completion",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 500000,
  description:
    "The Certificate of Completion is the final document in IMAS clearance — signed by the national mine action authority, it legally releases land back to civilian use. Earning one requires years of fieldwork, meticulous records, and zero shortcuts.",
  createdAt: "2026-04-23T17:40:16.185Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
