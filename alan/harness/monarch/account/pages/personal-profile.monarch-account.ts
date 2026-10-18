import type { MonarchAccount } from "akasha/alan/harness/monarch/account/monarch-account.page-type.types.ts"

export const personalProfile = {
  id: "01a06559-5ea8-7013-832c-a432c9370260",
  type: "page-type/monarch-account",
  slug: "personal-profile",
  title: "Personal Profile",
  definition: "money the family has, sitting in a checking account",
  monarchId: "148836305531181242",
  accountDisplayName: "Personal Profile",
  currentBalance: 89.15,
  accountType: "depository",
  asset: true,
  accountActive: true,
  accountHidden: false,
  createdAt: "2026-09-03T03:39:10.888Z",
  updatedAt: "2026-10-18T06:19:13.690Z",
} as const satisfies MonarchAccount
