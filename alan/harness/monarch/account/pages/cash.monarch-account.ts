import type { MonarchAccount } from "akasha/alan/harness/monarch/account/monarch-account.page-type.types.ts"

export const cash = {
  id: "01a06559-5ea8-7006-88e6-bf2d34dea7e9",
  type: "page-type/monarch-account",
  slug: "cash",
  title: "Cash",
  definition: "money the family has, sitting in a cash management account",
  monarchId: "151732808422660966",
  accountDisplayName: "Cash",
  currentBalance: 12388.43,
  accountType: "depository",
  asset: true,
  accountActive: true,
  accountHidden: false,
  createdAt: "2026-09-03T03:39:10.888Z",
  updatedAt: "2026-09-15T17:32:25.000Z",
} as const satisfies MonarchAccount
