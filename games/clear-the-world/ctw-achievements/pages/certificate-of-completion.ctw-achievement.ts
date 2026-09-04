import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const certificateOfCompletion = {
  id: "019dbb6d-9cb9-7e22-8ce9-c014b4ff7ec2",
  pageTypeSlug: "ctw-achievement",
  slug: "certificate-of-completion",
  title: "Certificate of Completion",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 500000,
  description:
    "The Certificate of Completion is the final document in IMAS clearance — signed by the national mine action authority, it legally releases land back to civilian use. Earning one requires years of fieldwork, meticulous records, and zero shortcuts.",
} as const satisfies CtwAchievement
