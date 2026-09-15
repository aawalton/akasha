import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployBundlePublishing = {
  id: "01a090c2-cad0-7d60-8365-27184838f8ac",
  type: "module",
  slug: "deploy-bundle-publishing",
  definition: "the addon bundle a web app serves, put into the registry under its content hash",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A web app whose page states no addon bundle image publishes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every addon is compiled and packed here rather than by a call made first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The image is named by the hash of the archive inside.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commit changing no addon publishes no new image.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pack giving no archive refuses rather than publishing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push that fails refuses rather than landing a tag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tag is written after the push rather than before that push.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the tag sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tag lands as a mechanical change rather than written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The commit that landing made is named to the deploy that asked for it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tag already naming this image lands nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether a tag names this image is read off the hash it states rather than off its text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tag on disk is wrapped by the formatter and what is composed here is not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A tag naming an image the registry lacks would stop the pull, so the push comes first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name pushed to and the name pulled from are two names for one registry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run compiles nothing, packs nothing and pushes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The image assembly and the push are each bounded.",
    },
  ],
} as const satisfies Module
