import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogueHeld = {
  id: "01a09c06-fd09-7448-ae50-64aed341cbb5",
  type: "page-type/module",
  slug: "catalogue-held",
  definition: "the artists and songs already filed, read by what musicbrainz calls each",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist is found by the musicbrainz id on that artist's record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist nothing here holds is named for the name musicbrainz gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song is keyed by the musicbrainz id on that song's record.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network or writes a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An artist the musicbrainz id finds nothing for is found by the slug that name makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song is keyed by that id only where the song is the named artist's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A song of another artist under the same work is named, so no slug collides with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song is keyed by its title as well, so a song filed under no id is found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An artist whose titles meet no track already filed under that artist is a stranger of that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song is keyed by the musicbrainz id on it whoever that song is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A song filed under another artist takes this artist as a collection it is part of.",
    },
  ],
} as const satisfies Module
