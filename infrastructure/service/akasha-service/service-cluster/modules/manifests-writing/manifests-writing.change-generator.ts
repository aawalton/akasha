import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const manifestsWriting = {
  id: "01a0d5e3-4dff-76c0-9bb9-852459817a33",
  type: "page-type/change-generator",
  slug: "manifests-writing",
  definition:
    "the manifests a web app's cluster service is applied as, written beside its page from its pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One code writes the manifests of every cluster service stating a manifests file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The manifests are read from the cluster service's page and the web app naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The secret a web app's page names is the secret its container is handed whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pod template carries the hash of the sealed files of the secret pages placing into it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sealed file changing rolls the pod, as the value it seals changing does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value a secret seals is read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is the repository the page states, tagged with the commit placeholder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating an image with a tag of its own is said rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page and body is read through the change rather than off the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A manifests file already with the body that would be written again is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service stating too little to be written is said rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here refuses a landing.",
    },
  ],
} as const satisfies ChangeGenerator
