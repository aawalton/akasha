import type { BrowserExtension } from "akasha/infrastructure/service/akasha-service/browser-extension/browser-extension.page-type.types.ts"

export const streamingWatching = {
  id: "01a18818-57d5-74ec-be59-49a4420be06e",
  type: "page-type/browser-extension",
  slug: "streaming-watching",
  definition:
    "the browser extension that writes the episodes and movies Alan watches on a streaming service",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode or a film played to its end is recorded as watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the extension cannot read the show and the episode from records nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show or a film akasha holds no page for is left alone rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The season is finished and the show begun as the episode is recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every read and write of a page goes through alanwalton.com as Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode already recorded is recorded again as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A streaming service is read by its own code beside the code reading the others.",
    },
  ],
  createdAt: "2026-10-29T14:37:39.156Z",
  updatedAt: "2026-10-30T15:21:34.814Z",
} as const satisfies BrowserExtension
