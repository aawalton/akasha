import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployBundlePublishing = {
  id: "01a090c2-cad0-7d60-8365-27184838f8ac",
  type: "module",
  slug: "deploy-bundle-publishing",
  definition: "the addon bundle a web app serves, put into the registry under its content hash",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A web app whose page states no addon bundle image publishes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every addon is compiled and packed here rather than by a call made first.",
    },
    {
      invariantKind: "departure",
      statement: "The image is named by the hash of the archive inside.",
    },
    {
      invariantKind: "departure",
      statement: "A commit changing no addon publishes no new image.",
    },
    {
      invariantKind: "departure",
      statement: "A pack giving no archive refuses rather than publishing.",
    },
    {
      invariantKind: "departure",
      statement: "A push that fails refuses rather than landing a tag.",
    },
    {
      invariantKind: "departure",
      statement: "The tag is written after the push rather than before that push.",
    },
    {
      invariantKind: "departure",
      statement: "Where the tag sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "The tag lands as a mechanical change rather than written here.",
    },
    {
      invariantKind: "departure",
      statement: "The commit that landing made is named to the deploy that asked for it.",
    },
    {
      invariantKind: "departure",
      statement: "A tag already naming this image lands nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a tag names this image is read off the hash it states rather than off its text.",
    },
    {
      invariantKind: "departure",
      statement: "The tag on disk is wrapped by the formatter and what is composed here is not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tag naming an image the registry lacks would stop the pull, so the push comes first.",
    },
    {
      invariantKind: "departure",
      statement: "The name pushed to and the name pulled from are two names for one registry.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run compiles nothing, packs nothing and pushes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The image assembly and the push are each bounded.",
    },
  ],
} as const satisfies Module
