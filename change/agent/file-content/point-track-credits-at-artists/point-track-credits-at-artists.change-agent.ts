import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const pointTrackCreditsAtArtists = {
  id: "01a0d4fe-26d1-7d82-81dc-134ed1bbde05",
  type: "page-type/change-agent",
  slug: "point-track-credits-at-artists",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page",
  definition: "every credit a track states pointed at the artist page its Spotify id names",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A credit stating a Spotify id an artist page states names that page instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A credit no artist page answers keeps the name Spotify credits and loses its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A credit naming an artist page already keeps that page and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The credits stay in the order the track states them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track whose credits would stay as they are is left unwritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One edit is made for each track, however many credits that track states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many tracks one run writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
