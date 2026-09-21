import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const featureRequestListing = {
  id: "01a0c4bc-f055-7d82-8adf-7995b3cedca4",
  type: "page-type/module",
  slug: "feature-request-listing",
  definition: "one product's published feature requests, shaped for the page listing them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A site lists the published feature requests of its own product alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listed request carries its title, its ask, its points and how many boost it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listed request carries the slug a reader names it by to boost it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request with no title is listed under its slug.",
    },
  ],
} as const satisfies Module
