import type { Module } from "@akasha/code-system/module"

export const songSlug = {
  id: "01a06262-ff4c-7001-86ff-443d16400dc0",
  pageTypeSlug: "module",
  slug: "song-slug",
  definition: "the name a song page or an artist page is reached by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An artist's slug is the artist's name slugged.",
    },
    {
      invariantKind: "departure",
      statement: "A song's slug is the artist's slug followed by the slugged title.",
    },
    {
      invariantKind: "departure",
      statement: "An empty title slugs as `untitled`.",
    },
    {
      invariantKind: "departure",
      statement: "A diacritic is folded off a letter before the letter is slugged.",
    },
    {
      invariantKind: "departure",
      statement: "A run of characters that is no letter and no digit becomes one dash.",
    },
    {
      invariantKind: "departure",
      statement: "A slug carries no dash at either end.",
    },
    {
      invariantKind: "departure",
      statement: "A colliding slug is the base followed by a number.",
    },
    {
      invariantKind: "departure",
      statement: "The first number a colliding slug is offered is the number two.",
    },
    {
      invariantKind: "departure",
      statement: "A number another slug already carries gives way to the next number up.",
    },
    {
      invariantKind: "departure",
      statement: "A base a thousand slugs already carry is thrown rather than numbered again.",
    },
    {
      invariantKind: "departure",
      statement: "An existing song keeps the name the song already has.",
    },
    {
      invariantKind: "departure",
      statement: "A song is recognised as existing by the external id the song was filed under.",
    },
    {
      invariantKind: "departure",
      statement: "A name given out in a run is taken for the rest of that run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the page store.",
    },
  ],
} as const satisfies Module
