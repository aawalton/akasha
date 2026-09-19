import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployBundlePublishing = {
  id: "01a090c2-cad0-7d60-8365-27184838f8ac",
  type: "page-type/module",
  slug: "deploy-bundle-publishing",
  definition: "the addon bundle a web app serves, put into the registry under its content hash",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app whose page states no addon bundle image publishes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every addon is compiled and packed here rather than by a call made first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is named by the hash of the archive inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit changing no addon publishes no new image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pack giving no archive refuses rather than publishing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push that fails refuses rather than landing a tag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tag is written after the push rather than before that push.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the tag sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tag lands as a mechanical change rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit that landing made is named to the deploy that asked for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag already naming this image lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a tag names this image is read off the hash it states rather than off its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tag on disk is wrapped by the formatter and what is composed here is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tag naming an image the registry lacks would stop the pull, so the push comes first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name pushed to and the name pulled from are one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dry run compiles nothing, packs nothing and pushes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is built and pushed by the cluster's builder in one bounded step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle and the version file reach the builder as the folder holding them.",
    },
  ],
} as const satisfies Module
