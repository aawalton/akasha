import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMetadataCopy = {
  id: "01a062d1-4a71-7f08-a4d5-3b9e7c02a1df",
  type: "module",
  slug: "addon-metadata-copy",
  definition: "everything an addon ships that is not its Lua, put into the addon's build output",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The load order is written before anything is copied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A document the addon does not hold is written by nothing here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Lua or markup the built manifest does not load refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What the build writes and what the manifest loads are the same set.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An asset is carried for a path to reach rather than for the manifest to load.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line opening with a hash loads nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line the game fills in while running loads every name that line reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What such a line fills in stops at the folder separator.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every directory under the addon's metadata folder is copied whole.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name the game fills in while running is copied by nothing here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A declared file the addon folder does not hold refuses the call.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A declared sibling addon that is neither a folder nor a manifest refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sibling folder is given the marker naming the build that wrote the sibling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Each file and folder written here is named to the caller as soon as it is written.",
    },
  ],
} as const satisfies Module
