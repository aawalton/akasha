import type { Module } from "../../code-system/modules/module.page-type.ts"

export const icloudShare = {
  id: "01a06553-a9b6-709a-8c65-276ca0dc4531",
  pageTypeSlug: "module",
  slug: "icloud-share",
  definition: "a shared iCloud album read as the photos the album holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A share is named by the token after `/photos/` in a `share.icloud.com` address.",
    },
    {
      invariantKind: "departure",
      statement: "The album is resolved once.",
    },
    {
      invariantKind: "departure",
      statement: "What resolving the album answers keys every later ask.",
    },
    {
      invariantKind: "constraint",
      statement: "Two hundred photos are asked for at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A page answering no photo is where the album ends.",
    },
    {
      invariantKind: "departure",
      statement: "Only a master record carries a photo.",
    },
    {
      invariantKind: "departure",
      statement: "A master record carrying no original asset is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file name is the record name where what iCloud encoded reads as no name.",
    },
    {
      invariantKind: "departure",
      statement: "A name already taken is numbered from two before its extension.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network or writes a file.",
    },
  ],
} as const satisfies Module
