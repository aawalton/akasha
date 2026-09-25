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
      statement: "A web app whose cluster service copies no addon bundle image publishes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The cluster service is found through the web app's page, by the repository of the image it copies.",
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
      statement: "The page states the hash of the files the bundle was made from beside the image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating the hash of this commit's files makes nothing again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Making the bundle and landing its image are two steps a deploy takes apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every compiler and builder run is awaited, so other work runs beside them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pack giving no archive refuses rather than publishing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push that fails refuses rather than landing an image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is written onto the page after the push rather than before that push.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The image lands as a mechanical change rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing writes the cluster service's manifests again, naming the new image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit that landing made is named to the deploy that asked for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That commit is pushed, so what the page names is kept outside this run as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run in the cluster lands no image, and hands the image back in what it says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The deploy that sent that run lands the image it hands back through the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image landed that never reaches origin refuses the deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No pod is pinned at this commit, so a push that fails leaves every pod servable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already naming this image and its sources lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page naming an image the registry lacks would stop the pull, so the push comes first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name pushed to and the name pulled from are one name.",
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
