import type { Module } from "@akasha/code-system/module"

export const minedMotifCoverage = {
  id: "01a0674d-061c-7d8f-93d3-3e8ae2396834",
  pageTypeSlug: "module",
  slug: "mined-motif-coverage",
  definition: "whether the motifs the sweep read and the motifs the lore library names agree",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The motifs the sweep read are rows beside one mine page rather than a page type.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read from the files beside the page rather than asked of the store.",
    },
    {
      invariantKind: "departure",
      statement: "A numbered part is read while the part before that part is there.",
    },
    {
      invariantKind: "departure",
      statement: "A line naming no motif kind is sieved out before the line is parsed.",
    },
    {
      invariantKind: "departure",
      statement: "A motif is known by the style it dresses and the piece it covers.",
    },
    {
      invariantKind: "departure",
      statement: "A book is a motif whose piece is none.",
    },
    {
      invariantKind: "departure",
      statement: "A tome edition restates a book already named, so it is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A book item is covered where the library names any chapter of that style.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter entry is covered where an item names that style's book.",
    },
    {
      invariantKind: "departure",
      statement: "A name no parser reads is gathered and reported rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "No page carrying the rows is refused rather than answered as no motifs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Module
