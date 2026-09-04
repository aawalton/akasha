import type { Module } from "@akasha/code-system/module"

export const seatInbox = {
  id: "01a069cb-0380-7a4e-8b01-50fca9c1ed00",
  pageTypeSlug: "module",
  slug: "seat-inbox",
  definition: "the messages waiting in one seat's directory, listed and taken",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ops dispatcher imports this and calls the default export it declares.",
    },
    {
      invariantKind: "departure",
      statement: "A peek lists the messages and takes none of them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message a live listener claimed is left alone unless the caller asks for all of them.",
    },
    {
      invariantKind: "departure",
      statement: "A body longer than the cap is cut short rather than printed whole.",
    },
  ],
} as const satisfies Module
