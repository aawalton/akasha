import type { Command } from "@akasha/command-system/command"

export const pipelineLogs = {
  id: "01a06810-9439-7f94-909e-54c577b96586",
  pageTypeSlug: "command",
  slug: "pipeline-logs",
  definition: "the command fetching one pipeline step's pod log lines out of Loki, newest first",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<seq>", takes: "the pipeline the step ran in, named by its seq" },
    { said: "--workflow <name>", takes: "the workflow within that pipeline the step ran under" },
    { said: "--step <name>", takes: "the step within that workflow whose pod log to fetch" },
    {
      said: "--namespace <ns>",
      takes: "the cluster namespace the pod ran in, `ci` where none is said",
    },
    {
      said: "--since <duration>",
      takes: "how far back from now to read, an hour where none is said",
    },
    { said: "--limit <n>", takes: "the most lines given back, five hundred where none is said" },
    { said: "--cursor <b64>", takes: "where to pick up from, taken out of an earlier JSON answer" },
    {
      said: "--all",
      takes: "read the whole window rather than one page of it, leaving the limit aside",
    },
    { said: "--json", takes: "give one object holding the lines and what bounded them" },
  ],
  helpNotes: [
    "the pod is resolved through the pipeline, workflow and step pages before Loki is reached at all.",
    "a truncated log reads as absence, so finding nothing in a bounded answer is no evidence the thing is not there.",
    "what bounded the answer is always said: the limit cut it, the window cut it, or the check could not run.",
    "a completeness that could not be checked is never reported as completeness.",
    "an empty answer says the pod prefix matched nothing, and names other namespaces holding that prefix.",
    "`--all` removes the limit and not the window, so lines older than the window are still left out.",
    "each page `--all` fetches is capped at the five thousand lines Loki gives for one query.",
    "the JSON answer carries the same signal the plain answer says beside the lines.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod is resolved through the pipeline, workflow and step pages.",
    },
    {
      invariantKind: "departure",
      statement: "A step carrying no pod yet is the data's trouble rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "The lines come newest first.",
    },
    {
      invariantKind: "departure",
      statement: "What bounded an answer is said beside that answer.",
    },
    {
      invariantKind: "departure",
      statement: "A completeness that could not be checked is never reported as completeness.",
    },
    {
      invariantKind: "departure",
      statement: "An empty answer names other namespaces the pod prefix has streams in.",
    },
    {
      invariantKind: "departure",
      statement: "Reading the whole window leaves the limit aside rather than the window.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor is opaque and comes from an earlier answer of this command.",
    },
    {
      invariantKind: "departure",
      statement: "A duration this cannot read is refused before Loki is reached.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a log off the workstation.",
    },
  ],
} as const satisfies Command
