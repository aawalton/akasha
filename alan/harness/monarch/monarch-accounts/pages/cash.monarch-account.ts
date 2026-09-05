import type { MonarchAccount } from "../monarch-account.page-type.ts"

export const cash = {
  id: "01a06559-5ea8-7006-88e6-bf2d34dea7e9",
  pageTypeSlug: "monarch-account",
  slug: "cash",
  title: "Cash",
  definition: "money the family holds, standing in a cash management account",
  monarchId: "151732808422660966",
  accountDisplayName: "Cash",
  currentBalance: 12388.43,
  accountType: "depository",
  asset: true,
  accountActive: true,
  accountHidden: false,
} as const satisfies MonarchAccount
