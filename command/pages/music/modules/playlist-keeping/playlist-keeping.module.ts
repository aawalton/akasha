import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playlistKeeping = {
  id: "01a0c57e-0bf2-7b9f-a50e-77e448d73f10",
  type: "page-type/module",
  slug: "playlist-keeping",
  definition: "the Spotify playlist a music command holds level with the tracks a picking gives",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist is followed where that artist's own page says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The playlist kept up to date is the one a playlist page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the playlist gains and loses is what the playlist-reconciling module says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks leave the playlist before tracks reach it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run wanting no track empties the playlist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A planning run reads Spotify and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run leaves the playlist in the order the picking gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A playlist already in that order is written no second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer counts what was added, what was removed and what was kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A planning run counts what it would add and remove, and counts nothing done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the playlist's link.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No playlist is made here.",
    },
  ],
} as const satisfies Module
