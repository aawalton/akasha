import type { MonarchAccount } from "akasha/alan/harness/monarch/account/monarch-account.page-type.types.ts"

export const personalProfile = {
  id: "01a06559-5ea8-7013-832c-a432c9370260",
  type: "page-type/monarch-account",
  slug: "personal-profile",
  title: "Personal Profile",
  definition: "money the family has, sitting in a checking account",
  monarchId: "148836305531181242",
  accountDisplayName: "Personal Profile",
  currentBalance: 42.15,
  accountType: "depository",
  asset: true,
  accountActive: true,
  accountHidden: false,
} as const satisfies MonarchAccount
