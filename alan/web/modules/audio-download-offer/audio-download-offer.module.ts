import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const audioDownloadOffer = {
  id: "01a0a081-7f6a-7653-89bb-050c3254ad45",
  type: "page-type/module",
  slug: "audio-download-offer",
  definition: "the download a page's audio variants are offered with",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no audio variant is offered no download.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter with no title is offered the download under an empty title.",
    },
  ],
} as const satisfies Module
