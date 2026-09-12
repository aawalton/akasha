import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deploySubjectListing = {
  id: "01a0957b-c2a5-712f-9271-e5ff26a1e3cd",
  type: "module",
  slug: "deploy-subject-listing",
  definition:
    "every thing of one kind a deploy could be run for, and what each states about being run",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subject is named by the slug a deploy would be handed.",
    },
    {
      invariantKind: "departure",
      statement: "The workstation kind is one subject, since the kind is put up whole.",
    },
    {
      invariantKind: "departure",
      statement: "That one subject is the page type's own page rather than any service's page.",
    },
    {
      invariantKind: "departure",
      statement: "The ios apps are read from their own reader rather than from the page index.",
    },
    {
      invariantKind: "departure",
      statement: "Every other kind is every page of that kind a deploy reads as that kind.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose slug a deploy reads as another kind is no subject of the kind it is filed under.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy of a web app's slug puts up the cluster service beside that web app.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose slug a deploy refuses to read is left a subject.",
    },
    {
      invariantKind: "departure",
      statement:
        "A container recipe naming no repository is no subject of the container recipe kind.",
    },
    {
      invariantKind: "departure",
      statement:
        "A recipe naming a repository is the one a deploy pushes; one naming none is built where it runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subject stating no cooldown carries the cooldown every service waits by default.",
    },
    {
      invariantKind: "departure",
      statement: "A subject naming services it deploys after carries their slugs alone.",
    },
    {
      invariantKind: "departure",
      statement: "The subjects of a kind come back ordered by slug.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says whether a subject wants a deploy.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what a deploy last put up.",
    },
  ],
} as const satisfies Module
