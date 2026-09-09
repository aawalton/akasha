import type { Command } from "../../../command.page-type.ts"

export const infrastructureWorkloadApply = {
  id: "01a0887c-95ad-74ed-a762-ccbbe4849027",
  pageTypeSlug: "command",
  type: "command",
  slug: "infrastructure-workload-apply",
  definition: "the command putting a cluster service's manifests into the cluster",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  timeout: 600,
  taking: [
    { said: "<slug>", takes: "the cluster service to apply, named by the slug its page carries" },
    { said: "--dry-run", takes: "say what would be applied and change nothing" },
  ],
  helpNotes: [
    "one call applies one cluster service, and a second name is refused rather than chosen between.",
    "the workload comes from the cluster service's own page, and the manifests from the code beside the manifest page that service names.",
    "a slug a web app also carries is no trouble here, since nothing on this call is read as a web app.",
    "whether a manifest is already there is asked of the cluster rather than remembered, so a second call applies nothing.",
    "a manifest carrying a value nothing filled in is refused before anything is applied.",
    "the namespace is applied first and the workload last, and a workload with a pod template is waited on until its rollout is done.",
    "this puts up a cluster service no web app names, which `akasha infrastructure deploy` cannot reach.",
    "nothing here builds anything, since a cluster service runs the image its page names.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An apply names one cluster service.",
    },
    {
      invariantKind: "departure",
      statement: "The workload applied is read from the cluster service's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster already as a cluster service's page describes is applied nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the same plan the run would carry out.",
    },
    {
      invariantKind: "departure",
      statement: "A kubectl that refuses makes the call refuse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds the source a workload runs.",
    },
  ],
} as const satisfies Command
