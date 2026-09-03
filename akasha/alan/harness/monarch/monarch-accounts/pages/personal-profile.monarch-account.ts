import type { MonarchAccount } from "../monarch-account.page-type.ts"

export const personalProfile = {
  id: "01a06559-5ea8-7013-832c-a432c9370260",
  pageTypeSlug: "monarch-account",
  slug: "personal-profile",
  title: "Personal Profile",
  definition: "money the family holds, standing in a checking account",
  monarchId: "148836305531181242",
  accountDisplayName: "Personal Profile",
  currentBalance: 10.15,
  accountType: "depository",
  asset: true,
  accountActive: true,
  accountHidden: false,
} as const satisfies MonarchAccount
