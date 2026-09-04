import type { PageType } from "@akasha/pages-system/page-type"
import type { MonarchRecord } from "../monarch-records/monarch-record.page-type.ts"
import type { AccountActive } from "./properties/account-active.boolean-property.ts"
import type { AccountDisplayName } from "./properties/account-display-name.text-property.ts"
import type { AccountHidden } from "./properties/account-hidden.boolean-property.ts"
import type { AccountType } from "./properties/account-type.select-property.ts"
import type { Asset } from "./properties/asset.boolean-property.ts"
import type { CurrentBalance } from "./properties/current-balance.number-property.ts"

export type MonarchAccount = MonarchRecord & {
  accountDisplayName: AccountDisplayName
  currentBalance: CurrentBalance
  accountType: AccountType
  asset: Asset
  accountActive: AccountActive
  accountHidden: AccountHidden
}

export const monarchAccount = {
  id: "01a0680a-1a00-7008-8d64-7a3b9e1f1109",
  pageTypeSlug: "page-type",
  slug: "monarch-account",
  definition: "one balance, whether it is money held or money owed",
  pluralSlug: "monarch-accounts",
  extendsSlug: ["page-type/monarch-record"],
  partSlugs: [
    "boolean-property/account-active",
    "boolean-property/account-hidden",
    "boolean-property/asset",
    "number-property/current-balance",
    "select-property/account-type",
    "text-property/account-display-name",
  ],
  properties: [
    { pagePropertySlug: "account-display-name", required: true, many: false },
    { pagePropertySlug: "current-balance", required: true, many: false },
    { pagePropertySlug: "account-type", required: true, many: false },
    { pagePropertySlug: "asset", required: true, many: false },
    { pagePropertySlug: "account-active", required: true, many: false },
    { pagePropertySlug: "account-hidden", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An account holding no transaction is still an account, a retirement or brokerage balance moving without a row standing against it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Monarch reopens a closed account under a second id rather than reviving the first, so two accounts carry the same last four digits.",
    },
    {
      invariantKind: "departure",
      statement: "An account named by digits alone takes `account-` ahead of them for its slug.",
    },
    {
      invariantKind: "gap",
      statement: "A transaction whose account has no page is dropped by the sync without a word.",
    },
  ],
} as const satisfies PageType
