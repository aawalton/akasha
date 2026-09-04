import type { MonarchAccount } from "../monarch-account.page-type.ts"

export const retirementRothIra4056 = {
  id: "01a06559-5ea8-7014-ad03-61794e63764b",
  pageTypeSlug: "monarch-account",
  slug: "retirement-roth-ira-4056",
  title: "Retirement - Roth IRA 4056",
  definition: "money the family holds, standing in a Roth IRA account",
  monarchId: "148836115017504939",
  accountDisplayName: "Retirement - Roth IRA (...4056)",
  currentBalance: 0,
  accountType: "brokerage",
  asset: true,
  accountActive: true,
  accountHidden: true,
} as const satisfies MonarchAccount
